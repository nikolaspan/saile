import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Example: Mock authentication
  if (email === "b2b@example.com" && password === "password") {
    return NextResponse.json({ role: "B2B" });
  } else if (email === "concierge@example.com" && password === "password") {
    return NextResponse.json({ role: "Concierge" });
  } else if (email === "admin@example.com" && password === "password") {
    return NextResponse.json({ role: "Admin" });
  } else {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}
