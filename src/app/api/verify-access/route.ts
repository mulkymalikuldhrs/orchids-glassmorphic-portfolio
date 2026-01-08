import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Missing access token" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("resume_access")
      .select("status, email, created_at")
      .eq("access_token", accessToken)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    return NextResponse.json({
      valid: data.status === "completed",
      email: data.email,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("Verify access error:", error);
    return NextResponse.json(
      { error: "Failed to verify access" },
      { status: 500 }
    );
  }
}
