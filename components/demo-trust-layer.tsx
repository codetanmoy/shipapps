"use client"

import * as React from "react"
import Image from "next/image"
import { X, ChevronRight, Mail, BookOpen, Activity, Wrench, CheckSquare2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container, Section } from "@/components/ui/layout"
import { cn } from "@/lib/utils"

type DemoAppType = "content" | "tracking" | "utility" | "productivity"

type DemoConfig = {
    key: DemoAppType
    title: string
    headline: string
    examples: string[]
    icon: typeof BookOpen
    summary: string
    videoSrc: string
    posterSrc: string
}

const DEMO: DemoConfig[] = [
    {
        key: "content",
        title: "Content app demo",
        headline: "Content\napps.",
        examples: ["Reader", "Newsletter", "Courses"],
        icon: BookOpen,
        summary: "Onboarding → paywall → browse content → save → profile.",
        videoSrc: "/marketing/demos/content-app.mp4",
        posterSrc: "/marketing/preview-onboarding.svg",
    },
    {
        key: "tracking",
        title: "Habit / tracking demo",
        headline: "Tracking\napps.",
        examples: ["Habit tracker", "Wellness", "Journaling"],
        icon: Activity,
        summary: "Daily tracking, streaks, reminders, and clean history views.",
        videoSrc: "/marketing/demos/tracking-app.mp4",
        posterSrc: "/marketing/preview-analytics.svg",
    },
    {
        key: "utility",
        title: "Utility / productivity demo",
        headline: "Utility\napps.",
        examples: ["Timer", "Scanner", "Calculator"],
        icon: Wrench,
        summary: "Fast flows, local-first feel, and a simple upgrade path.",
        videoSrc: "/marketing/demos/utility-app.mp4",
        posterSrc: "/marketing/preview-subscriptions.svg",
    },
    {
        key: "productivity",
        title: "Productivity app demo",
        headline: "Productivity\napps.",
        examples: ["Tasks", "Projects", "Routines"],
        icon: CheckSquare2,
        summary: "Projects → tasks → reminders → clean daily workflow.",
        videoSrc: "/marketing/demos/productivity-app.mp4",
        posterSrc: "/marketing/hero-mock.svg",
    },
]

function getDemo(key: DemoAppType) {
    return DEMO.find((d) => d.key === key) ?? DEMO[0]
}

type SheetMode = "demo" | "testflight" | "success"

function useLockBodyScroll(locked: boolean) {
    React.useEffect(() => {
        if (!locked) return
        const previous = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = previous
        }
    }, [locked])
}

