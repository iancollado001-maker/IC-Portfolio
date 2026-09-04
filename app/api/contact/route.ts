import { NextRequest, NextResponse } from "next/server";

// This route works out of the box with no external credentials —
// it validates the payload and logs it server-side, so `npm run build`
// and form submission both succeed with zero setup.
//
// To actually deliver messages, wire in a provider such as Resend
// (https://resend.com) or Formspree (https://formspree.io) here and
// set the relevant API key as a Vercel environment variable, e.g.:
//
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   await resend.emails.send({ ... });

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Replace this with a real email/service integration when ready.
    console.log("New contact form submission:", { name, email, message });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
