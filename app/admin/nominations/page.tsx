'use client';

import { useState, useEffect } from 'react';
import { Check, X, Eye, Filter, Loader2 } from 'lucide-react';
import Card, { CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock Data
const initialNominations = [
    { id: '1', nominee: 'John Doe', category: 'Technology', nominator: 'Jane Smith', status: 'pending', date: '2025-10-15' },
    { id: '2', nominee: 'Sarah Lee', category: 'Health', nominator: 'Dr. Mike', status: 'approved', date: '2025-10-14' },
    { id: '3', nominee: 'James Bond', category: 'Leadership', nominator: 'M. Penny', status: 'rejected', date: '2025-10-13' },
    { id: '4', nominee: 'Aminat Lawal', category: 'Business', nominator: 'Self', status: 'pending', date: '2025-10-12' },
    { id: '5', nominee: 'Kofi Annan', category: 'Technology', nominator: 'TechHub', status: 'pending', date: '2025-10-12' },
];

export default function NominationsManagementPage() {
    const [nominations, setNominations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    const fetchNominations = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/nominations');
            if (res.ok) {
                const data = await res.json();
                setNominations(data);
            }
        } catch (error) {
            console.error('Failed to fetch nominations:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNominations();
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/nominations/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setNominations(prev => prev.map(n => n.id === id ? { ...n, status: newStatus } : n));
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const filteredNominations = nominations.filter(n => filter === 'all' || n.status === filter);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black mb-1">Nominations</h1>
                    <p className="text-gray-500">Manage and validate incoming nominations.</p>
                </div>
                <div className="flex gap-2">
                    {['all', 'pending', 'approved', 'rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === status
                                ? 'bg-black text-white'
                                : 'bg-white text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <Card className="border-none shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#f9f9f9] border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nominee</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Nominator</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                                        Loading nominations...
                                    </td>
                                </tr>
                            ) : filteredNominations.map((nomination) => (
                                <tr key={nomination.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-black">{nomination.nomineeName}</td>
                                    <td className="p-4 text-sm text-gray-600">{nomination.category?.name || nomination.categoryId}</td>
                                    <td className="p-4 text-sm text-gray-600">{nomination.nominatorName}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(nomination.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide
                      ${nomination.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                nomination.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'}`}>
                                            {nomination.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-black hover:bg-white rounded-full transition-all" title="View Details">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        {nomination.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(nomination.id, 'approved')}
                                                    className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-all"
                                                    title="Approve"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(nomination.id, 'rejected')}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                    title="Reject"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredNominations.length === 0 && (
                    <div className="p-12 text-center text-gray-400">
                        <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No nominations found matching this filter.</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
