import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { NextRequest } from "next/server";

/**
 * Image proxy for the Eko Pages S3 bucket.
 *
 * next/image's own optimizer gives each upstream fetch ~7 seconds, and the news
 * photos in that bucket run to ~6MB from a slow host (15-290s each), so every
 * one of them failed with a 500. This fetches with a generous timeout, writes
 * every size from that single download, and caches the results on disk, so only
 * the first request for a photo is slow.
 */
const ALLOWED_HOSTS = new Set(["ekopages1.s3.amazonaws.com"]);
const WIDTHS = [320, 480, 640, 760, 1140] as const;
const DEFAULT_WIDTH = 760;
const UPSTREAM_TIMEOUT_MS = 300_000;
const CACHE_DIR = path.join(process.cwd(), ".next", "cache", "photo");

/** Coalesces concurrent requests for the same photo into one download. */
const inFlight = new Map<string, Promise<void>>();

const cachePathFor = (url: string, width: number) =>
  path.join(CACHE_DIR, `${createHash("sha1").update(`${url}@${width}`).digest("hex")}.webp`);

async function downloadAndCacheAllWidths(url: string): Promise<void> {
  const existing = inFlight.get(url);
  if (existing) return existing;

  const work = (async () => {
    const upstream = await fetch(url, {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      cache: "no-store",
    });
    if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);
    const original = Buffer.from(await upstream.arrayBuffer());

    await mkdir(CACHE_DIR, { recursive: true });
    // One download, every size — otherwise each width re-fetches the whole file.
    for (const width of WIDTHS) {
      const resized = await sharp(original)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 76 })
        .toBuffer();
      await writeFile(cachePathFor(url, width), resized);
    }
  })().finally(() => inFlight.delete(url));

  inFlight.set(url, work);
  return work;
}

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("url");
  const requestedWidth = Number(request.nextUrl.searchParams.get("w") ?? DEFAULT_WIDTH);
  if (!source) return new Response("missing url", { status: 400 });

  let upstreamUrl: URL;
  try {
    upstreamUrl = new URL(source);
  } catch {
    return new Response("invalid url", { status: 400 });
  }
  if (upstreamUrl.protocol !== "https:" || !ALLOWED_HOSTS.has(upstreamUrl.hostname)) {
    return new Response("host not allowed", { status: 400 });
  }

  const width: number = (WIDTHS as readonly number[]).includes(requestedWidth)
    ? requestedWidth
    : DEFAULT_WIDTH;
  const url = upstreamUrl.toString();
  const headers = {
    "Content-Type": "image/webp",
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  try {
    return new Response(new Uint8Array(await readFile(cachePathFor(url, width))), { headers });
  } catch {
    // Not cached yet — fall through and fetch it.
  }

  try {
    await downloadAndCacheAllWidths(url);
    return new Response(new Uint8Array(await readFile(cachePathFor(url, width))), { headers });
  } catch {
    return new Response("image unavailable", { status: 504 });
  }
}
