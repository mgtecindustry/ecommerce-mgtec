import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.log("Stripe webhook secret is not set");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.log("Webhook signature verification failed", error);
    return NextResponse.json(
      { error: `Webhook Error: ${error}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const order = await createOrderInSanity(session);
      console.log("Order created in Sanity", order);
    } catch (error) {
      console.error("Error creating order in Sanity:", error);
      return NextResponse.json(
        { error: "Error creating order" },
        { status: 500 }
      );
    }
  }
  return NextResponse.json({ received: true });
}
async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  // Verifică existența metadata înainte de a le accesa
  if (
    !metadata ||
    !metadata.orderNumber ||
    !metadata.customerName ||
    !metadata.customerEmail ||
    !metadata.clerkUserId
  ) {
    throw new Error("Missing necessary metadata in session");
  }

  const { orderNumber, customerName, customerEmail, clerkUserId } =
    metadata as Metadata;

  // Verifică existența total_details înainte de a o folosi
  const amountDiscount = total_details?.amount_discount
    ? total_details.amount_discount / 100
    : 0;

  // Verifică dacă există line items
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  if (!lineItemsWithProduct.data.length) {
    throw new Error("No line items found in session");
  }

  const sanityProducts = lineItemsWithProduct.data.map((item) => {
    const product = item.price?.product;
    if (!product) {
      throw new Error("Missing product in line item");
    }

    return {
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: (product as Stripe.Product).metadata?.id,
      },
      quantity: item.quantity || 0,
    };
  });

  // Asigură-te că există amount_total și că valoarea este validă
  if (!amount_total) {
    throw new Error("Amount total is missing or invalid");
  }

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount,
    products: sanityProducts,
    totalPrice: amount_total / 100,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
