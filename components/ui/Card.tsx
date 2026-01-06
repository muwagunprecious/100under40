import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }
>(({ className, hover = false, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-sm border border-white/5 bg-[#0A0A0A] text-white transition-all duration-300 relative", // Charcoal bg, subtle border
            hover && "hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:shadow-lg group", // Minimal lift, no neon glow
            className
        )}
        {...props}
    >
        {/* Very subtle accent line on top for 'hover' cards */}
        {hover && <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>}
        <div className="relative z-10">
            {props.children}
        </div>
    </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6 md:p-8", className)}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-semibold leading-tight text-white group-hover:text-white transition-colors", // No color change on text
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 md:p-8 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
export default Card
