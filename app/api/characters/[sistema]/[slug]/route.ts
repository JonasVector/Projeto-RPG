import { getCharacter } from "@/lib/characters";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sistema: string; slug: string }> }
) {
  const { sistema, slug } = await params;
  const character = getCharacter(sistema, slug);

  if (!character) {
    return NextResponse.json({ error: "Character not found" }, { status: 404 });
  }

  return NextResponse.json(character);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sistema: string; slug: string }> }
) {
  const { sistema, slug } = await params;
  const { saveCharacter } = await import("@/lib/characters");

  try {
    const body = await request.json();
    saveCharacter(sistema, slug, body);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
