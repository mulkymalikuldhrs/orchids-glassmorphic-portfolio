import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { paymentIntentId, accessToken } = await req.json();

    if (!paymentIntentId || !accessToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const { error: dbError } = await supabase
        .from("resume_access")
        .update({
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("access_token", accessToken);

      if (dbError) {
        console.error("Database update error:", dbError);
      }

      return NextResponse.json({
        success: true,
        accessToken,
        message: "Payment confirmed, access granted",
      });
    }

    return NextResponse.json(
      { error: "Payment not successful", status: paymentIntent.status },
      { status: 400 }
    );
  } catch (error) {
    console.error("Confirm payment error:", error);
    return NextResponse.json(
      { error: "Failed to confirm payment" },
      { status: 500 }
    );
  }
}
