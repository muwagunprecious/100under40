'use client';

import { useState, useEffect } from 'react';
import { Loader2, Award } from 'lucide-react';
import { categories } from '@/lib/mockData';

export default function AwardeesPage() {
    const [awardees, setAwardees] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        const fetchAwardees = async () => {
            try {
                const res = await fetch('/api/awardees');
                if (res.ok) {
                    const data = await res.json();
                    setAwardees(data);
                }
            } catch (err) {
                console.error('Failed to load awardees', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAwardees();
    }, []);

    const filteredAwardees = selectedCategory === 'all'
        ? awardees
        : awardees.filter(a => a.categoryId === selectedCategory);

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 font-sans">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                        <Award className="w-3.5 h-3.5" />
                        Official Honorees
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                        The Confirmed Awardees
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
                        Celebrating the exceptional young Africans inducted into the Class of 2026 for their consequential leadership.
                    </p>
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                            selectedCategory === 'all'
                                ? 'bg-[var(--primary)] text-black border-[var(--primary)] font-black'
                                : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                        }`}
                    >
                        All Categories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                                selectedCategory === cat.id
                                    ? 'bg-[var(--primary)] text-black border-[var(--primary)] font-black'
                                    : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
                    </div>
                ) : awardees.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 border-dashed rounded-3xl max-w-2xl mx-auto bg-white/[0.01]">
                        <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Honorees Unveiling Soon</h3>
                        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                            The official award winners are currently undergoing final vetting. Stay tuned for the grand announcement.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 animate-fade-in">
                        {filteredAwardees.map((awardee) => {
                            const category = categories.find(c => c.id === awardee.categoryId);
                            return (
                                <div key={awardee.id} className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all flex flex-col items-center p-6 text-center group hover:shadow-[0_10px_30px_rgba(200,255,0,0.02)]">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white/5 border-2 border-white/5 group-hover:border-[var(--primary)]/50 transition-all shrink-0 mb-4 shadow-xl">
                                        {awardee.photoUrl ? (
                                            <img src={awardee.photoUrl} alt={awardee.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/30 bg-white/[0.02]">
                                                <Award className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-base font-black text-white leading-snug group-hover:text-[var(--primary)] transition-colors line-clamp-1">{awardee.name}</h3>
                                    <span className="inline-block mt-2.5 text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 max-w-full truncate">
                                        {category?.name || 'General Category'}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
