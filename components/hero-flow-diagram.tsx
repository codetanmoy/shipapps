"use client"

import * as React from "react"
import {
  KeyRound,
  Sparkles,
  Wand2,
  FileText,
  Tags,
  ShieldCheck,
  FileCheck2,
} from "lucide-react"
import { cn } from "@/lib/utils"

type PillCardProps = {
  title: string
  subtitle: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  accent: "amber" | "violet" | "sky" | "indigo" | "emerald" | "orange"
}

function PillCard({ title, subtitle, icon: Icon, accent }: PillCardProps) {
  const accentClasses: Record<PillCardProps["accent"], string> = {
    amber: "border-amber-200/70 bg-amber-50/60 shadow-[0_14px_36px_rgba(245,158,11,0.12)]",
    violet: "border-violet-200/70 bg-violet-50/60 shadow-[0_14px_36px_rgba(139,92,246,0.12)]",
    sky: "border-sky-200/70 bg-sky-50/60 shadow-[0_14px_36px_rgba(14,165,233,0.12)]",
    indigo: "border-indigo-200/70 bg-indigo-50/60 shadow-[0_14px_36px_rgba(99,102,241,0.12)]",
    emerald: "border-emerald-200/70 bg-emerald-50/60 shadow-[0_14px_36px_rgba(16,185,129,0.12)]",
    orange: "border-orange-200/70 bg-orange-50/60 shadow-[0_14px_36px_rgba(249,115,22,0.12)]",
  }

  return (
    <div
      className={cn(
        "relative rounded-[22px] border px-5 py-4 text-left",
        "backdrop-blur supports-[backdrop-filter]:bg-white/55",
        accentClasses[accent]
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-[14px] border border-black/5 bg-white/55">
          <Icon className="h-4 w-4 text-foreground/80" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground/90">{title}</div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}

export function HeroFlowDiagram() {
  return (
    <div className="mx-auto mt-10 max-w-[1100px] md:mt-14">
      <div className="relative overflow-hidden rounded-[32px] border border-border/50 bg-card shadow-[0_16px_48px_rgba(0,0,0,0.10)]">
        <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-70" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-10 h-[520px] w-[520px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -right-28 bottom-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 1200 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.55">
            <path className="flow-dash flow-dash-1" d="M330 150 C440 150, 460 210, 520 250" />
            <path className="flow-dash flow-dash-2" d="M330 230 C440 230, 460 260, 520 280" />
            <path className="flow-dash flow-dash-3" d="M330 310 C440 310, 460 310, 520 310" />
            <path className="flow-dash flow-dash-4" d="M680 260 C740 220, 760 180, 870 165" />
            <path className="flow-dash flow-dash-5" d="M680 290 C740 290, 760 290, 870 290" />
            <path className="flow-dash flow-dash-6" d="M680 320 C740 360, 760 400, 870 415" />
          </g>
        </svg>

        <div className="relative px-6 py-10 md:px-10 md:py-12">
          <div className="grid items-center gap-8 md:grid-cols-[360px_1fr_360px]">
            <div className="space-y-4">
              <div className="px-1 text-sm font-semibold tracking-tight text-foreground">Your Inputs</div>
              <PillCard
                title="Choose app type"
                subtitle="Pick a template"
                icon={Wand2}
                accent="amber"
              />
              <PillCard
                title="Your brand"
                subtitle="Name, colors, icon"
                icon={Sparkles}
                accent="violet"
              />
              <PillCard
                title="Apple account"
                subtitle="TestFlight + App Store"
                icon={KeyRound}
                accent="sky"
              />
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute -inset-8 rounded-[36px] bg-primary/10 blur-3xl" />
              <div className="relative rounded-[30px] border border-border/40 bg-background/75 p-8 text-center shadow-[0_18px_70px_rgba(0,0,0,0.10)] backdrop-blur supports-[backdrop-filter]:bg-background/65 md:p-10">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-muted/25">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">ShipApps Flow</div>
                <div className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
                  Choose an app type, rebrand it, generate App Store assets, then submit and ship — with code you own.
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="px-1 text-sm font-semibold tracking-tight text-foreground">Generated Outputs</div>
              <PillCard
                title="App Store copy"
                subtitle="Descriptions that convert"
                icon={FileText}
                accent="indigo"
              />
              <PillCard
                title="Metadata + ASO"
                subtitle="Keywords + structure"
                icon={Tags}
                accent="emerald"
              />
              <PillCard
                title="Policies + checklist"
                subtitle="Ready for review"
                icon={ShieldCheck}
                accent="orange"
              />
              <PillCard
                title="Live app + source"
                subtitle="Approved + code owned"
                icon={FileCheck2}
                accent="sky"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
