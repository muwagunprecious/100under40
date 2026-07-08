export const dynamic = 'force-dynamic';

import sql from '@/lib/db';
import Card, { CardContent } from '@/components/ui/Card';
import { BarChart3, Users, Award, ShieldCheck } from 'lucide-react';
import { categories } from '@/lib/mockData';

export default async function VotingAnalyticsPage() {
    let nominees: any[] = [];
    try {
        nominees = await sql`
            SELECT * FROM "VoteNominee" ORDER BY "votesCount" DESC
        `;
    } catch (e) {
        console.error('Failed to fetch voting stats', e);
    }

    const totalVotes = nominees.reduce((acc, curr) => acc + (curr.votesCount || 0), 0);

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto font-sans">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-1">Voting Analytics</h1>
                    <p className="text-gray-500 font-medium">Real-time voting statistics and category standings</p>
                </div>
                <div className="bg-[#0A0A0A] border border-white/5 px-6 py-3 rounded-2xl flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Votes Cast</span>
                    <span className="text-2xl font-black text-[var(--primary)]">{totalVotes}</span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Stats cards */}
                <div className="p-6 bg-[#0A0A0A] border border-white/5 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl text-[var(--primary)]">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase text-gray-500">Nominees Listed</div>
                        <div className="text-2xl font-black text-white">{nominees.length}</div>
                    </div>
                </div>

                <div className="p-6 bg-[#0A0A0A] border border-white/5 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl text-[var(--primary)]">
                        <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase text-gray-500">Most Active Category</div>
                        <div className="text-sm font-black text-white truncate max-w-[200px]">
                            {nominees.length > 0 
                                ? (categories.find(c => c.id === nominees[0].categoryId)?.name || 'General')
                                : 'None'
                            }
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-[#0A0A0A] border border-white/5 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-xl text-[var(--primary)]">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase text-gray-500">Status</div>
                        <div className="text-sm font-black text-green-500">AES-256 Secured</div>
                    </div>
                </div>
            </div>

            <Card className="bg-[#0A0A0A] border-white/5 font-sans">
                <CardContent className="p-6">
                    <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6">Leaderboard Standings</h2>
                    
                    {nominees.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No nominees found. Upload nominees in the "Voting Nominees" section to start collecting votes.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-white/5 text-gray-400">
                                    <tr>
                                        <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Rank</th>
                                        <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Nominee</th>
                                        <th className="pb-4 font-bold uppercase tracking-wider text-[10px]">Category</th>
                                        <th className="pb-4 font-bold uppercase tracking-wider text-[10px] text-right">Votes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {nominees.map((nom, index) => {
                                        const category = categories.find(c => c.id === nom.categoryId);
                                        return (
                                            <tr key={nom.id} className="hover:bg-white/[0.01] transition-colors">
                                                <td className="py-4 font-black text-gray-500 text-sm w-12">
                                                    #{index + 1}
                                                </td>
                                                <td className="py-4 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                                                        {nom.photoUrl ? (
                                                            <img src={nom.photoUrl} alt={nom.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-white/40 bg-white/[0.02]">
                                                                <Users className="w-4 h-4" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white text-sm">{nom.name}</div>
                                                        <div className="text-xs text-gray-500">{nom.email || 'No email provided'}</div>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-xs font-semibold text-gray-400">
                                                        {category?.name || 'General Category'}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-right font-black text-[var(--primary)] text-base">
                                                    {nom.votesCount}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
