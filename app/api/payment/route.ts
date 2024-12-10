import crypto from "crypto";
import axios from "axios";

export async function POST(req: Request) {
  const {
    amount,
    currency,
    orderId,
    firstName,
    lastName,
    email,
    mobilePhone,
    address,
  } = await req.json();
  const data = {
    order: {
      $: {
        id: orderId,
        timestamp: Date.now(),
        type: "card",
      },
      signature: process.env.NEXT_PUBLIC_NETOPIA_SIGNATURE,
      url: {
        return: process.env.NEXT_PUBLIC_RETURN_URL,
        confirm: process.env.NEXT_PUBLIC_CONFIRM_URL,
      },
      invoice: {
        $: {
          currency: currency,
          amount: amount,
        },
        details: "Plata test",
        contact_info: {
          billing: {
            $: {
              type: "person",
            },
            first_name: firstName,
            last_name: lastName,
            address: address,
            email: email,
            mobile_phone: mobilePhone,
          },
          shipping: {
            $: {
              type: "person",
            },
            first_name: firstName,
            last_name: lastName,
            address: address,
            email: email,
            mobile_phone: mobilePhone,
          },
        },
      },
      ipn_cipher: "aes-256-cbc",
    },
  };

  // Verificare că signature key are lungimea corectă pentru AES-256
  if (!process.env.NEXT_PUBLIC_NETOPIA_SIGNATURE) {
    return new Response(
      JSON.stringify({ error: "Missing NETOPIA signature" }),
      { status: 500 }
    );
  }

  const secretKey = Buffer.from(
    process.env.NEXT_PUBLIC_NETOPIA_SIGNATURE,
    "hex"
  );
  if (secretKey.length !== 32) {
    return new Response(
      JSON.stringify({ error: "Invalid signature key length" }),
      { status: 500 }
    );
  }

  // Modificare criptare pentru a folosi key-ul corect
  const iv = crypto.randomBytes(16); // Generare IV random în loc de zeros
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
  encrypted += cipher.final("base64");

  // Trimiterea cererii către NETOPIA Sandbox
  try {
    if (!process.env.NEXT_PUBLIC_NETOPIA_SANDBOX_URL) {
      return new Response(
        JSON.stringify({ error: "Missing NETOPIA sandbox URL" }),
        { status: 500 }
      );
    }

    const response = await axios.post(
      process.env.NEXT_PUBLIC_NETOPIA_SANDBOX_URL,
      {
        data: encrypted,
        env_key: iv.toString("base64"), // Adăugare IV în request
      }
    );

    // Răspunsul de la NETOPIA
    return new Response(JSON.stringify({ url: response.data.redirect_url }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error sending payment request to NETOPIA:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
