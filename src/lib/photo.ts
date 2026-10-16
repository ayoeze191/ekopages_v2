/**
 * Routes bucket images through /api/photo, which resizes and caches them.
 * next/image cannot optimize these directly: the news photos are multi-megabyte
 * and the host is slow enough that its 7s upstream budget always expires.
 */
export type PhotoWidth = 320 | 480 | 640 | 760 | 1140;

export function photoUrl(source: string, width: PhotoWidth = 760): string {
  return `/api/photo?url=${encodeURIComponent(source)}&w=${width}`;
}
