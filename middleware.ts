import { NextResponse } from "next/server";

const locales = ["it", "ro"] as const;
const defaultLocale = "it";

export function middleware(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;

  // dacă suntem pe /, redirecționează spre /it
  if (pathname === "/") {
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  // altfel lasă Next să continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt).*)"],
};
