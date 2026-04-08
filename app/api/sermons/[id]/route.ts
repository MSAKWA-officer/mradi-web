import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// ✏️ UPDATE SERMON
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // MUHIMU: Hakikisha params ni Promise hapa
) {
  try {
    // 1. LAZIMA u-await params hapa
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const body = await request.json();
    const { title, preacher, videourl } = body;

    if (!title || !preacher || !videourl) {
      return NextResponse.json(
        { error: "Sehemu zote zinahitajika" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("sermons")
      .update({ title, preacher, videourl })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// 🗑 DELETE SERMON
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // MUHIMU: Hakikisha params ni Promise hapa
) {
  try {
    // 1. LAZIMA u-await params hapa
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const { error } = await supabase
      .from("sermons")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Imefutwa kikamilifu" });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
