import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

// ✏️ UPDATE MESSAGE
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // Tumia Promise hapa
) {
  try {
    // Kwenye Next.js mpya, lazima u-await params
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { sender_email, message } = body;

    if (!sender_email || !message) {
      return NextResponse.json(
        { error: "sender_email and message are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("messages")
      .update({ sender_email, message })
      .eq("id", id)
      .select();

    if (error) {
      console.error("UPDATE ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully", data });

  } catch (err) {
    console.error("UPDATE FAILED:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ❌ DELETE MESSAGE
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // Tumia Promise hapa pia
) {
  try {
    const { id } = await context.params; // Await params hapa

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error("DELETE FAILED:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
