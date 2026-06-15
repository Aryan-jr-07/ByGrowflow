// lib/session.ts
// Helper to check admin session in API routes

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { Session } from "next-auth";

export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export function isAdminSession(session: Session | null): boolean {
  return (session?.user as { role?: string } | undefined)?.role === "admin";
}
