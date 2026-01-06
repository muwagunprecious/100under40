import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-semibold text-black mb-2">
                        {label}
                        {props.required && <span className="text-[var(--error)] ml-1">*</span>}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border-2 border-[var(--grey-medium)] bg-white text-black',
                        'placeholder:text-[var(--grey-dark)] focus:border-[var(--primary)] focus:outline-none',
                        'transition-colors duration-200 resize-vertical min-h-[120px]',
                        error && 'border-[var(--error)]',
                        className
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-[var(--error)]">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
