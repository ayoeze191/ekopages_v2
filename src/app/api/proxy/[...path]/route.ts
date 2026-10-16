import { API_BASE } from "@/lib/config";
import type { NextRequest } from "next/server";

/**
 * Same-origin proxy to the Eko Pages API.
 *
 * The backend's CORS allowlist only names a couple of origins (localhost:3000
 * and ekopages.com), so direct browser calls fail from any other host — a dev
 * port, a preview URL, a new domain. Routing them through our own server keeps
 * the browser same-origin and leaves CORS out of it entirely.
 */
const PASS_THROUGH_REQUEST_HEADERS = ["authorization", "content-type", "accept"];
const PASS_THROUGH_RESPONSE_HEADERS = ["content-type", "cache-control"];

async function forward(request: NextRequest, path: string[]) {
  // Django redirects slash-less paths, so keep the caller's trailing slash.
  const trailingSlash = request.nextUrl.pathname.endsWith("/") ? "/" : "";
  const target = `${API_BASE}/${path.join("/")}${trailingSlash}${request.nextUrl.search}`;

  const headers = new Headers();
  for (const name of PASS_THROUGH_REQUEST_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  const hasBody = !["GET", "HEAD"].includes(request.method);
  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body: hasBody ? await request.text() : undefined,
    cache: "no-store",
    redirect: "manual",
  });

  const responseHeaders = new Headers();
  for (const name of PASS_THROUGH_RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }

  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

type Context = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: Context) {
  return forward(request, (await context.params).path);
}
export async function POST(request: NextRequest, context: Context) {
  return forward(request, (await context.params).path);
}
export async function PUT(request: NextRequest, context: Context) {
  return forward(request, (await context.params).path);
}
export async function PATCH(request: NextRequest, context: Context) {
  return forward(request, (await context.params).path);
}
export async function DELETE(request: NextRequest, context: Context) {
  return forward(request, (await context.params).path);
}
