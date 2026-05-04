const PALETTE = [
  "#ce93d8", "#69f0ae", "#f06292", "#4dd0e1",
  "#aed581", "#9575cd", "#ec407a", "#66bb6a",
  "#ba68c8", "#4fc3f7", "#7e57c2", "#80deea",
];

export function nameToColor(name: string): string {
  let hash = 0xdeadbeef;
  for (let i = 0; i < name.length; i += 1) {
    hash = Math.imul(hash ^ name.charCodeAt(i), 2654435761);
  }
  return PALETTE[((hash ^ (hash >>> 16)) >>> 0) % PALETTE.length];
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

const SIZE_MAP = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-12 w-12 text-sm",
} as const;

export function JediAvatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const color = nameToColor(name);
  const GLOW_MAP = { sm: 4, md: 8, lg: 12 } as const;
  const glowRadius = GLOW_MAP[size];
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-deep-space ${SIZE_MAP[size]}`}
      style={{ backgroundColor: color, boxShadow: `0 0 ${String(glowRadius)}px ${color}50` }}
    >
      {getInitials(name)}
    </div>
  );
}
