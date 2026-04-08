import { supabase } from "@/app/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// 📥 GET ALL SERMONS
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("created_at", { ascending: false }); // Inapanga kuanzia ya hivi karibuni

    if (error) {
      console.error("GET ERROR:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// ➕ CREATE SERMON
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, preacher, videourl } = body;

    // 🔍 Validazione rahisi
    if (!title || !preacher || !videourl) {
      return NextResponse.json(
        { error: "Kumbuka kujaza Title, Preacher, na Video URL" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("sermons")
      .insert([
        {
          title,
          preacher,
          videourl,
        },
      ])
      .select()
      .single(); // Inarudisha kitu kimoja tu badala ya array

    if (error) {
      console.error("POST ERROR:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
