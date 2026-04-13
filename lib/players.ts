import fs from "node:fs";
import path from "node:path";

const PLAYERS_DIR = path.join(process.cwd(), "content", "jogadores");

export interface PlayerCharacterRef {
  system: string;
  slug: string;
  label: string;
  status: "active" | "retired" | "npc";
}

export interface PlayerStats {
  totalCharacters: number;
  primarySystem: string;
  favoriteSystems: string[];
  [key: string]: unknown;
}

export interface Player {
  id: string;
  name: string;
  displayName: string;
  joinedAt: string;
  activeSince: string;
  bio: string;
  role: string;
  characters: PlayerCharacterRef[];
  stats: PlayerStats;
  tags: string[];
}

export function getAllPlayers(): Player[] {
  if (!fs.existsSync(PLAYERS_DIR)) return [];
  const files = fs.readdirSync(PLAYERS_DIR).filter((f) => f.endsWith(".json"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(PLAYERS_DIR, file), "utf-8");
    return JSON.parse(raw) as Player;
  });
}

export function getPlayer(id: string): Player | null {
  const filePath = path.join(PLAYERS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Player;
}
