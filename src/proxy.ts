import { NextResponse, type NextRequest } from "next/server";
import { articles, formats, videos } from "@/content";

/**
 * Real "404 Not Found" for addresses that look like an article, format or
 * video but don't exist. (With streaming pages, Next.js would otherwise show
 * the not-found page with a "200 OK" status.) Old addresses are redirected
 * earlier, in next.config.ts.
 */
const known = new Set([
  "/maqolalar",
  ...formats.map((f) => `/maqolalar/turi/${f.key}`),
  ...articles.map((a) => `/maqolalar/${a.slug}`),
  "/multimedia",
  ...videos.map((v) => `/multimedia/${v.slug}`),
]);

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  if (known.has(path)) return NextResponse.next();
  // Any address with no page renders the site's not-found page with status 404.
  return NextResponse.rewrite(new URL("/sahifa-topilmadi", request.url), { status: 404 });
}

export const config = {
  matcher: ["/maqolalar/:path*", "/multimedia/:path*"],
};
