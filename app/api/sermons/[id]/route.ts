import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// ✏️ UPDATE SERMON
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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
      .update({
        title,
        preacher,
        videourl, // ✅ imebadilika
      })
      .eq("id", params.id)
      .select()
      .maybeSingle(); // ✅ safer

    if (error) {
      console.error("UPDATE ERROR:", error.message);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "Sermon not found" },
        { status: 404 }
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

// 🗑 DELETE SERMON
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from("sermons")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("DELETE ERROR:", error.message);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}