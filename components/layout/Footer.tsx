import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <span className="text-3xl font-black tracking-tighter leading-none text-white">
                                100<span className="text-[var(--primary)]">UNDER</span>40
                            </span>
                            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                                Awards
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Recognizing and celebrating exceptional individuals under the age of 40 who are making significant impacts in their respective fields across Africa.
                        </p>

                        {/* Initiative Branding - High Priority */}
                        <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333]">
                            <p className="text-[10px] uppercase tracking-widest text-[#888] mb-1">An Initiative of</p>
                            <h4 className="text-lg font-bold text-white tracking-tight">ACHIEVERS SUMMIT</h4>
                        </div>
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
                                { name: 'Past Winners', href: '#' },
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
                                <span>Radisson Blu Hotel,<br />Nairobi Upper Hill, Kenya</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="h-5 w-5 text-[var(--primary)] shrink-0" />
                                <a href="mailto:info@100under40.com" className="hover:text-white transition-colors">
                                    info@100under40.com
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
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-[var(--primary)] transition-colors"
                            />
                            <button
                                type="button"
                                className="w-full bg-[var(--primary)] text-black font-bold text-sm py-2 rounded hover:bg-[var(--primary-hover)] transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {currentYear} 100 Under 40 Awards. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1a1a1a] text-gray-400 hover:bg-[var(--primary)] hover:text-black transition-all"
                            >
                                <Icon className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
