import jwt from "jsonwebtoken";
import cookie from "cookie";

const COOKIE_NAME = "admin_session";

export function createAdminSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }

  const payload = {
    role: "admin"
  };

  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyAdminSessionToken(token) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }

  try {
    const decoded = jwt.verify(token, secret);
    return decoded && decoded.role === "admin";
  } catch (e) {
    return false;
  }
}

export function createAdminCookieHeader(token) {
  return cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function parseAdminFromRequest(headers) {
  const cookieHeader = headers.get("cookie");
  if (!cookieHeader) return false;

  const cookies = cookie.parse(cookieHeader || "");
  const token = cookies[COOKIE_NAME];
  if (!token) return false;

  return verifyAdminSessionToken(token);
}
