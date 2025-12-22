import {
    User, CreditCard, Database, BarChart, Layout,
    Check, X, Layers, Zap, Shield
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Section, Container } from "@/components/ui/layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
    const features = [
        { title: "User authentication", icon: User },
        { title: "Data storage", icon: Database },
        { title: "Payments & subscriptions", icon: CreditCard },
        { title: "Usage analytics", icon: BarChart },
        { title: "A clean, extensible app structure", icon: Layout },
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
                        </div>

                        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="rounded-[22px] bg-muted/35 px-6 py-6"
                                >
                                    <div className="flex items-center gap-3">
                                        <feature.icon className="h-5 w-5 text-foreground/80" />
                                        <h3 className="text-base font-medium">{feature.title}</h3>
                                    </div>
                                </div>
                            ))}
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
    return (
        <Section id="scope" className="py-8 md:py-10">
            <Container>
                <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                    <div className="px-6 py-10 md:px-12 md:py-14">
                        <div className="mx-auto max-w-[820px] text-center">
                            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Clear scope.</h2>
                            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                                ShipApps is built for focused apps with familiar flows. Clear boundaries mean faster shipping.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 md:grid-cols-2">
                            <div className="rounded-[22px] bg-muted/35 p-7">
                                <h3 className="text-lg font-semibold">Works best for</h3>
                                <ul className="mt-5 space-y-3">
                                    {[
                                        "Content-driven apps",
                                        "Tracking apps (habits, wellness)",
                                        "Utility apps",
                                        "Lightweight productivity tools",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-muted-foreground">
                                            <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-[22px] bg-muted/35 p-7">
                                <h3 className="text-lg font-semibold">Not designed for</h3>
                                <ul className="mt-5 space-y-3">
                                    {[
                                        "Marketplaces",
                                        "Social networks",
                                        "Real-time chat apps",
                                        "On-demand or Uber-style platforms",
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-muted-foreground">
                                            <X className="mt-0.5 h-5 w-5 shrink-0 text-foreground/50" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
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
                    </div>
                </Card>
            </Container>
        </Section>
    )
}

export function HowItWorksSection() {
    const steps = [
        "Review the demo",
        "Purchase access",
        "Brand the app for your idea",
        "Add your features",
        "Submit to the App Store"
    ]

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

                        <div className="mx-auto mt-10 max-w-[820px] space-y-4">
                            {steps.map((step, index) => (
                                <div key={step} className="flex items-center gap-4 rounded-[18px] bg-muted/35 px-5 py-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground font-semibold">
                                        {index + 1}
                                    </div>
                                    <div className="text-base font-medium">{step}</div>
                                </div>
                            ))}
                        </div>
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

                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
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

                        <div className="mx-auto mt-10 max-w-[820px] text-center text-muted-foreground">
                            <p>This isn’t about experimentation.</p>
                            <p>It’s about finishing.</p>
                        </div>
                    </div>
                </Card>
            </Container>
        </Section>
    )
}
