import { readFile, writeFile } from "node:fs/promises";

// Next.js prefixes its own assets, but third-party scene files contain their
// own absolute URLs. Rewrite the exported copy; keep the source usable in dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const scenePath = new URL("../out/scenes/hero-background.json", import.meta.url);
const scene = JSON.parse(await readFile(scenePath, "utf8"));

function prefixAssets(value) {
  if (typeof value === "string") {
    return value.startsWith("/scenes/assets/") ? `${basePath}${value}` : value;
  }
  if (Array.isArray(value)) return value.map(prefixAssets);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, prefixAssets(item)]),
    );
  }
  return value;
}

await writeFile(scenePath, JSON.stringify(prefixAssets(scene)));
