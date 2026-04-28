import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const roadmapId = req.nextUrl.searchParams.get("roadmapId");
  if (!roadmapId) return NextResponse.json({ label: null });

  const { data } = await supabase
    .from("labels")
    .select("thumb, stars")
    .eq("roadmap_id", roadmapId)
    .single();

  return NextResponse.json({ label: data ?? null });
}

export async function POST(req: NextRequest) {
  const { roadmapId, thumb, stars } = await req.json();

  if (!roadmapId || !thumb || !stars) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from("labels")
    .insert({ roadmap_id: roadmapId, thumb, stars });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}