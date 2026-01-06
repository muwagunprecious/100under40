import Card, { CardContent, CardTitle } from '@/components/ui/Card';
import { Users, FileText, Vote, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
    // Mock Stats - In real app, fetch from DB
    const stats = [
        { label: 'Total Nominations', value: '1,245', icon: FileText, change: '+12%', color: 'text-blue-500' },
        { label: 'Approved Nominees', value: '85', icon: Users, change: '65 Pending', color: 'text-green-500' },
        { label: 'Total Votes Cast', value: '45.2k', icon: Vote, change: '+5.4k today', color: 'text-purple-500' },
        { label: 'Site Visits', value: '128k', icon: TrendingUp, change: '+18%', color: 'text-orange-500' }
    ];

    return (
        <div className="space-y-8">
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
                            <button className="text-sm font-bold text-[var(--primary-dark)]">View All</button>
                        </div>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                                                JD
                                            </div>
                                            <div>
                                                <p className="font-bold text-black">John Doe</p>
                                                <p className="text-xs text-gray-500">Technology & Innovation</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded">Pending</span>
                                            <button className="p-2 text-gray-400 hover:text-black">
                                                <span className="sr-only">View</span>
                                                →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Voting Alerts / Quick Actions */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm bg-black text-white">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-4">Live Voting Status</h3>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 bg-[var(--primary)] rounded-full animate-pulse"></div>
                                <span className="font-medium text-[var(--primary)] uppercase tracking-wide text-xs">System Active</span>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Votes / Hour</span>
                                    <span className="font-mono font-bold">1,204</span>
                                </div>
                                <div className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-sm text-gray-400">Top Category</span>
                                    <span className="font-mono font-bold text-[var(--primary)]">Tech</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <CardTitle className="mb-4">Quick Actions</CardTitle>
                            <div className="space-y-3">
                                <button className="w-full py-3 px-4 bg-[var(--grey-soft)] hover:bg-[var(--grey-medium)] rounded-lg text-sm font-bold text-left flex items-center gap-2 transition-colors">
                                    <CheckCircle className="h-4 w-4" /> Approve Pending (5)
                                </button>
                                <button className="w-full py-3 px-4 bg-[var(--grey-soft)] hover:bg-[var(--grey-medium)] rounded-lg text-sm font-bold text-left flex items-center gap-2 transition-colors">
                                    <Users className="h-4 w-4" /> Add New Nominee
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
