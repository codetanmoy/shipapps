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

type Point = { x: number; y: number }
type Connector = { start: Point; end: Point; delayMs: number }

function midRight(rect: DOMRect, container: DOMRect): Point {
  return {
    x: rect.right - container.left,
    y: rect.top + rect.height / 2 - container.top,
  }
}

function midLeft(rect: DOMRect, container: DOMRect): Point {
  return {
    x: rect.left - container.left,
    y: rect.top + rect.height / 2 - container.top,
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function HeroFlowDiagram() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const centerRef = React.useRef<HTMLDivElement | null>(null)
  const leftRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const rightRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const [size, setSize] = React.useState<{ w: number; h: number } | null>(null)
  const [connectors, setConnectors] = React.useState<{
    leftToCenter: Connector[]
    centerToRight: Connector[]
  }>({ leftToCenter: [], centerToRight: [] })

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect()
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    const containerEl = containerRef.current
    const centerEl = centerRef.current
    if (!containerEl || !centerEl) return

    const containerRect = containerEl.getBoundingClientRect()
    const centerRect = centerEl.getBoundingClientRect()

    const leftCards = leftRefs.current.filter(Boolean) as HTMLDivElement[]
    const rightCards = rightRefs.current.filter(Boolean) as HTMLDivElement[]

    const leftToCenter: Connector[] = leftCards.map((card, i) => {
      const a = midRight(card.getBoundingClientRect(), containerRect)
      const b = {
        x: centerRect.left - containerRect.left,
        y: a.y,
      }
      return { start: a, end: b, delayMs: 80 + i * 110 }
    })

    const indicesToConnect = rightCards.length >= 4 ? [0, 1, 2, 3] : rightCards.map((_, i) => i)
    const centerToRight: Connector[] = indicesToConnect.map((idx, i) => {
      const card = rightCards[idx]
      const b = midLeft(card.getBoundingClientRect(), containerRect)
      const a = {
        x: centerRect.right - containerRect.left,
        y: b.y,
      }
      return { start: a, end: b, delayMs: 220 + i * 110 }
    })

    setConnectors({ leftToCenter, centerToRight })
  }, [size?.w, size?.h])

  const pathFor = React.useCallback((start: Point, end: Point) => {
    const dx = clamp(Math.abs(end.x - start.x) * 0.55, 90, 260)
    return `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`
  }, [])

  return (
    <div className="mx-auto mt-10 max-w-[1100px] md:mt-14">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-[32px] border border-border/50 bg-card shadow-[0_16px_48px_rgba(0,0,0,0.10)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-70" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-28 top-10 h-[520px] w-[520px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -right-28 bottom-10 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        {size && (
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-foreground/45 md:block"
            viewBox={`0 0 ${size.w} ${size.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2">
              {connectors.leftToCenter.map((line) => (
                <path
                  key={`l-${line.delayMs}`}
                  className="flow-dash"
                  style={{ animationDelay: `${line.delayMs}ms` }}
                  d={pathFor(line.start, line.end)}
                />
              ))}
              {connectors.centerToRight.map((line) => (
                <path
                  key={`r-${line.delayMs}`}
                  className="flow-dash"
                  style={{ animationDelay: `${line.delayMs}ms` }}
                  d={pathFor(line.start, line.end)}
                />
              ))}
            </g>
          </svg>
        )}

        <div className="relative px-6 py-10 md:px-10 md:py-12">
          <div className="grid items-center gap-8 md:grid-cols-[360px_1fr_360px]">
            <div className="space-y-4">
              <div className="px-1 text-sm font-semibold tracking-tight text-foreground">Your Inputs</div>
              <div ref={(el) => { leftRefs.current[0] = el }}>
                <PillCard title="Choose app type" subtitle="Pick a template" icon={Wand2} accent="amber" />
              </div>
              <div ref={(el) => { leftRefs.current[1] = el }}>
                <PillCard title="Your brand" subtitle="Name, colors, icon" icon={Sparkles} accent="violet" />
              </div>
              <div ref={(el) => { leftRefs.current[2] = el }}>
                <PillCard title="Apple account" subtitle="TestFlight + App Store" icon={KeyRound} accent="sky" />
              </div>
            </div>

            <div className="relative" ref={centerRef}>
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
              <div ref={(el) => { rightRefs.current[0] = el }}>
                <PillCard title="App Store copy" subtitle="Descriptions that convert" icon={FileText} accent="indigo" />
              </div>
              <div ref={(el) => { rightRefs.current[1] = el }}>
                <PillCard title="Metadata + ASO" subtitle="Keywords + structure" icon={Tags} accent="emerald" />
              </div>
              <div ref={(el) => { rightRefs.current[2] = el }}>
                <PillCard title="Policies + checklist" subtitle="Ready for review" icon={ShieldCheck} accent="orange" />
              </div>
              <div ref={(el) => { rightRefs.current[3] = el }}>
                <PillCard title="Live app + source" subtitle="Approved + code owned" icon={FileCheck2} accent="sky" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
