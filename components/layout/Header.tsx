"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '@/lib/utils';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled ? "bg-[#050505]/95 backdrop-blur-sm border-white/5 py-4" : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container mx-auto flex items-center justify-between">
                {/* Institutional Branding */}
                <Link href="/" className="z-50 relative">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-white leading-none">
                            100<span className="text-[var(--primary)]">UNDER</span>40
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500 mt-1">
                            An Initiative of Achievers Summit
                        </span>
                    </div>
                </Link>

                {/* Clean Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {['About', 'Categories', 'Nominees', 'Vote'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Minimal CTA */}
                <div className="hidden md:block">
                    <Link href="/nominate">
                        <Button size="sm" variant="outline" className="px-6 border-white/20 text-white hover:bg-white hover:text-black hover:border-white">
                            Register Nomination
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-[#050505] z-40 flex flex-col items-center justify-center space-y-8 transition-opacity duration-300",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                {['About', 'Categories', 'Nominees', 'Vote'].map((item) => (
                    <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className="text-2xl font-medium text-white hover:text-[var(--primary)] transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item}
                    </Link>
                ))}
                <div className="pt-8">
                    <Link href="/nominate" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button size="md" variant="primary">Start Nomination</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
