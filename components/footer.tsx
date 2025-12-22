import Link from "next/link"
import { Ship } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/layout"

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <Container className="py-16 md:py-24">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
                        Get started
                    </h2>
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <Button size="lg" className="px-8" asChild>
                            <Link href="#pricing">Get ShipApps</Link>
                        </Button>
                        <Link
                            href="#included"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            See what’s included
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 font-bold text-xl mb-6">
                        <Ship className="h-6 w-6" />
                        <span>ShipApps</span>
                    </div>

                    <div className="flex gap-8 text-sm text-muted-foreground">
                        <Link href="#" className="hover:text-foreground">Terms</Link>
                        <Link href="#" className="hover:text-foreground">Privacy</Link>
                        <Link href="#" className="hover:text-foreground">Contact</Link>
                    </div>

                    <p className="mt-8 text-xs text-muted-foreground">
                        © {new Date().getFullYear()} ShipApps. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    )
}
