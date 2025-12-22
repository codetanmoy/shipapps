import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/layout"
import Image from "next/image"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container className="flex h-14 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
                        <Image src="/shipapps.png" alt="ShipApps" width={20} height={20} className="h-5 w-5" />
                        <span>ShipApps</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
                    <Link href="#demo" className="hover:text-foreground transition-colors">Demo</Link>
                    <Link href="#apps" className="hover:text-foreground transition-colors">Apps</Link>
                    <Link href="#ios" className="hover:text-foreground transition-colors">iOS</Link>
                    <Link href="#included" className="hover:text-foreground transition-colors">Included</Link>
                    <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
                    <Link href="#how" className="hover:text-foreground transition-colors">How</Link>
                    <Link href="#why" className="hover:text-foreground transition-colors">Why</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <Button size="sm" className="h-9 rounded-full px-4" asChild>
                        <Link href="#pricing">Get ShipApps</Link>
                    </Button>
                </div>
            </Container>
        </header>
    )
}
