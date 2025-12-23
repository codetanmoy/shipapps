import { NextResponse } from "next/server"
import { insertLead } from "@/lib/db"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || null
  return req.headers.get("x-real-ip")
}

export async function POST(req: Request) {
  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const { firstName, email, notes } = payload as {
    firstName?: unknown
    email?: unknown
    notes?: unknown
  }

  if (typeof firstName !== "string" || firstName.trim().length === 0) {
    return NextResponse.json({ error: "Please enter your first name." }, { status: 400 })
  }

  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  if (typeof notes !== "string") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (notes.length > 4000) {
    return NextResponse.json({ error: "Please keep the description under 4,000 characters." }, { status: 400 })
  }

  try {
    await insertLead({
      kind: "mvp_sprint",
      firstName: firstName.trim(),
      email: email.trim(),
      notes: notes.trim(),
      budgetUsd: 5000,
      source: "shipapps-site",
      userAgent: req.headers.get("user-agent"),
      ip: getClientIp(req),
    })
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[mvp-sprint-request][db]", error)
    }
    return NextResponse.json({ error: "Could not save your request. Please try again." }, { status: 500 })
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[mvp-sprint-request]", {
      firstName: firstName.trim(),
      email: email.trim(),
      notes: notes.trim(),
    })
  }

  return NextResponse.json({ ok: true })
}
