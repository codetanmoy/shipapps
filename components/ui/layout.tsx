import * as React from "react"
import { cn } from "@/lib/utils"

const Section = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
    <section
        ref={ref}
        className={cn("py-16 md:py-24", className)}
        {...props}
    />
))
Section.displayName = "Section"

const Container = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("mx-auto w-full max-w-[1120px] px-6 sm:px-8", className)}
        {...props}
    />
))
Container.displayName = "Container"

export { Section, Container }
