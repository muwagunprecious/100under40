import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        className={cn(
                            "flex h-12 w-full rounded-sm border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-[var(--primary)] transition-colors duration-200", // Minimal focus state
                            error && "border-red-500",
                            className
                        )}
                        {...props}
                    />
                    {error && (
                        <div className="absolute right-3 top-3.5 text-red-500">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                    )}
                </div>
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
