import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Muundo huu ni salama zaidi
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Hakikisha unatumia majina sahihi ya column kama yalivyo Supabase
    // Kama kwenye table ni 'videourl', tumia herufi ndogo hapa:
    const { title, preacher, videourl } = body; 

    const { data, error } = await supabase
      .from("sermons")
      .update({ 
        title, 
        preacher, 
        videourl  // Hakikisha hapa pameandikwa kama ilivyo kwenye database
      })
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase
      .from("sermons")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
