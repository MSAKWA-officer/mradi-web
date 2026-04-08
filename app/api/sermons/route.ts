import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";

// 📥 GET ALL SERMONS
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("sermons")
      .select("*");

    if (error) {
      console.error("GET ERROR:", error.message);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// ➕ CREATE SERMON
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, preacher, videourl } = body; // ✅ imebadilika

    // 🔍 validation
    if (!title || !preacher || !videourl) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("sermons")
      .insert([
        {
          title,
          preacher,
          videourl, // ✅ imebadilika
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("POST ERROR:", error.message);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}