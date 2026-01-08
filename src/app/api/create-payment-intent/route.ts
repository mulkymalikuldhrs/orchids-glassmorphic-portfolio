import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESUME_ACCESS_PRICE = 100;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const accessToken = crypto.randomUUID();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: RESUME_ACCESS_PRICE,
      currency: "usd",
      metadata: {
        product: "resume_access",
        access_token: accessToken,
        email: email || "",
      },
    });

    const { error: dbError } = await supabase.from("resume_access").insert({
      email: email || null,
      access_token: accessToken,
      stripe_payment_intent_id: paymentIntent.id,
      amount: RESUME_ACCESS_PRICE,
      currency: "usd",
      status: "pending",
    });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      accessToken,
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
