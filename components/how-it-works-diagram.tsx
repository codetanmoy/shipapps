"use client"

import * as React from "react"
import { FileCheck2, KeyRound, Sparkles, Tags, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  title: string
  subtitle: string
  details: string[]
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  accent: "amber" | "violet" | "sky" | "indigo" | "emerald"
}

const STEPS: Step[] = [
  {
    title: "Review the demo",
    subtitle: "See the real flow first",
    details: ["Watch the video", "Request TestFlight invite"],
    icon: Sparkles,
    accent: "violet",
  },
  {
    title: "Purchase access",
    subtitle: "Get source + demo app",
    details: ["One-time purchase", "Own the code"],
    icon: KeyRound,
    accent: "sky",
  },
  {
    title: "Brand & configure",
    subtitle: "Make it yours",
    details: ["Name, icon, colors", "Supabase + RevenueCat"],
    icon: Wand2,
    accent: "amber",
  },
  {
    title: "Build your features",
    subtitle: "Ship your v1",
    details: ["Extend screens", "Keep structure clean"],
    icon: Tags,
    accent: "emerald",
  },
  {
    title: "Ship to the App Store",
    subtitle: "TestFlight → submit",
    details: ["Follow the checklist", "Submit with confidence"],
    icon: FileCheck2,
    accent: "indigo",
  },
]

type Point = { x: number; y: number }
type Connector = { start: Point; end: Point; delayMs: number }

function midBottom(rect: DOMRect, container: DOMRect): Point {
  return { x: rect.left + rect.width / 2 - container.left, y: rect.bottom - container.top }
}

function midTop(rect: DOMRect, container: DOMRect): Point {
  return { x: rect.left + rect.width / 2 - container.left, y: rect.top - container.top }
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function StepCard(props: { step: Step; index: number }) {
  const { step, index } = props
  const Icon = step.icon

  const accentClasses: Record<Step["accent"], string> = {
    amber: "border-amber-200/70 bg-amber-50/60 shadow-[0_14px_36px_rgba(245,158,11,0.10)]",
    violet: "border-violet-200/70 bg-violet-50/60 shadow-[0_14px_36px_rgba(139,92,246,0.10)]",
    sky: "border-sky-200/70 bg-sky-50/60 shadow-[0_14px_36px_rgba(14,165,233,0.10)]",
    indigo: "border-indigo-200/70 bg-indigo-50/60 shadow-[0_14px_36px_rgba(99,102,241,0.10)]",
    emerald: "border-emerald-200/70 bg-emerald-50/60 shadow-[0_14px_36px_rgba(16,185,129,0.10)]",
  }

  return (
    <div
      className={cn(
        "relative rounded-[22px] border px-6 py-6 text-left md:px-7 md:py-7",
        "backdrop-blur supports-[backdrop-filter]:bg-white/55",
        accentClasses[step.accent]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-black/5 bg-white/55">
          <Icon className="h-4 w-4 text-foreground/80" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-foreground/70">Step {index + 1}</div>
          <div className="mt-1 text-sm font-semibold text-foreground/90">{step.title}</div>
          <div className="mt-0.5 text-xs text-muted-foreground">{step.subtitle}</div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {step.details.map((detail) => (
          <span
            key={detail}
            className="inline-flex items-center rounded-full border border-border/40 bg-background px-3.5 py-1.5 text-xs text-muted-foreground"
          >
            {detail}
          </span>
        ))}
      </div>
    </div>
  )
}

export function HowItWorksDiagram() {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const [size, setSize] = React.useState<{ w: number; h: number } | null>(null)
  const [connectors, setConnectors] = React.useState<Connector[]>([])

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
    if (!containerEl) return

    const containerRect = containerEl.getBoundingClientRect()
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (cards.length < 2) return

    const next: Connector[] = []
    for (let i = 0; i < cards.length - 1; i++) {
      const start = midBottom(cards[i].getBoundingClientRect(), containerRect)
      const end = midTop(cards[i + 1].getBoundingClientRect(), containerRect)
      next.push({ start, end, delayMs: 120 + i * 110 })
    }

    setConnectors(next)
  }, [size?.w, size?.h])

  const pathFor = React.useCallback((start: Point, end: Point) => {
    const dy = clamp(Math.abs(end.y - start.y) * 0.55, 70, 220)
    return `M ${start.x} ${start.y} C ${start.x} ${start.y + dy}, ${end.x} ${end.y - dy}, ${end.x} ${end.y}`
  }, [])

  return (
    <div className="mx-auto mt-10 max-w-[900px]">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-[32px] border border-border/50 bg-card shadow-[0_16px_48px_rgba(0,0,0,0.10)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-70" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-8 h-[420px] w-[420px] rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -right-24 bottom-8 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        {size && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-foreground/35"
            viewBox={`0 0 ${size.w} ${size.h}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2">
              {connectors.map((line, index) => (
                <path
                  key={`h-${index}`}
                  className="flow-dash"
                  style={{ animationDelay: `${line.delayMs}ms` }}
                  d={pathFor(line.start, line.end)}
                />
              ))}
            </g>
          </svg>
        )}

        <div className="relative px-6 py-10 md:px-10 md:py-12">
          <div className="space-y-5 md:space-y-6">
            {STEPS.map((step, index) => (
              <div key={step.title} ref={(el) => { cardRefs.current[index] = el }}>
                <StepCard step={step} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
