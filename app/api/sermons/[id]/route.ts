import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// ✏️ UPDATE SERMON
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Imebadilishwa kuwa Promise
) {
  try {
    // 1. Await params kwanza kabla ya kuzitumia
    const { id } = await params;
    
    const body = await req.json();
    const { title, preacher, videourl } = body;

    // 🔍 validation
    if (!title || !preacher || !videourl) {
      return NextResponse.json(
        { error: "Fields 'title', 'preacher', and 'videourl' are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("sermons")
      .update({
        title,
        preacher,
        videourl,
      })
      .eq("id", id) // ✅ Tunatumia 'id' tuliyo-await
      .select()
      .maybeSingle();

    if (error) {
      console.error("UPDATE ERROR:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// 🗑 DELETE SERMON
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Imebadilishwa kuwa Promise
) {
  try {
    // 1. Await params hapa pia
    const { id } = await params;

    const { error } = await supabase
      .from("sermons")
      .delete()
      .eq("id", id); // ✅ Tunatumia 'id' tuliyo-await

    if (error) {
      console.error("DELETE ERROR:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Sermon deleted successfully" });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