function scrollToId(id: string) {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function submitTestFlightRequest(payload: {
    firstName: string
    email: string
    appType: DemoAppType
}) {
    const response = await fetch("/api/testflight-request", {
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

function DemoSheet(props: {
    open: boolean
    demoKey: DemoAppType
    onClose: () => void
    initialMode?: SheetMode
}) {
    const { open, demoKey, onClose, initialMode = "demo" } = props
    const [mode, setMode] = React.useState<SheetMode>(initialMode)
    const [videoError, setVideoError] = React.useState(false)
    const [firstName, setFirstName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [submitting, setSubmitting] = React.useState(false)
    const [submitError, setSubmitError] = React.useState<string | null>(null)

    const closeButtonRef = React.useRef<HTMLButtonElement | null>(null)
    const demo = getDemo(demoKey)

    useLockBodyScroll(open)

    React.useEffect(() => {
        if (!open) return
        setMode(initialMode)
        setVideoError(false)
        setSubmitError(null)
        setSubmitting(false)
        setFirstName("")
        setEmail("")
        window.setTimeout(() => closeButtonRef.current?.focus(), 0)
    }, [open, initialMode])

    React.useEffect(() => {
        if (!open) return
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [open, onClose])

    const canSubmit = firstName.trim().length > 0 && isValidEmail(email.trim())

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center md:items-center"
            role="dialog"
            aria-modal="true"
            aria-label="Demo video"
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/45 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close"
            />

            <div className="relative w-full md:max-w-3xl">
                <div className="mx-0 w-full rounded-t-[28px] border border-border/40 bg-card shadow-[0_24px_80px_rgba(0,0,0,0.25)] md:mx-6 md:rounded-[28px]">
                    <div className="flex items-center justify-between gap-3 px-5 pb-4 pt-4 md:px-6">
                        <div className="min-w-0">
                            <div className="h-1.5 w-12 rounded-full bg-border/70 md:hidden" />
                            <h3 className="mt-3 truncate text-base font-semibold md:mt-0 md:text-lg">{demo.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{demo.summary}</p>
                        </div>
                        <Button
                            ref={closeButtonRef}
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="h-10 w-10 rounded-full"
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>

                    <div className="px-5 pb-5 md:px-6 md:pb-6">
                        {mode === "demo" && (
                            <div className="space-y-5">
                                <div className="overflow-hidden rounded-[22px] border border-border/40 bg-background">
                                    <div className="relative aspect-video w-full">
                                        {!videoError ? (
                                            <video
                                                key={demo.videoSrc}
                                                className="h-full w-full object-cover"
                                                controls
                                                playsInline
                                                poster={demo.posterSrc}
                                                onError={() => setVideoError(true)}
                                            >
                                                <source src={demo.videoSrc} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center p-6 text-center">
                                                <div className="max-w-[520px]">
                                                    <p className="text-sm font-medium">Demo video not found yet.</p>
                                                    <p className="mt-2 text-sm text-muted-foreground">
                                                        Add a file at <span className="font-mono">{demo.videoSrc}</span> to enable playback.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        Video is public. TestFlight requires name + email.
                                    </div>
                                    <div className="flex flex-col gap-2 sm:flex-row">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="border-border/40 bg-background"
                                            onClick={() => setMode("testflight")}
                                        >
                                            Try on TestFlight <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                onClose()
                                                scrollToId("pricing")
                                            }}
                                        >
                                            View pricing
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {mode === "testflight" && (
                            <div className="space-y-5">
                                <div className="rounded-[22px] border border-border/40 bg-background p-5 md:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/40 bg-muted/35">
                                            <Image
                                                src="/utilityimage/testflight-icon.jpg"
                                                alt="TestFlight"
                                                width={40}
                                                height={40}
                                                className="h-10 w-10 object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-semibold">Request TestFlight invite</h4>
                                            <p className="mt-1 text-sm text-muted-foreground">We’ll send you an invite. No spam.</p>
                                        </div>
                                    </div>

                                    <form
                                        className="mt-5 space-y-3"
                                        onSubmit={async (event) => {
                                            event.preventDefault()
                                            if (!canSubmit || submitting) return
                                            setSubmitting(true)
                                            setSubmitError(null)
                                            try {
                                                await submitTestFlightRequest({
                                                    firstName: firstName.trim(),
                                                    email: email.trim(),
                                                    appType: demoKey,
                                                })
                                                setMode("success")
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

                                        {submitError && <p className="text-sm text-destructive">{submitError}</p>}

                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="justify-start text-muted-foreground"
                                                onClick={() => setMode("demo")}
                                            >
                                                Back to video
                                            </Button>
                                            <Button type="submit" disabled={!canSubmit || submitting}>
                                                <Mail className="mr-2 h-4 w-4" />
                                                {submitting ? "Requesting…" : "Request invite"}
                                            </Button>
                                        </div>
                                    </form>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    iOS only. These demos show the structure and flow of the system.
                                </p>
                            </div>
                        )}

                        {mode === "success" && (
                            <div className="space-y-5">
                                <div className="rounded-[22px] border border-border/40 bg-background p-5 md:p-6">
                                    <p className="text-sm font-medium">You’ll receive a TestFlight invite shortly.</p>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        These demos show the structure and flow of the system.
                                    </p>
                                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                onClose()
                                                scrollToId("pricing")
                                            }}
                                        >
                                            Back to pricing
                                        </Button>
                                        <Button type="button" variant="outline" className="border-border/40 bg-background" onClick={onClose}>
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DemoTrustLayerSection(props: { className?: string }) {
    const [open, setOpen] = React.useState(false)
    const [demoKey, setDemoKey] = React.useState<DemoAppType>("content")
    const [initialMode, setInitialMode] = React.useState<SheetMode>("demo")

    const openDemo = React.useCallback((key: DemoAppType) => {
        setDemoKey(key)
        setInitialMode("demo")
        setOpen(true)
    }, [])

    return (
        <Section id="demo" className={cn("py-8 md:py-10", props.className)}>
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[980px]">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">See it working.</h2>
                            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                                Pick an app type. Watch a short demo. Request TestFlight inside the demo.
                            </p>
                            <p className="mt-4 text-sm  text-muted-foreground">No login. No newsletter checkbox.</p>
                        </div>

                        <div className="mt-10">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-2 md:auto-rows-fr">
                                {DEMO.map((demo) => {
                                    const Icon = demo.icon
                                    const isDark = demo.key === "content" || demo.key === "tracking"
                                    const iconClass =
                                        demo.key === "tracking" || demo.key === "productivity" ? "bg-icon-float-2" : "bg-icon-float"

                                    return (
                                        <div
                                            key={demo.key}
                                            className={cn(
                                                "group relative overflow-hidden rounded-2xl p-9 text-left transition sm:p-12",
                                                "min-h-[420px] sm:min-h-[520px]",
                                                "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                                                demo.key === "tracking" ? "bg-[#0071e3] text-white" : "",
                                                demo.key === "content" ? "bg-zinc-950 text-white" : "",
                                                demo.key === "utility" || demo.key === "productivity"
                                                    ? "border border-border/40 bg-background text-foreground"
                                                    : ""
                                            )}
                                        >
                                            <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
                                                <div
                                                    className={cn(
                                                        "absolute -left-20 -top-20 h-[360px] w-[360px] rounded-full blur-2xl",
                                                        isDark ? "bg-white/10" : "bg-foreground/5"
                                                    )}
                                                />
                                            </div>

                                            <Icon
                                                aria-hidden="true"
                                                className={cn(
                                                    "pointer-events-none absolute -right-10 -top-10 h-56 w-56 opacity-12 sm:-right-14 sm:-top-14 sm:h-72 sm:w-72",
                                                    isDark ? "text-white" : "text-foreground",
                                                    iconClass
                                                )}
                                            />

                                            <div className="relative flex h-full flex-col">
                                                <div className={cn("text-sm font-semibold", isDark ? "text-white/90" : "text-foreground")}>
                                                    {demo.title}
                                                </div>

                                                <h3
                                                    className={cn(
                                                        "mt-5 text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl",
                                                        isDark ? "text-white" : "text-foreground"
                                                    )}
                                                >
                                                    {demo.headline.split("\n").map((line) => (
                                                        <span key={line} className="block">
                                                            {line}
                                                        </span>
                                                    ))}
                                                </h3>

                                                <div className="mt-auto pt-10">
                                                    <div className={cn("text-xs font-medium", isDark ? "text-white/70" : "text-muted-foreground")}>
                                                        Examples
                                                    </div>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {demo.examples.map((example) => (
                                                            <Badge
                                                                key={example}
                                                                variant="secondary"
                                                                className={cn(
                                                                    "border text-xs font-medium",
                                                                    isDark
                                                                        ? "border-white/15 bg-white/10 text-white"
                                                                        : "border-border/40 bg-background text-foreground"
                                                                )}
                                                            >
                                                                {example}
                                                            </Badge>
                                                        ))}
                                                    </div>

                                                    <div className="mt-8">
                                                        <Button
                                                            type="button"
                                                            onClick={() => openDemo(demo.key)}
                                                            className={cn(
                                                                "h-11 rounded-full px-6",
                                                                isDark ? "bg-white/10 text-white hover:bg-white/15" : ""
                                                            )}
                                                            variant={isDark ? "secondary" : "default"}
                                                        >
                                                            Watch demo <ChevronRight className="ml-2 h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>

            <DemoSheet open={open} demoKey={demoKey} initialMode={initialMode} onClose={() => setOpen(false)} />
        </Section>
    )
}
