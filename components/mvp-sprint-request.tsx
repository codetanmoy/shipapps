"use client"

import * as React from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function submitMvpSprintRequest(payload: { firstName: string; email: string; notes: string }) {
  const response = await fetch("/api/mvp-sprint-request", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let message = "Request failed. Please try again."
    try {
      const data = (await response.json()) as { error?: string }
      if (data?.error) message = data.error
    } catch {
      // ignore
    }
    throw new Error(message)
  }
}

export function MvpSprintRequest() {
  const [firstName, setFirstName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const canSubmit = firstName.trim().length > 0 && isValidEmail(email.trim())

  return (
    <div className="rounded-[22px] border border-border/40 bg-background p-6 md:p-7">
      {!submitted ? (
        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault()
            if (!canSubmit || submitting) return
            setSubmitting(true)
            setSubmitError(null)
            try {
              await submitMvpSprintRequest({
                firstName: firstName.trim(),
                email: email.trim(),
                notes: notes.trim(),
              })
              setSubmitted(true)
            } catch (error) {
              setSubmitError(error instanceof Error ? error.message : "Request failed. Please try again.")
            } finally {
              setSubmitting(false)
            }
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="font-medium">First name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Tanmoy"
                autoComplete="given-name"
                className="h-11 rounded-[14px] border border-border/40 bg-background px-4 outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                inputMode="email"
                className="h-11 rounded-[14px] border border-border/40 bg-background px-4 outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm">
            <span className="font-medium">What are you building? (optional)</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="A short description of the app + the core feature you want in v1."
              rows={4}
              className="resize-y rounded-[14px] border border-border/40 bg-background px-4 py-3 outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20"
            />
          </label>

          {submitError && <p className="text-sm text-destructive">{submitError}</p>}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground">
              <div>No spam. If it’s a fit, you’ll get a reply.</div>
              <div className="mt-1">If it’s not a fit, I’ll let you know — no back-and-forth.</div>
            </div>
            <Button type="submit" disabled={!canSubmit || submitting}>
              <Mail className="mr-2 h-4 w-4" />
              {submitting ? "Sending…" : "Request availability"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-sm font-medium">Request received.</p>
          <p className="mt-2 text-sm text-muted-foreground">You’ll hear back shortly if there’s an open sprint.</p>
        </div>
      )}
    </div>
  )
}
