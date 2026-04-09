import { NextRequest, NextResponse } from "next/server";
// 🔥 Tumia supabaseAdmin badala ya supabase ya kawaida
import { supabaseAdmin } from "@/app/lib/supabaseAdmin"; 

// 📥 GET ALL MESSAGES
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin // Admin inaweza kusoma zote
      .from("messages")
      .select("id, sender_email, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET ERROR:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? [], { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// 📤 POST NEW MESSAGE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sender_email, message } = body;

    if (!sender_email || !message) {
      return NextResponse.json({ error: "Email and message required" }, { status: 400 });
    }

    // 🔥 Tumia supabaseAdmin hapa ili kupita RLS Policy
    const { data, error } = await supabaseAdmin
      .from("messages")
      .insert([
        {
          sender_email,
          message,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("POST ERROR:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Saved!", data }, { status: 201 });
  } catch (err) {
    console.error("POST FAILED:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
