import { NextResponse } from "next/server"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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

  const { firstName, email, appType } = payload as {
    firstName?: unknown
    email?: unknown
    appType?: unknown
  }

  if (typeof firstName !== "string" || firstName.trim().length === 0) {
    return NextResponse.json({ error: "Please enter your first name." }, { status: 400 })
  }

  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
  }

  if (typeof appType !== "string" || appType.trim().length === 0) {
    return NextResponse.json({ error: "Please select a demo app type." }, { status: 400 })
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[testflight-request]", {
      firstName: firstName.trim(),
      email: email.trim(),
      appType: appType.trim(),
    })
  }

  return NextResponse.json({ ok: true })
}
