import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";


// GET data
export async function GET() {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST data (admin)
export async function POST(req: Request) {
  const body = await req.json();

  const { data, error } = await supabase
    .from("announcements")
    .insert([
      {
        title: body.title,
        message: body.message,
      },
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}