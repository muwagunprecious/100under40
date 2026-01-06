'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Card, { CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { nominees, categories } from '@/lib/mockData';

export default function NomineesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categoryNames = ['All', ...categories.map(c => c.name)];

    const filteredNominees = nominees.filter((nominee) => {
        const matchesCategory = selectedCategory === 'All' || nominee.category?.name === selectedCategory;
        const matchesSearch = nominee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            nominee.bio.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch && nominee.published;
    });

    return (
        <div className="bg-[var(--grey-soft)] min-h-screen py-12">
            {/* Header */}
            <div className="container mx-auto px-4 mb-12">
                <h1 className="text-4xl font-black mb-4">2026 Nominees</h1>
                <p className="text-gray-600 max-w-2xl text-lg">
                    Meet the exceptional individuals who have been shortlisted for the 2026 100 Under 40 Awards.
                    {/* Vote for your favorites below. */}
                </p>
            </div>

            {/* Filters */}
            <div className="container mx-auto px-4 mb-12">
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                    {/* Category Tabs */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${selectedCategory === cat
                                    ? 'bg-[var(--primary)] text-black'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search nominees..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[var(--primary)] text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4">
                {filteredNominees.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNominees.map((nominee) => (
                            <Card key={nominee.id} hover className="overflow-hidden group h-full flex flex-col">
                                <div className="h-64 bg-gray-200 relative">
                                    {/* Placeholder for Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <span className="text-4xl font-bold opacity-20">{nominee.name.charAt(0)}</span>
                                    </div>
                                    {nominee.photoUrl && (
                                        <Image
                                            src={nominee.photoUrl}
                                            alt={nominee.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                </div>
                                <CardContent className="p-6 flex-grow flex flex-col">
                                    <div className="text-xs font-bold text-[var(--primary-dark)] uppercase tracking-wider mb-2">
                                        {nominee.category?.name}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--primary-dark)] transition-colors">
                                        {nominee.name}
                                    </h3>
                                    <p className="text-gray-500 mb-6 line-clamp-2 flex-grow">
                                        {nominee.bio}
                                    </p>

                                    <Link href={`/vote?nomineeId=${nominee.id}`} className="mt-auto">
                                        <Button className="w-full rounded-full grid grid-cols-[1fr,auto] items-center px-6">
                                            <span className="text-center font-bold">Vote</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl">
                        <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No nominees found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
