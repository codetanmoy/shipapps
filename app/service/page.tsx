import Link from "next/link"
import { ArrowRight, CalendarDays, Check, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container, Section } from "@/components/ui/layout"
import { MvpSprintRequest } from "@/components/mvp-sprint-request"

export default function ServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/15">
      <Header />
      <main className="flex-1">
        <Section className="pt-16 pb-10 md:pt-24 md:pb-16">
          <Container>
            <div className="mx-auto max-w-[880px] text-center">
              <Badge variant="secondary" className="border border-border/40 bg-background text-foreground">
                Limited availability
              </Badge>
              <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">iOS MVP Sprint</h1>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground md:text-2xl">
                A fixed-scope iOS MVP — designed and built in 14 days.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="#request">
                    Request availability <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  href="/#pricing"
                  className="inline-flex h-12 items-center justify-center px-2 text-base font-medium text-primary hover:underline underline-offset-4"
                >
                  Prefer ShipApps instead?
                </Link>
              </div>
              <p className="mt-10 text-sm text-muted-foreground">
                You get a working app — not a prototype — ready for TestFlight and App Store submission.
              </p>
            </div>
          </Container>
        </Section>

        <Section className="py-8 md:py-10">
          <Container>
            <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <div className="px-6 py-10 md:px-12 md:py-14">
                <div className="mx-auto max-w-[900px]">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-1">
                      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What this is</h2>
                      <p className="mt-3 text-sm text-muted-foreground">
                        A focused sprint. Not an open-ended engagement.
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <div className="rounded-[22px] bg-muted/35 p-7">
                        <p className="text-base leading-relaxed text-muted-foreground">
                          A <span className="font-medium text-foreground">fixed-scope iOS MVP</span>, designed and built in{" "}
                          <span className="font-medium text-foreground">14 days</span>. The goal is to ship a real first version to{" "}
                          <span className="font-medium text-foreground">TestFlight</span> and get you ready for App Store submission.
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                          Built using a proven internal iOS foundation to move fast and reduce risk.
                        </p>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[22px] bg-muted/35 p-7">
                          <h3 className="text-lg font-semibold">What’s included</h3>
                          <ul className="mt-5 space-y-3 text-muted-foreground">
                            {[
                              "iOS app design (SwiftUI)",
                              "6–8 production-ready screens",
                              "User authentication",
                              "One core feature (defined upfront)",
                              "Backend setup (as required)",
                              "TestFlight build",
                              "App Store–ready structure",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-[22px] bg-muted/35 p-7">
                          <h3 className="text-lg font-semibold">Timeline</h3>
                          <div className="mt-5 space-y-3 text-muted-foreground">
                            {[
                              { label: "Day 1–2", detail: "Scope confirmation & design direction" },
                              { label: "Day 3–10", detail: "Development" },
                              { label: "Day 11–14", detail: "Testing, polish, TestFlight delivery" },
                            ].map((step) => (
                              <div
                                key={step.label}
                                className="flex items-start gap-3 rounded-[18px] border border-border/40 bg-background px-5 py-4"
                              >
                                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-foreground/60" />
                                <div className="min-w-0">
                                  <div className="text-sm font-semibold text-foreground">{step.label}</div>
                                  <div className="mt-1 text-sm text-muted-foreground">{step.detail}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-[22px] bg-muted/35 p-7">
                          <h3 className="text-lg font-semibold">Pricing</h3>
                          <div className="mt-5 flex items-baseline gap-2">
                            <div className="text-5xl font-semibold tracking-tight">$5,000</div>
                            <div className="text-sm font-medium text-muted-foreground">fixed</div>
                          </div>
                          <ul className="mt-6 space-y-3 text-muted-foreground">
                            {["No hourly billing", "No hidden costs", "No scope creep"].map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <Check className="mt-0.5 h-5 w-5 shrink-0 text-foreground/70" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 rounded-[18px] border border-border/40 bg-background p-5 text-sm text-muted-foreground">
                            <div className="font-medium text-foreground">Payment</div>
                            <div className="mt-2">$5,000 upfront</div>
                            <div className="mt-1">(or 50% upfront + 50% on TestFlight delivery)</div>
                          </div>
                        </div>

                        <div className="rounded-[22px] bg-muted/35 p-7">
                          <h3 className="text-lg font-semibold">What this is not</h3>
                          <ul className="mt-5 space-y-3 text-muted-foreground">
                            {[
                              "Not a long-term engagement",
                              "Not unlimited revisions",
                              "Not marketplaces, chat apps, or complex systems",
                              "Not ongoing support or maintenance",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <X className="mt-0.5 h-5 w-5 shrink-0 text-foreground/50" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-6 text-sm text-muted-foreground">
                            This sprint is about <span className="font-medium text-foreground">shipping</span>, not experimenting.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Container>
        </Section>

        <Section id="request" className="py-8 md:py-10">
          <Container>
            <Card className="rounded-[28px] border-border/40 bg-card shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <div className="px-6 py-10 md:px-12 md:py-14">
                <div className="mx-auto max-w-[820px] text-center">
                  <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Availability</h2>
                  <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                    I only take 1–2 MVP sprints at a time. If this fits your needs and timeline, reach out.
                  </p>
                </div>

                <div className="mx-auto mt-10 max-w-[820px]">
                  <MvpSprintRequest />
                </div>
              </div>
            </Card>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  )
}

