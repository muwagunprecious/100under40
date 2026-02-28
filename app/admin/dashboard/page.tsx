'use client';

import { useEffect, useState } from 'react';
import Card, { CardTitle, CardContent } from '@/components/ui/Card';
import { BarChart, Users, CheckCircle, TrendingUp, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [nominations, setNominations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        categories: 0
    });

    useEffect(() => {
        fetchNominations();
    }, []);

    const fetchNominations = async () => {
        try {
            const response = await fetch('/api/nominations');
            if (response.ok) {
                const data = await response.json();
                setNominations(data);

                // Calculate stats based on real data
                const total = data.length;
                const pending = data.filter((n: any) => n.status === 'pending' || !n.status).length;
                const approved = data.filter((n: any) => n.status === 'approved').length;

                setStats({
                    total,
                    pending,
                    approved,
                    categories: new Set(data.map((n: any) => n.categoryId)).size
                });
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-[var(--primary)] animate-spin" />
            </div>
        );
    }

    const recentNominations = nominations.slice(0, 5);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black mb-1">Dashboard</h1>
                <p className="text-gray-500 font-medium">Platform Management Hub</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm h-32">
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total Nominations</p>
                                <p className="text-3xl font-black text-black">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50/50 rounded-2xl flex items-center justify-center border border-blue-100">
                                <BarChart className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm h-32">
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Awaiting Review</p>
                                <p className="text-3xl font-black text-black">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-50/50 rounded-2xl flex items-center justify-center border border-yellow-100">
                                <Users className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm h-32">
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Approved Nominees</p>
                                <p className="text-3xl font-black text-black">{stats.approved}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-50/50 rounded-2xl flex items-center justify-center border border-green-100">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm h-32">
                    <CardContent className="p-6 h-full flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Global Sectors</p>
                                <p className="text-3xl font-black text-black">{stats.categories}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-50/50 rounded-2xl flex items-center justify-center border border-purple-100">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Nominations */}
            <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                    <CardTitle className="mb-6 flex justify-between items-center">
                        Recent Nominations
                        {nominations.length > 0 && (
                            <Link href="/admin/nominations" className="text-xs font-bold text-[var(--primary-dark)] hover:underline uppercase tracking-widest">
                                View All
                            </Link>
                        )}
                    </CardTitle>

                    <div className="space-y-4">
                        {recentNominations.length > 0 ? (
                            recentNominations.map((nom: any) => (
                                <div key={nom.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100/50">
                                    <div className="flex-grow">
                                        <p className="font-bold text-black">{nom.nomineeName}</p>
                                        <p className="text-sm text-gray-500">{nom.categoryName || 'General Category'}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${nom.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            nom.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {nom.status || 'pending'}
                                        </span>
                                        <Link href={`/admin/nominees/${nom.id}`} className="p-2 hover:bg-white rounded-lg transition-colors group">
                                            <TrendingUp className="h-4 w-4 text-gray-400 group-hover:text-black" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                <p className="text-gray-400 font-medium">No nominations received yet.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Shortcuts */}
            <div className="grid md:grid-cols-3 gap-6">
                <Link href="/admin/nominations">
                    <Card hover className="border-none shadow-sm cursor-pointer h-full">
                        <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                            <Users className="h-10 w-10 mb-4 text-gray-400 group-hover:text-[var(--primary)] transition-colors" />
                            <p className="font-bold uppercase tracking-widest text-xs">Manage Nominations</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/voting">
                    <Card hover className="border-none shadow-sm cursor-pointer h-full">
                        <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                            <TrendingUp className="h-10 w-10 mb-4 text-gray-400 group-hover:text-[var(--primary)] transition-colors" />
                            <p className="font-bold uppercase tracking-widest text-xs">Voting Analytics</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/nominees">
                    <Card hover className="border-none shadow-sm cursor-pointer h-full">
                        <CardContent className="p-8 text-center flex flex-col items-center justify-center h-full">
                            <CheckCircle className="h-10 w-10 mb-4 text-gray-400 group-hover:text-[var(--primary)] transition-colors" />
                            <p className="font-bold uppercase tracking-widest text-xs">Public Board</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
