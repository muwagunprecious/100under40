'use client';

import { useState } from 'react';
import Card, { CardTitle, CardContent } from '@/components/ui/Card';
import { BarChart, Users, CheckCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { adminStats } from '@/lib/mockData';

export default function AdminDashboard() {
    const { totalNominations, pendingNominations, approvedNominees, totalVotes, recentNominations } = adminStats;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black mb-1">Dashboard</h1>
                <p className="text-gray-500">Overview of the 100 Under 40 Awards platform</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Nominations</p>
                                <p className="text-3xl font-black">{totalNominations}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                <BarChart className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Pending Review</p>
                                <p className="text-3xl font-black">{pendingNominations}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Approved Nominees</p>
                                <p className="text-3xl font-black">{approvedNominees}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Votes</p>
                                <p className="text-3xl font-black">{totalVotes.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Nominations */}
            <Card className="border-none shadow-sm">
                <CardContent className="p-6">
                    <CardTitle className="mb-6">Recent Nominations</CardTitle>
                    <div className="space-y-4">
                        {recentNominations.map((nom: any) => (
                            <div key={nom.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex-grow">
                                    <p className="font-bold text-black">{nom.nomineeName}</p>
                                    <p className="text-sm text-gray-500">{nom.category?.name}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${nom.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            nom.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {nom.status}
                                    </span>
                                    <Link href="/admin/nominations" className="text-sm font-bold text-[var(--primary-dark)] hover:underline">
                                        View
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Shortcuts */}
            <div className="grid md:grid-cols-3 gap-6">
                <Link href="/admin/nominations">
                    <Card hover className="border-none shadow-sm cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <Users className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                            <p className="font-bold">Manage Nominations</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/admin/voting">
                    <Card hover className="border-none shadow-sm cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <TrendingUp className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                            <p className="font-bold">Voting Analytics</p>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/nominees">
                    <Card hover className="border-none shadow-sm cursor-pointer">
                        <CardContent className="p-6 text-center">
                            <CheckCircle className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                            <p className="font-bold">View Nominees</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
