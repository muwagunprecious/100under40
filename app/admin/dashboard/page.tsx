'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Card, { CardContent, CardTitle } from '@/components/ui/Card';
import { Users, FileText, Vote, TrendingUp, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function AdminDashboard() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const stats = [
        { label: 'Total Nominations', value: data?.stats?.totalNominations || 0, icon: FileText, change: `+${data?.stats?.pendingNominations || 0} New`, color: 'text-blue-500' },
        { label: 'Approved Nominees', value: data?.stats?.approvedNominees || 0, icon: Users, change: 'Published', color: 'text-green-500' },
        { label: 'Total Votes Cast', value: (data?.stats?.totalVotes || 0).toLocaleString(), icon: Vote, change: 'All Categories', color: 'text-purple-500' },
        { label: 'Pending Review', value: data?.stats?.pendingNominations || 0, icon: AlertCircle, change: 'Urgent', color: 'text-orange-500' }
    ];

    if (isLoading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-black mb-2">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                {stat.change && (
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                        {stat.change}
                                    </span>
                                )}
                            </div>
                            <div className="text-3xl font-black mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400 font-medium uppercase tracking-wide">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Nominations */}
                <div className="lg:col-span-2">
                    <Card className="h-full border-none shadow-sm">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <CardTitle>Recent Nominations</CardTitle>
                            <Link href="/admin/nominations">
                                <button className="text-sm font-bold text-[var(--primary-dark)]">View All</button>
                            </Link>
                        </div>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {data?.recentNominations?.length > 0 ? (
                                    data.recentNominations.map((nomination: any) => (
                                        <div key={nomination.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 uppercase">
                                                    {nomination.nomineeName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-black">{nomination.nomineeName}</p>
                                                    <p className="text-xs text-gray-500">{nomination.category?.name || 'Uncategorized'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 text-xs font-bold rounded uppercase ${nomination.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                        nomination.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {nomination.status}
                                                </span>
                                                <Link href="/admin/nominations">
                                                    <button className="p-2 text-gray-400 hover:text-black">
                                                        <span className="sr-only">View</span>
                                                        →
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-400">No recent nominations.</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm bg-black text-white">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-4">Quick Insights</h3>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-[var(--primary)] rounded-full animate-pulse"></div>
                                <span className="font-medium text-[var(--primary)] uppercase tracking-wide text-xs">System Live</span>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Engagement</span>
                                    <span className="font-mono font-bold">High</span>
                                </div>
                                <div className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Voter IP Check</span>
                                    <span className="font-mono font-bold text-green-500">Active</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <CardTitle className="mb-4">Shortcuts</CardTitle>
                            <div className="space-y-3">
                                <Link href="/admin/nominations">
                                    <button className="w-full py-3 px-4 bg-[var(--grey-soft)] hover:bg-[var(--grey-medium)] rounded-lg text-sm font-bold text-left flex items-center gap-2 transition-colors mb-3">
                                        <CheckCircle className="h-4 w-4" /> Review Nominations
                                    </button>
                                </Link>
                                <button className="w-full py-3 px-4 bg-[var(--grey-soft)] hover:bg-[var(--grey-medium)] rounded-lg text-sm font-bold text-left flex items-center gap-2 transition-colors">
                                    <TrendingUp className="h-4 w-4" /> Export Analytics
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

