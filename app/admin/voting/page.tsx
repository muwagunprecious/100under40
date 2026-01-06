'use client';

import Card, { CardTitle, CardContent } from '@/components/ui/Card';
import { BarChart3, TrendingUp, PieChart } from 'lucide-react';

// Mock Data
const categoryVotes = [
    { category: 'Technology & Innovation', votes: 12500, percentage: 35 },
    { category: 'Business & Entrepreneurship', votes: 8400, percentage: 24 },
    { category: 'Social Impact', votes: 6200, percentage: 18 },
    { category: 'Creative Arts', votes: 4800, percentage: 14 },
    { category: 'Media & Journalism', votes: 3100, percentage: 9 },
];

const topNominees = [
    { name: 'Sarah Johnson', category: 'Technology', votes: 4500 },
    { name: 'David Osei', category: 'Business', votes: 3800 },
    { name: 'Zainab Ahmed', category: 'Social Impact', votes: 3200 },
    { name: 'Michael Kibuuka', category: 'Technology', votes: 2900 },
    { name: 'Amara Diop', category: 'Creative Arts', votes: 2100 },
];

export default function VotingAnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black mb-1">Voting Analytics</h1>
                <p className="text-gray-500">Real-time insights into voting trends. <span className="text-red-500 font-bold ml-2">CONFIDENTIAL</span></p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Category Breakdown */}
                <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <PieChart className="h-5 w-5 text-gray-400" />
                            <CardTitle>Category Distribution</CardTitle>
                        </div>
                        <div className="space-y-6">
                            {categoryVotes.map((cat, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-bold text-gray-700">{cat.category}</span>
                                        <span className="text-gray-500">{cat.votes.toLocaleString()} votes ({cat.percentage}%)</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[var(--primary)] rounded-full"
                                            style={{ width: `${cat.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Nominees */}
                <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <TrendingUp className="h-5 w-5 text-gray-400" />
                            <CardTitle>Top Performers</CardTitle>
                        </div>

                        <div className="space-y-4">
                            {topNominees.map((nominee, i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-4">
                                        <span className={`w-6 h-6 flex items-center justify-center font-black text-sm rounded ${i < 3 ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'}`}>
                                            {i + 1}
                                        </span>
                                        <div>
                                            <p className="font-bold text-black">{nominee.name}</p>
                                            <p className="text-xs text-gray-500">{nominee.category}</p>
                                        </div>
                                    </div>
                                    <div className="font-mono font-bold text-lg">
                                        {nominee.votes.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
