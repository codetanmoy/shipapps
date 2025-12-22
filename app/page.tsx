import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Container, Section } from "@/components/ui/layout"
import { DemoTrustLayerSection } from "@/components/demo-trust-layer"
import { HeroFlowDiagram } from "@/components/hero-flow-diagram"
import {
  LogoClusterSection,
  BuiltForIOSSection,
  FeaturesSection,
  ScopeSection,
  PricingSection,
  HowItWorksSection,
  PhilosophySection,
} from "@/components/landing-sections"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/15">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <Section className="pt-16 pb-10 md:pt-24 md:pb-16">
          <Container className="text-center">
            <div className="mx-auto max-w-[820px]">
              <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
                Launch your iOS app
                <br />
                without rebuilding everything.
              </h1>
              <p className="mt-5 text-xl leading-relaxed text-muted-foreground md:text-2xl">
                A production-ready app launch system for iOS — designed to help you ship faster, with confidence.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="#pricing">
                    Get ShipApps <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  href="#demo"
                  className="inline-flex h-12 items-center justify-center px-2 text-base font-medium text-primary hover:underline underline-offset-4"
                >
                  Watch the demo
                </Link>
              </div>
              <p className="mt-10 text-sm text-muted-foreground">
                Most iOS apps don’t fail because of the idea — they fail because the basics take too long to get right.
              </p>
            </div>

            <HeroFlowDiagram />
          </Container>
        </Section>

        <DemoTrustLayerSection />
        <LogoClusterSection />
        <BuiltForIOSSection />
        <FeaturesSection />
        <ScopeSection />
        <PricingSection />
        <HowItWorksSection />
        <PhilosophySection />
      </main>
      <Footer />
    </div>
  );
}
