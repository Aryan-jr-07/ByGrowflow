// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendInquiryNotification, sendInquiryConfirmation } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(20),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Save to DB
    await prisma.inquiry.create({ data });

    // Send emails (fire and forget — don't block response)
    Promise.all([
      sendInquiryNotification(data),
      sendInquiryConfirmation(data),
    ]).catch(console.error);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
