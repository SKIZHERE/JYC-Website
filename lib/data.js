import events from "../data/events.json"
import hubs from "../data/hubs.json"
import team from "../data/team.json"
import gallery from "../data/gallery.json"

export function getEvents() {
  return events
}

export function getEventById(id) {
  return events.find((event) => event.id === id) || null
}

export function getUpcomingEvents() {
  return events
    .filter((event) => event.status === "upcoming")
    .sort((a, b) => (a.date < b.date ? -1 : 1))
}

export function getPastEvents() {
  return events
    .filter((event) => event.status === "past")
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getEventsByHub(hubId) {
  return events.filter((event) => event.hubId === hubId)
}

export function getHubs() {
  return hubs
}

export function getHubById(id) {
  return hubs.find((hub) => hub.id === id) || null
}

export function getTeam() {
  return team
}

export function getTeamLevels() {
  return {
    leadership: team.filter((member) => member.level === "leadership"),
    "hub-heads": team.filter((member) => member.level === "hub-head"),
    core: team.filter((member) => member.level === "core"),
  }
}

export function getTeamByHub(hubId) {
  return team.filter((member) => member.hubId === hubId)
}

export function getGallery() {
  return gallery
}

export function getGalleryByEvent(eventId) {
  return gallery.filter((item) => item.eventId === eventId)
}

export function getGalleryCategories() {
  const categories = new Set(gallery.map((item) => item.category))
  return Array.from(categories)
}

export function formatDate(dateStr) {
  if (!dateStr) return ""
  const date = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatFullDate(dateStr) {
  if (!dateStr) return ""
  const date = new Date(`${dateStr}T00:00:00`)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}