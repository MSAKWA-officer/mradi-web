import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// ✏️ UPDATE SERMON
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 muhimu sana
) {
  try {
    const { id } = await context.params; // 👈 lazima await

    const body = await req.json();
    const { title, preacher, videoUrl } = body;

    if (!title || !preacher || !videoUrl) {
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
        videoUrl,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// 🗑 DELETE SERMON
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 muhimu
) {
  try {
    const { id } = await context.params;

    const { error } = await supabase
      .from("sermons")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}