export const dynamic = 'force-dynamic';

import sql from '@/lib/db';
import Card from '@/components/ui/Card';
import { Award } from 'lucide-react';
import Link from 'next/link';
import { categories } from '@/lib/mockData';

export default async function AdminNominationsPage() {
    // Fetch nominations from DB
    let rawNominations: any[] = [];
    try {
        rawNominations = await sql`
            SELECT * FROM "Nomination" ORDER BY "createdAt" DESC
        `;
    } catch (e) {
        console.error('Failed to fetch nominations', e);
    }

    const nominations = rawNominations.map(nom => ({
        ...nom,
        categoryName: categories.find(c => c.id === nom.categoryId)?.name || 'General Category'
    }));

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-black mb-2">Nominations</h1>
                    <p className="text-gray-500">Review all submitted nominations</p>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[var(--grey-soft)] border-b">
                            <tr>
                                <th className="p-4 font-bold text-gray-700">Nominee Info</th>
                                <th className="p-4 font-bold text-gray-700">Category</th>
                                <th className="p-4 font-bold text-gray-700">Nominator</th>
                                <th className="p-4 font-bold text-gray-700">Date</th>
                                <th className="p-4 font-bold text-gray-700">Status</th>
                                <th className="p-4 font-bold text-gray-700 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {nominations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No nominations found.
                                    </td>
                                </tr>
                            ) : (
                                nominations.map((nom: any) => (
                                    <tr key={nom.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="p-4">
                                            <div className="font-bold text-black">{nom.nomineeName}</div>
                                            <div className="text-gray-500">{nom.nomineeEmail}</div>
                                            <div className="text-[10px] text-blue-600 font-bold lowercase mt-0.5">{nom.nomineeSocial || 'No Social Handle'}</div>
                                            <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-black">Age: {nom.nomineeAge}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-100">
                                                <Award className="w-3 h-3" />
                                                {(nom.categoryId || 'General').replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-gray-700 font-bold">{nom.nominatorName}</div>
                                            <div className="text-gray-500 text-xs">{nom.nominatorEmail}</div>
                                        </td>
                                        <td className="p-4 text-gray-500 text-xs font-medium">
                                            {new Date(nom.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${nom.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                nom.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                                }`}>
                                                {nom.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/admin/nominees/${nom.id}`}
                                                className="text-[var(--primary-dark)] hover:text-black font-black transition-all text-[10px] uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-black pb-0.5"
                                            >
                                                Review Report
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
