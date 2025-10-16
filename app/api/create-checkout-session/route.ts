import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

const timPackages = {
  iron: {
    name: "Pachet Iron",
    price: 1000, // 10.00 EUR în cenți
    timAmount: 30,
    description: "30 TIM pentru reduceri de până la 30€",
  },
  silver: {
    name: "Pachet Silver",
    price: 5000, // 50.00 EUR în cenți
    timAmount: 200, // 150 + 50 bonus
    description: "200 TIM (150 + 50 bonus) pentru reduceri de până la 200€",
  },
  gold: {
    name: "Pachet Gold",
    price: 25000, // 250.00 EUR în cenți
    timAmount: 850, // 750 + 100 bonus
    description: "850 TIM (750 + 100 bonus) pentru reduceri de până la 850€",
  },
};

export async function POST(request: NextRequest) {
  try {
    const { packageId, lang } = await request.json();

    const selectedPackage = timPackages[packageId as keyof typeof timPackages];

    if (!selectedPackage) {
      return NextResponse.json({ error: "Pachet invalid" }, { status: 400 });
    }

    // Folosește limba trimisă de frontend
    const language = lang || "ro";

    // Creează Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: selectedPackage.name,
              description: selectedPackage.description,
              images: [], // Poți adăuga imagini aici
            },
            unit_amount: selectedPackage.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${language}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${language}/shop`,
      metadata: {
        packageId,
        timAmount: selectedPackage.timAmount.toString(),
        language,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Eroare la procesarea plății" },
      { status: 500 }
    );
  }
}
