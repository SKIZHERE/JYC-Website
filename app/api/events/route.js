import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ events: data }, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { id, title, description, date, venue, hub_id, status, registration_link } = body;

    const { data, error } = await supabase
      .from('events')
      .insert([{ id, title, description, date, venue, hub_id, status, registration_link }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, event: data[0] }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}