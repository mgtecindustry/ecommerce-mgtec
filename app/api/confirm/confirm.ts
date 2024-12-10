import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_NETOPIA_SIGNATURE) {
    return new NextResponse("Missing NETOPIA signature", { status: 500 });
  }

  try {
    const body = await req.text();
    const secretKey = Buffer.from(
      process.env.NEXT_PUBLIC_NETOPIA_SIGNATURE,
      "hex"
    );
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      secretKey,
      Buffer.alloc(16)
    );

    let decrypted = decipher.update(body, "base64", "utf8");
    decrypted += decipher.final("utf8");
    console.log("Payment confirmation received:", JSON.parse(decrypted));

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing payment confirmation:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
