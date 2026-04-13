import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const PLAYERS_DIR = path.join(process.cwd(), "content", "jogadores");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, displayName, bio, role } = body as {
      name: string;
      displayName: string;
      bio?: string;
      role?: string;
    };

    if (!name || !displayName) {
      return NextResponse.json(
        { error: "name and displayName are required" },
        { status: 400 }
      );
    }

    // Slugify the id from name
    const id = name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");

    const playerPath = path.join(PLAYERS_DIR, `${id}.json`);
    if (fs.existsSync(playerPath)) {
      return NextResponse.json(
        { error: "Player with this id already exists" },
        { status: 409 }
      );
    }

    const today = new Date().toISOString().split("T")[0];
    const player = {
      id,
      name: displayName,
      displayName,
      joinedAt: today,
      activeSince: String(new Date().getFullYear()),
      bio: bio ?? "",
      role: role ?? "Jogador",
      characters: [],
      stats: {
        totalCharacters: 0,
        primarySystem: "",
        favoriteSystems: [],
      },
      tags: [],
    };

    if (!fs.existsSync(PLAYERS_DIR)) {
      fs.mkdirSync(PLAYERS_DIR, { recursive: true });
    }

    fs.writeFileSync(playerPath, JSON.stringify(player, null, 2), "utf-8");
    return NextResponse.json({ success: true, player }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create player" }, { status: 500 });
  }
}
