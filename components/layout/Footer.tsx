'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Loader2, CheckCircle2 } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to connect to the server.');
        }
    };

    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Image
                            src="/logo.jpg"
                            alt="100 Under 40 Awards"
                            width={80}
                            height={80}
                            className="rounded"
                        />
                        <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                            An Initiative of <span className="text-white">Emmanuel Agida International</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Recognizing and celebrating exceptional individuals under the age of 40 who are making significant impacts in their respective fields across Africa.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-[var(--primary)]">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'About The Awards', href: '/about' },
                                { name: 'Award Categories', href: '/categories' },
                                { name: 'Nominate', href: '/nominate' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[var(--primary)] transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-[var(--primary)]">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="h-5 w-5 text-[var(--primary)] shrink-0" />
                                <span>Lagos Nigeria</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="h-5 w-5 text-[var(--primary)] shrink-0" />
                                <a href="mailto:info@100under40.org" className="hover:text-white transition-colors">
                                    info@100under40.org
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-[var(--primary)]">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to our newsletter for updates on nominations and voting.
                        </p>

                        {status === 'success' ? (
                            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                <p className="text-sm text-green-500 font-medium">{message}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    required
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                                />
                                {status === 'error' && (
                                    <p className="text-xs text-red-500 font-medium">{message}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-[var(--primary)] disabled:opacity-50 text-black font-bold text-sm py-2 rounded hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center gap-2"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Subscribing...
                                        </>
                                    ) : (
                                        'Subscribe'
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {currentYear} 100 Under 40 Awards. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {[
                            { Icon: Facebook, href: 'https://facebook.com/100under40' },
                            { Icon: Twitter, href: 'https://twitter.com/100under40' },
                            { Icon: Instagram, href: 'https://www.instagram.com/100under40?igsh=MWo1MjJrY3Jvend6aA==' },
                            { Icon: Linkedin, href: 'https://linkedin.com/company/100under40' },
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a1a] text-gray-400 hover:bg-[var(--primary)] hover:text-black transition-all"
                            >
                                <social.Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
