import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";

// 📥 GET SINGLE SERMON
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Rekebisha hapa
) {
  try {
    const { id } = await params; // Await params hapa

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("sermons")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Sermon not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET SINGLE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ✏️ UPDATE SERMON
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Rekebisha hapa
) {
  try {
    const { id } = await params; // Await params kwanza

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await req.json();

    // Safisha data na kuzuia crashing kama body ni empty
    const updateData: any = {};
    if (body.title?.trim()) updateData.title = body.title.trim();
    if (body.preacher?.trim()) updateData.preacher = body.preacher.trim();
    if (body.videourl?.trim()) updateData.videourl = body.videourl.trim();

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("sermons")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE UPDATE ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ❌ DELETE SERMON
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Rekebisha hapa
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("sermons")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE ERROR:", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
