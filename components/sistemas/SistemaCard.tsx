import Link from "next/link";
import SystemIcon from "@/components/ui/SystemIcon";
import { SYSTEM_LABELS } from "@/lib/system-labels";
import SistemaCardClient from "./SistemaCardClient";

interface SistemaCardProps {
  sys: string;
  count: number;
  accent: string;
  glow: string;
  desc: string;
  index: number;
}

export default function SistemaCard({ sys, count, accent, glow, desc, index }: SistemaCardProps) {
  return (
    <SistemaCardClient
      sys={sys}
      count={count}
      accent={accent}
      glow={glow}
      desc={desc}
      index={index}
    />
  );
}
