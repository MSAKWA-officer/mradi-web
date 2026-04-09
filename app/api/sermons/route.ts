import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// 📥 GET ALL SERMONS
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("sermons")
      .select("*")
      .order("createdat", { ascending: false }); // ✅ FIXED (sahihi na DB yako)

    if (error) {
      console.error("GET ERROR:", error);
      return NextResponse.json(
        { error: "Failed to fetch sermons" },
        { status: 500 }
      );
    }

    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// ➕ CREATE SERMON
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ sanitize inputs
    const title = body?.title?.trim();
    const preacher = body?.preacher?.trim();
    const videourl = body?.videourl?.trim();

    // ❌ validation
    if (!title || !preacher || !videourl) {
      return NextResponse.json(
        { error: "Title, preacher and video link are required" },
        { status: 400 }
      );
    }

    // ✅ validate YouTube link
    const isValidUrl =
      videourl.includes("youtube.com") || videourl.includes("youtu.be");

    if (!isValidUrl) {
      return NextResponse.json(
        { error: "Invalid YouTube link" },
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
          // ❗ usiweke createdat manually kama DB ina default (recommended)
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("INSERT ERROR:", error);
      return NextResponse.json(
        { error: "Failed to create sermon" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });

  } catch (err) {
    console.error("POST ERROR:", err);

    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}