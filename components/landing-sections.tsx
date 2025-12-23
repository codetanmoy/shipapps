import {
    User, CreditCard, Database, BarChart, Layout,
    Check, X, Layers, Zap, Shield, Wrench,
    BookOpen, Activity, CheckSquare2, Store, Users, MessageCircle, MapPin
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Section, Container } from "@/components/ui/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HowItWorksDiagram } from "@/components/how-it-works-diagram"
import Link from "next/link"
import Image from "next/image"
import fs from "node:fs/promises"
import path from "node:path"

async function getAppLogos() {
    try {
        const dir = path.join(process.cwd(), "public", "applogo")
        const entries = await fs.readdir(dir)
        return entries
            .filter((name) => /\.(png|jpe?g|webp|svg)$/i.test(name))
            .sort((a, b) => a.localeCompare(b))
    } catch {
        return []
    }
}

export async function LogoClusterSection() {
    const logos = await getAppLogos()
    if (logos.length === 0) return null

    const visible = logos.slice(0, 24)

    return (
        <Section id="apps" className="py-8 md:py-10">
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[820px] text-center">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Apps shipped.</h2>
                            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                                A small sample of apps built and shipped.
                            </p>
                        </div>

                        <div className="mx-auto mt-10 max-w-[980px]">
                            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
                                {visible.map((file) => (
                                    <div
                                        key={file}
                                        className="group relative aspect-square overflow-hidden rounded-[18px] border border-border/40 bg-background transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)]"
                                    >
                                        <Image
                                            src={`/applogo/${file}`}
                                            alt={file.replace(/\.(png|jpe?g|webp|svg)$/i, "").replace(/[-_]/g, " ")}
                                            fill
                                            sizes="(min-width: 768px) 110px, (min-width: 640px) 90px, 72px"
                                            className="object-contain p-4 opacity-85 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-[1.03]"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </Section>
    )
}

export function BuiltForIOSSection() {
    return (
        <Section id="ios" className="py-8 md:py-10">
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[820px] text-center">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Built for iOS.</h2>
                            <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
                                ShipApps follows modern native patterns — from onboarding to subscriptions to data handling.
                            </p>
                            <p className="mt-6 text-sm text-muted-foreground">
                                Android and web are not supported at this stage.
                            </p>
                        </div>
                    </div>
                </Card>
            </Container>
        </Section>
    )
}

export function FeaturesSection() {
    const includedOutOfTheBox = [
        { title: "User accounts", description: "Sign up, login, logout, and session handling.", icon: User },
        { title: "Data storage", description: "Store and retrieve user data securely.", icon: Database },
        { title: "Payments & subscriptions", description: "IAP + subscriptions set up and App Store–compliant.", icon: CreditCard },
        { title: "Usage analytics", description: "Understand how users interact with the app.", icon: BarChart },
        { title: "Onboarding flow", description: "A complete first-run experience you can customize.", icon: Layers },
        { title: "Paywall screens", description: "Working paywall + subscription UI you can preview and adjust.", icon: Shield },
        { title: "Clean app structure", description: "Organized, readable code that’s easy to extend.", icon: Layout },
    ]

    const coreStack = [
        { title: "Xcode", subtitle: "Swift tooling", src: "/appicons/xcode.svg" },
        { title: "SwiftUI", subtitle: "Native UI", src: "/appicons/swift.svg" },
        { title: "Supabase", subtitle: "Auth + database", src: "/appicons/supabase.svg" },
        { title: "RevenueCat", subtitle: "Subscriptions", src: "/appicons/revenuecat.svg" },
        { title: "Apple-native", subtitle: "Patterns + frameworks", src: "/appicons/apple.svg" },
    ]

    const supportedCapabilities = [
        { title: "Backend services", subtitle: "Node.js", src: "/appicons/nodejs.svg" },
        { title: "Transactional email", subtitle: "Resend", src: "/appicons/resend.svg" },
        { title: "AI features", subtitle: "OpenAI", src: "/appicons/gpt-150.svg" },
        { title: "AI features", subtitle: "Gemini", src: "/appicons/gemini.svg" },
        { title: "Apple frameworks", subtitle: "HealthKit / Screen Time", src: "/appicons/health.svg" },
        { title: "Additional databases", subtitle: "MongoDB", src: null as string | null },
    ]

    return (
        <Section id="included" className="py-8 md:py-10">
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[820px] text-center">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">What’s included.</h2>
                            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                                Everything most iOS apps need to launch — already wired together.
                            </p>
                            <p className="mt-5 text-sm text-muted-foreground">
                                ShipApps gives you a real, working iOS app foundation so you don’t start from zero.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 lg:grid-cols-2">
                            <div className="rounded-[22px] bg-muted/35 p-7">
                                <h3 className="text-lg font-semibold">Features you get</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Included out of the box — the basics most iOS apps need to launch.
                                </p>
                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {includedOutOfTheBox.map((item) => (
                                        <div key={item.title} className="rounded-[18px] border border-border/40 bg-background p-5">
                                            <div className="flex items-start gap-3">
                                                <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-foreground">{item.title}</div>
                                                    <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[22px] bg-muted/35 p-7">
                                <h3 className="text-lg font-semibold">Built with a proven iOS stack</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Modern, common tools that are trusted, well-supported, and already connected.
                                </p>

                                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {coreStack.map((item) => (
                                        <div key={`${item.title}-${item.subtitle}`} className="rounded-[18px] border border-border/40 bg-background p-5">
                                            <div className="flex items-center gap-3">
                                                {item.src ? (
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-border/40 bg-muted/35">
                                                        <Image src={item.src} alt={item.title} width={22} height={22} />
                                                    </div>
                                                ) : (
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-border/40 bg-muted/35">
                                                        <Zap className="h-5 w-5 text-foreground/60" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <div className="text-sm font-semibold text-foreground">{item.title}</div>
                                                    <div className="mt-1 text-sm text-muted-foreground">{item.subtitle}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 rounded-[18px] border border-border/40 bg-background p-5 text-sm text-muted-foreground">
                                    Everything is pre-configured and connected. No boilerplate setup required.
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 rounded-[22px] bg-muted/35 p-7">
                            <h3 className="text-lg font-semibold">Supported capabilities (based on app type)</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                These are supported patterns — not enabled by default. Added only when they fit the app type and scope.
                            </p>

                            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                {supportedCapabilities.map((item) => (
                                    <div
                                        key={`${item.title}-${item.subtitle}`}
                                        className="rounded-[18px] border border-border/40 bg-background p-5"
                                    >
                                        <div className="flex items-center gap-3">
                                            {item.src ? (
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-border/40 bg-muted/35">
                                                    <Image src={item.src} alt={item.subtitle} width={22} height={22} />
                                                </div>
                                            ) : (
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-border/40 bg-muted/35">
                                                    <Wrench className="h-5 w-5 text-foreground/60" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <div className="text-sm font-semibold text-foreground">{item.title}</div>
                                                <div className="mt-1 text-sm text-muted-foreground">{item.subtitle}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 grid gap-4 lg:grid-cols-3">
                            {[
                                { src: "/marketing/preview-onboarding.svg", alt: "Onboarding preview" },
                                { src: "/marketing/preview-subscriptions.svg", alt: "Subscriptions preview" },
                                { src: "/marketing/preview-analytics.svg", alt: "Analytics preview" },
                            ].map((item) => (
                                <div
                                    key={item.src}
                                    className="overflow-hidden rounded-[22px] border border-border/40 bg-background"
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        width={1200}
                                        height={820}
                                        className="h-auto w-full"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mx-auto mt-10 max-w-[820px] text-center">
                            <p className="text-lg font-medium">All set up. Already connected. Ready to ship.</p>
                            <p className="mt-1 text-muted-foreground">You own the source code. There is no lock-in.</p>
                        </div>
                    </div>
                </Card>
            </Container>
        </Section>
    )
}

export function ScopeSection() {
    const goodFit = [
        {
            title: "Content apps",
            icon: BookOpen,
            examples: ["Readers", "Courses", "Newsletters"],
        },
        {
            title: "Tracking apps",
            icon: Activity,
            examples: ["Habits", "Wellness", "Journaling"],
        },
        {
            title: "Utility apps",
            icon: Wrench,
            examples: ["Timers", "Scanners", "Calculators"],
        },
        {
            title: "Productivity apps",
            icon: CheckSquare2,
            examples: ["Tasks", "Routines", "Light CRMs"],
        },
    ]

    const notFit = [
        {
            title: "Marketplaces",
            icon: Store,
            reason: "Multi-sided supply, payouts, disputes, operational complexity.",
        },
        {
            title: "Social networks",
            icon: Users,
            reason: "Feeds, follows, moderation, and growth loops.",
        },
        {
            title: "Real-time chat apps",
            icon: MessageCircle,
            reason: "Presence, delivery guarantees, scaling complexity.",
        },
        {
            title: "On-demand platforms",
            icon: MapPin,
            reason: "Dispatch, maps, SLAs, and edge cases.",
        },
    ]

    return (
        <Section id="scope" className="py-8 md:py-10">
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[820px] text-center">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Built for focused apps.</h2>
                            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                                If your app fits this shape, you’ll move fast. If it doesn’t, you’ll be fighting the system.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 lg:grid-cols-2">
                            <div className="rounded-[22px] bg-muted/35 p-7">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-lg font-semibold">Great fit</h3>
                                    <Badge variant="secondary" className="border border-border/40 bg-background text-foreground">
                                        Move fast
                                    </Badge>
                                </div>
                                <div className="mt-5 grid gap-3">
                                    {goodFit.map((item) => (
                                        <div key={item.title} className="rounded-[18px] border border-border/40 bg-background p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-border/40 bg-muted/25">
                                                    <item.icon className="h-4 w-4 text-foreground/70" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-base font-semibold">{item.title}</div>
                                                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                        {item.examples.map((example) => (
                                                            <li key={example} className="flex items-start gap-2">
                                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground/60" />
                                                                <span>{example}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[22px] bg-muted/35 p-7">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-lg font-semibold">Not a fit</h3>
                                    <Badge variant="secondary" className="border border-border/40 bg-background text-foreground">
                                        Complexity spike
                                    </Badge>
                                </div>
                                <div className="mt-5 grid gap-3">
                                    {notFit.map((item) => (
                                        <div key={item.title} className="rounded-[18px] border border-border/40 bg-background p-5">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-border/40 bg-muted/25">
                                                    <item.icon className="h-4 w-4 text-foreground/55" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-base font-semibold">{item.title}</div>
                                                    <div className="mt-1 text-sm text-muted-foreground">{item.reason}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mx-auto mt-10 max-w-[820px] text-center">
                            <p className="text-sm text-muted-foreground">
                                Not sure? If your first version is <span className="font-medium text-foreground">one user</span>,{" "}
                                <span className="font-medium text-foreground">standard flows</span>, and{" "}
                                <span className="font-medium text-foreground">no real-time complexity</span>, ShipApps is a strong fit.
                            </p>
                            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Button variant="outline" className="border-border/40 bg-background" asChild>
                                    <Link href="#demo">Watch demos</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="#pricing">See pricing</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </Section>
    )
}

export function PricingSection() {
    return (
        <Section id="pricing" className="py-8 md:py-10">
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[820px] text-center">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pricing.</h2>
                            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                                One-time purchase. No subscriptions. No usage limits.
                            </p>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Want proof first?{" "}
                                <Link href="#demo" className="text-primary hover:underline underline-offset-4">
                                    Watch the demos
                                </Link>
                                .
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 md:grid-cols-2">
                            <div className="rounded-[22px] bg-muted/35 p-7">
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">ShipApps</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">The complete iOS app launch system.</p>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-baseline gap-2">
                                    <div className="text-5xl font-semibold tracking-tight">$349</div>
                                    <div className="text-sm font-medium text-muted-foreground">one-time</div>
                                </div>

                                <ul className="mt-6 space-y-3 text-muted-foreground">
                                    {[
                                        "Full iOS app launch system",
                                        "Complete source code",
                                        "Working demo app",
                                        "Lifetime access to the purchased version",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className="mt-8 w-full" size="lg" asChild>
                                    <Link href="#pricing">Get ShipApps</Link>
                                </Button>
                            </div>

                            <div className="rounded-[22px] bg-muted/35 p-7">
                                <div className="flex items-start justify-between gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold">Launch Assist</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">Optional help crossing the final line.</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-background text-foreground border border-border/40">Optional</Badge>
                                </div>

                                <div className="mt-6 flex items-baseline gap-2">
                                    <div className="text-5xl font-semibold tracking-tight">$299</div>
                                    <div className="text-sm font-medium text-muted-foreground">one-time</div>
                                </div>

                                <ul className="mt-6 space-y-3 text-muted-foreground">
                                    {[
                                        "App Store submission & approval support",
                                        "App Store listing copy",
                                        "Screenshot design (template-based)",
                                        "ASO baseline setup",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="mt-6 text-sm text-muted-foreground">
                                    Launch Assist does not include marketing or ranking guarantees.
                                </p>

                                <Button variant="outline" className="mt-8 w-full border-border/40 bg-background" size="lg">
                                    Add Launch Assist
                                </Button>
                            </div>
                        </div>

                        <div className="mx-auto mt-8 max-w-[820px] rounded-[22px] border border-border/40 bg-background p-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Want a done-for-you build instead? <span className="font-medium text-foreground">iOS MVP Sprint</span> ships a
                                fixed-scope app in 14 days for <span className="font-medium text-foreground">$5,000</span>.
                            </p>
                            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Button variant="outline" className="border-border/40 bg-background" asChild>
                                    <Link href="/service">View details</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/service#request">Request availability</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </Section>
    )
}

export function HowItWorksSection() {
    return (
        <Section id="how" className="py-8 md:py-10">
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[820px] text-center">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">How it works.</h2>
                            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                                Simple. Predictable. Reliable.
                            </p>
                        </div>

                        <HowItWorksDiagram />
                    </div>
                </Card>
            </Container>
        </Section>
    )
}

export function PhilosophySection() {
    return (
        <Section id="why" className="py-8 md:py-10">
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[820px] text-center">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Why ShipApps.</h2>
                            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                                Shipping beats perfect ideas. This is built to help you finish.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-6 lg:grid-cols-1">
                            <div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {[
                                        { title: "Saves weeks of setup time", icon: Zap },
                                        { title: "Uses proven iOS patterns", icon: Layers },
                                        { title: "Reduces early mistakes", icon: Shield },
                                        { title: "Helps you ship with confidence", icon: Check },
                                    ].map((item) => (
                                        <div key={item.title} className="rounded-[22px] bg-muted/35 p-7">
                                            <div className="flex items-center gap-3">
                                                <item.icon className="h-5 w-5 text-foreground/80" />
                                                <h3 className="text-base font-semibold">{item.title}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <div className="rounded-[22px] bg-muted/35 p-7">


                                <div className="mt-4 rounded-[18px] border border-border/40 bg-background p-5 text-center">
                                    <p className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                                        <p>This isn’t about experimentation.</p>
                                        <p>It’s about finishing.</p>
                                    </p>
                                </div>

                                <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                                    ShipApps exists to remove the most common friction in shipping an iOS app — starting from nothing and
                                    rebuilding the same basics again.
                                </p>

                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    <div className="rounded-[18px] border border-border/40 bg-background p-5">
                                        <div className="text-sm font-semibold text-foreground">What it won’t do</div>
                                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                                            {[
                                                "It won’t fit every idea.",
                                                "It won’t replace good product thinking.",
                                                "It won’t guarantee growth.",
                                            ].map((item) => (
                                                <li key={item} className="flex items-start gap-3">
                                                    <X className="mt-0.5 h-5 w-5 shrink-0 text-foreground/50" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="rounded-[18px] border border-border/40 bg-background p-5">
                                        <div className="text-sm font-semibold text-foreground">What it does offer</div>
                                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                                            {[
                                                "A clean, working foundation.",
                                                "A way to start with clarity instead of chaos.",
                                                "A chance to see it working before you buy — via video demo or TestFlight.",
                                            ].map((item) => (
                                                <li key={item} className="flex items-start gap-3">
                                                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                                    If you need <span className="font-medium text-foreground">heavy customization</span> or an{" "}
                                    <span className="font-medium text-foreground">open-ended build</span>, this isn’t for you. If you want to{" "}
                                    <span className="font-medium text-foreground">start clean</span> and{" "}
                                    <span className="font-medium text-foreground">move fast</span>, it probably is.
                                </p>

                                <p className="mt-4 text-xs text-muted-foreground md:text-sm">
                                    You can see it working before you buy — via{" "}
                                    <span className="font-medium text-foreground">video demo</span> or{" "}
                                    <span className="font-medium text-foreground">TestFlight</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </Section>
    )
}
