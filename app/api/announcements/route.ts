import { supabase } from "@/app/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// GET data - Inachukua matangazo yote
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

// POST data (admin) - Inatengeneza tangazo jipya
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("announcements")
      .insert([
        {
          title: body.title,
          message: body.message,
        },
      ])
      .select(); // Muhimu: Inarudisha data iliyotengenezwa

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
