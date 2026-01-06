import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {

        // "Deliberate" feel: No aggressive scales, just solid colors
        const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:ring-offset-1 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none rounded-sm uppercase tracking-wider";

        const variants = {
            primary: "bg-[var(--primary)] text-black hover:bg-[#B3E600] border border-transparent shadow-sm", // Solid, no glow
            secondary: "bg-white/10 text-white hover:bg-white/15 border border-white/5",
            outline: "bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10",
            ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs",
            md: "h-12 px-6 text-xs",
            lg: "h-14 px-8 text-sm",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
