import { NextResponse } from "next/server";
import { getAllPavilions } from "../../../lib/pavilions";

export async function GET() {
  try {
    const pavilions = await getAllPavilions();
    return NextResponse.json({ pavilions });
  } catch (err) {
    console.error("GET /api/pavilions error:", err);
    return NextResponse.json(
      { error: "Failed to load pavilions" },
      { status: 500 }
    );
  }
}
