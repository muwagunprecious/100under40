'use client';

import { useState, useEffect } from 'react';
import { Loader2, Users, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/lib/mockData';

export default function NomineesPage() {
    const [nominees, setNominees] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        const fetchNominees = async () => {
            try {
                const res = await fetch('/api/nominees');
                if (res.ok) {
                    const data = await res.json();
                    setNominees(data);
                }
            } catch (err) {
                console.error('Failed to load nominees', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNominees();
    }, []);

    const filteredNominees = selectedCategory === 'all'
        ? nominees
        : nominees.filter(n => n.categoryId === selectedCategory);

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-32 pb-24 font-sans">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                        <Users className="w-3.5 h-3.5" />
                        Class of 2026 Nominees
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                        Meet the Nominees
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
                        Cast your vote for the most consequential young leaders driving transformative change across Africa.
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
                ) : nominees.length === 0 ? (
                    <div className="text-center py-20 border border-white/5 border-dashed rounded-3xl max-w-2xl mx-auto bg-white/[0.01]">
                        <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">Vetting Phase Active</h3>
                        <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                            Nominees list is being verified by the committee and will be available for public voting shortly.
                        </p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {filteredNominees.map((nom) => {
                            const category = categories.find(c => c.id === nom.categoryId);
                            return (
                                <div key={nom.id} className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all flex flex-col justify-between group hover:shadow-[0_10px_30px_rgba(200,255,0,0.02)]">
                                    <div className="p-6 space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                                                {nom.photoUrl ? (
                                                    <img src={nom.photoUrl} alt={nom.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/30 bg-white/[0.02]">
                                                        <Users className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-black text-white leading-snug group-hover:text-[var(--primary)] transition-colors">{nom.name}</h3>
                                                <span className="inline-block mt-1.5 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                                                    {category?.name || 'General Category'}
                                                </span>
                                            </div>
                                        </div>
                                        {nom.bio && (
                                            <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-3">
                                                {nom.bio}
                                            </p>
                                        )}
                                    </div>
                                    <div className="p-6 pt-0">
                                        <Link href={`/nominees/${nom.id}`} className="w-full">
                                            <button className="w-full h-12 bg-white/5 hover:bg-[var(--primary)] hover:text-black border border-white/10 hover:border-transparent transition-all rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 group-hover:translate-y-0 duration-300 cursor-pointer">
                                                View Profile
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
