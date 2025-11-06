import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Connect to Supabase
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers: {
      "apikey": process.env.SUPABASE_KEY,
      "Content-Type": "application/json",
      "Prefer": "return=minimal",
    },
    body: JSON.stringify({ name, email, message }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
