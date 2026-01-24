import { SatsetResponse, cookies } from "satset-react";
import { verifyToken } from "./src/lib/auth";

export async function middleware(req: { url: string }) {
  const urlObj = new URL(req.url);
  const pathname = urlObj.pathname;

  if (
    pathname.startsWith("/_satset") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/public") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api/")
  ) {
    return SatsetResponse.next();
  }

  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token");
  const isAuthPage = pathname.startsWith("/auth");
  const isPublicPage = pathname === "/";
  const isProtectedPage = pathname.startsWith("/dashboard");

  let authed = false;

  if (tokenCookie?.value) {
    try {
      verifyToken(tokenCookie.value);
      authed = true;
    } catch {
      authed = false;
    }
  }

  if (!authed && isProtectedPage) {
    return SatsetResponse.redirect("/auth/login", 307);
  }

  if (authed && isAuthPage) {
    return SatsetResponse.redirect("/", 307);
  }

  return SatsetResponse.next();
}
