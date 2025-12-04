import { NextResponse } from "next/server";
import { createAdminSessionToken, createAdminCookieHeader } from "../../../../lib/auth";

export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { username, password } = body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  try {
    const token = createAdminSessionToken();
    const res = NextResponse.json({ success: true });
    res.headers.append("Set-Cookie", createAdminCookieHeader(token));
    return res;
  } catch (err) {
    console.error("POST /api/admin/login error:", err);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
