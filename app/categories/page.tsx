'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Bell } from 'lucide-react';
import Card, { CardContent } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { categories, nominees } from '@/lib/mockData';

export default function CategoriesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate nominee count per category
    const categoriesWithCount = categories.map(cat => ({
        ...cat,
        count: nominees.filter(n => n.categoryId === cat.id && n.published).length
    }));

    return (
        <div className="bg-black min-h-screen py-20 overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <div className="inline-flex items-center space-x-2 text-[var(--primary)] mb-6">
                        <div className="w-12 h-[1px] bg-[var(--primary)]"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">Executive Sectors</span>
                        <div className="w-12 h-[1px] bg-[var(--primary)]"></div>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-white uppercase leading-none">
                        Sectors of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">Influence</span>
                    </h1>
                    <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                        Identifying excellence across strategic sectors pivotal to Africa's socio-economic transformation.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categoriesWithCount.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => setIsModalOpen(true)}
                            className="group cursor-pointer relative"
                        >
                            {/* Card Body */}
                            <div className="relative h-full bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 transition-all duration-500 hover:border-[var(--primary)]/50 hover:-translate-y-2 overflow-hidden shadow-2xl">

                                {/* Institutional Watermark */}
                                <div className="absolute -top-4 -right-4 opacity-[0.03] rotate-12 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-0">
                                    <span className="text-9xl font-black text-white select-none">100</span>
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-[var(--primary)]/20 group-hover:border-[var(--primary)]/30 transition-colors">
                                            <ArrowRight className="h-6 w-6 text-white group-hover:text-[var(--primary)] -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                        </div>
                                        <span className="text-xs font-black text-[var(--primary)] uppercase tracking-widest bg-[var(--primary)]/10 px-3 py-1 rounded-full">
                                            {category.count} Listings
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight group-hover:text-[var(--primary)] transition-colors">
                                        {category.name}
                                    </h3>

                                    <p className="text-gray-500 mb-8 line-clamp-3 font-medium leading-relaxed group-hover:text-gray-400 transition-colors">
                                        {category.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 group-hover:text-[var(--primary)] transition-colors">
                                            Vetting Active
                                        </span>
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-[#1a1a1a] flex items-center justify-center">
                                                    <div className="w-full h-full rounded-full bg-white/5 animate-pulse"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Shadow Glow */}
                            <div className="absolute inset-0 bg-[var(--primary)]/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-[2rem]"></div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                variant="premium"
                className="max-w-md border-none shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
            >
                <div className="text-center py-6 relative overflow-hidden">
                    {/* Institutional Accent */}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <span className="text-7xl font-black text-white leading-none">100</span>
                    </div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(200,255,0,0.1)]">
                            <Bell className="h-10 w-10 text-[var(--primary)]" />
                        </div>

                        <div className="space-y-2 mb-8 uppercase tracking-widest">
                            <h2 className="text-4xl font-black text-white">GENESIS</h2>
                            <p className="text-[var(--primary)] font-bold text-[10px] tracking-[0.4em]">Official Announcement</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-10 text-center">
                            <p className="text-gray-300 font-medium leading-relaxed italic">
                                "Executive profiles for this sector are currently undergoing final vetting. Stay tuned for the official class unveiling."
                            </p>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-[var(--primary)] transition-all duration-300 shadow-xl shadow-black/20"
                        >
                            Acknowledge
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
