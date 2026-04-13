/**
 * POST /api/characters/[sistema]
 * Creates a new blank character sheet and links it to a player.
 */
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "sistemas-de-rpg");
const PLAYERS_DIR = path.join(process.cwd(), "content", "jogadores");

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ sistema: string }> }
) {
  const { sistema } = await params;

  try {
    const body = await request.json();
    const { characterName, playerId } = body as {
      characterName: string;
      playerId?: string;
    };

    if (!characterName) {
      return NextResponse.json(
        { error: "characterName is required" },
        { status: 400 }
      );
    }

    const slug = slugify(characterName);
    const charDir = path.join(CONTENT_DIR, sistema, "characters");
    const charPath = path.join(charDir, `${slug}.json`);

    if (fs.existsSync(charPath)) {
      return NextResponse.json(
        { error: "Character with this slug already exists" },
        { status: 409 }
      );
    }

    if (!fs.existsSync(charDir)) {
      fs.mkdirSync(charDir, { recursive: true });
    }

    // Minimal blank sheet — schema mirrors existing D&D structure
    const blank = {
      ficha: {
        personagem: {
          nome: characterName,
          raca: "",
          classe: "",
          nivel: 1,
          sistema: sistema,
        },
      },
    };

    fs.writeFileSync(charPath, JSON.stringify(blank, null, 2), "utf-8");

    // If a playerId is provided, link the sheet to that player
    if (playerId) {
      const playerPath = path.join(PLAYERS_DIR, `${playerId}.json`);
      if (fs.existsSync(playerPath)) {
        const playerRaw = fs.readFileSync(playerPath, "utf-8");
        const player = JSON.parse(playerRaw);
        player.characters = player.characters ?? [];
        player.characters.push({
          system: sistema,
          slug,
          label: characterName,
          status: "active",
        });
        player.stats = player.stats ?? {};
        player.stats.totalCharacters = player.characters.length;
        if (!player.stats.primarySystem) {
          player.stats.primarySystem = sistema;
        }
        fs.writeFileSync(playerPath, JSON.stringify(player, null, 2), "utf-8");
      }
    }

    return NextResponse.json({ success: true, slug }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create character" },
      { status: 500 }
    );
  }
}
