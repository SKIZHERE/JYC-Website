import { supabase } from './lib/supabase';

export const SITE_CACHE_KEY = 'jyc-site-cache-v15';
export const SITE_CACHE_META_KEY = 'jyc-site-cache-meta-v15';
export const SAVED_EVENT_PREFIX = 'jyc-saved-event-';
export const SAVED_CLUB_PREFIX = 'jyc-saved-club-';
export const REMINDER_PREFIX = 'jyc-local-reminder-';

const read = (key, fallback = null) => {
  try { const value = localStorage.getItem(key); return value === null ? fallback : value; } catch { return fallback; }
};
const write = (key, value) => { try { localStorage.setItem(key, String(value)); return true; } catch { return false; } };
const remove = key => { try { localStorage.removeItem(key); return true; } catch { return false; } };
const reminderTimers = new Map();

export function readSiteCache() {
  try {
    const raw = read(SITE_CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data && typeof data === 'object' ? data : null;
  } catch { return null; }
}

export function writeSiteCache(data) {
  try {
    write(SITE_CACHE_KEY, JSON.stringify(data));
    write(SITE_CACHE_META_KEY, new Date().toISOString());
  } catch {}
}

export function siteCacheAge() {
  const raw = read(SITE_CACHE_META_KEY);
  if (!raw) return null;
  const age = Date.now() - new Date(raw).getTime();
  return Number.isFinite(age) ? Math.max(0, age) : null;
}

export function formatCacheAge(ms) {
  if (ms == null) return '';
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function setSaved(kind, id, value) {
  const key = `${kind === 'club' ? SAVED_CLUB_PREFIX : SAVED_EVENT_PREFIX}${id}`;
  if (value) write(key, '1'); else remove(key);
  window.dispatchEvent(new CustomEvent('jyc-saved-changed', { detail: { kind, id, saved: value } }));
}

export function isSaved(kind, id) {
  return read(`${kind === 'club' ? SAVED_CLUB_PREFIX : SAVED_EVENT_PREFIX}${id}`) === '1';
}

export function subscribeSaved(callback) {
  const onCustom = () => callback();
  const onStorage = e => {
    if (e.key?.startsWith(SAVED_CLUB_PREFIX) || e.key?.startsWith(SAVED_EVENT_PREFIX)) callback();
  };
  window.addEventListener('jyc-saved-changed', onCustom);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener('jyc-saved-changed', onCustom);
    window.removeEventListener('storage', onStorage);
  };
}

export function googleCalendarUrl(event) {
  const compact = (date, time, fallback = '000000') => {
    if (!date) return '';
    const d = String(date).replaceAll('-', '');
    const t = String(time || fallback).replace(':', '').padEnd(4, '0').slice(0, 4);
    return `${d}T${t}00`;
  };
  const start = compact(event.date, event.start);
  const end = compact(event.date, event.end || event.start, '2359');
  if (!start) return '';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title || 'JYC Event',
    dates: `${start}/${end}`,
    details: event.description || '',
    location: event.venue || ''
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function localReminderKey(eventId) { return `${REMINDER_PREFIX}${eventId}`; }

export function hasLocalReminder(eventId) {
  return Boolean(read(localReminderKey(eventId)));
}

export function clearLocalReminder(eventId) {
  const timer = reminderTimers.get(eventId);
  if (timer) window.clearTimeout(timer);
  reminderTimers.delete(eventId);
  remove(localReminderKey(eventId));
  window.dispatchEvent(new CustomEvent('jyc-reminder-changed', { detail: { eventId, enabled: false } }));
}

export async function scheduleEventReminder(event, userId = null) {
  if (!event?.id || !event?.date) throw new Error('This event does not have a valid date yet.');
  const start = new Date(`${event.date}T${event.start || '09:00'}:00`);
  const reminderAt = new Date(start.getTime() - 60 * 60 * 1000);
  if (reminderAt.getTime() <= Date.now()) throw new Error('This event starts in less than an hour.');

  if (userId) {
    const { error } = await supabase.from('jyc_event_reminders').upsert({
      event_id: String(event.id), user_id: userId, reminder_at: reminderAt.toISOString()
    }, { onConflict: 'event_id,user_id,reminder_at' });
    if (error) throw error;
  }

  write(localReminderKey(event.id), JSON.stringify({ eventId: event.id, reminderAt: reminderAt.toISOString(), title: event.title, url: `/events/${event.id}` }));
  armLocalReminder(event);
  window.dispatchEvent(new CustomEvent('jyc-reminder-changed', { detail: { eventId: event.id, enabled: true } }));
  return reminderAt;
}

export function armLocalReminder(event) {
  if (!event?.id || !event?.date) return;
  const raw = read(localReminderKey(event.id));
  if (!raw) return;
  let reminder;
  try { reminder = JSON.parse(raw); } catch { return; }
  if (reminderTimers.has(event.id)) window.clearTimeout(reminderTimers.get(event.id));
  const delay = new Date(reminder.reminderAt).getTime() - Date.now();
  if (!Number.isFinite(delay) || delay <= 0) return;
  if (delay > 2147483647) return;
  const timer = window.setTimeout(async () => {
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(`JYC reminder · ${event.title}`, {
          body: 'Your event starts in about an hour.',
          icon: '/jyc-logo-circle.png',
          tag: `jyc-${event.id}`
        });
        notification.onclick = () => { window.focus(); window.location.href = `/events/${event.id}`; };
      }
    } finally { clearLocalReminder(event.id); }
  }, delay);
  reminderTimers.set(event.id, timer);
}

export async function subscribeToPush(userId = null) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) throw new Error('Web push is not supported in this browser.');
  const vapid = import.meta.env.VITE_VAPID_PUBLIC_KEY;
  if (!vapid) throw new Error('VITE_VAPID_PUBLIC_KEY is not configured yet.');
  const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Notification permission was not granted.');
  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(vapid) });
  const { error } = await supabase.from('jyc_push_subscriptions').upsert({ endpoint: subscription.endpoint, subscription: subscription.toJSON(), user_id: userId || null }, { onConflict: 'endpoint' });
  if (error) throw error;
  return subscription;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}

export function armStoredReminders(events = []) {
  events.forEach(event => { if (hasLocalReminder(event.id)) armLocalReminder(event); });
}
