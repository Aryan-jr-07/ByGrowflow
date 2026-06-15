// app/api/settings/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Session } from "next-auth";

function isAdmin(session: Session | null): boolean {
  return (session?.user as { role?: string } | undefined)?.role === "admin";
}

export async function GET() {
  const settings = await prisma.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s: { key: string; value: string }) => [s.key, s.value]));
  return NextResponse.json(map);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!isAdmin(session)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  if (body.settings && Array.isArray(body.settings)) {
    await Promise.all(
      body.settings.map(({ key, value }: { key: string; value: string }) =>
        prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    return NextResponse.json({ success: true });
  }

  if (body.key && body.value !== undefined) {
    const updated = await prisma.siteSetting.upsert({
      where: { key: body.key },
      update: { value: body.value },
      create: { key: body.key, value: body.value },
    });
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Invalid body" }, { status: 400 });
}
