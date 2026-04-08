import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// ✏️ UPDATE SERMON (PUT)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ LAZIMA iwe Promise
) {
  try {
    // 1. Subiri params zipatikane (await)
    const { id } = await params;
    
    const body = await req.json();
    const { title, preacher, videourl } = body;

    // 🔍 Validation
    if (!title || !preacher || !videourl) {
      return NextResponse.json(
        { error: "Sehemu zote (title, preacher, videourl) zinahitajika" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("sermons")
      .update({ title, preacher, videourl })
      .eq("id", id) // ✅ Tunatumia id tuliyo-await
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Sermon haijapatikana" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// 🗑 DELETE SERMON
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ LAZIMA iwe Promise
) {
  try {
    // 1. Subiri params zipatikane (await)
    const { id } = await params;

    const { error } = await supabase
      .from("sermons")
      .delete()
      .eq("id", id); // ✅ Tunatumia id tuliyo-await

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Sermon imefutwa kikamilifu" });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
