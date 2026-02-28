'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
    showCloseButton?: boolean;
    variant?: 'default' | 'premium';
}

export default function Modal({
    isOpen,
    onClose,
    children,
    title,
    className,
    showCloseButton = true,
    variant = 'default',
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div
                ref={modalRef}
                className={cn(
                    "rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300 border",
                    variant === 'premium'
                        ? "bg-[var(--charcoal)] border-white/10 text-white"
                        : "bg-white border-gray-100 text-black",
                    className
                )}
            >
                {(title || showCloseButton) && (
                    <div className={cn(
                        "flex items-center justify-between p-6 border-b",
                        variant === 'premium' ? "border-white/5" : "border-gray-50"
                    )}>
                        {title && <h3 className="text-xl font-bold tracking-tight">{title}</h3>}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className={cn(
                                    "p-2 rounded-full transition-colors",
                                    variant === 'premium'
                                        ? "hover:bg-white/10 text-gray-400 hover:text-white"
                                        : "hover:bg-gray-100 text-gray-500 hover:text-black"
                                )}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
