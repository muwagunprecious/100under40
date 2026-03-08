'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { Mail, Loader2, Download, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminNewsletterPage() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await fetch('/api/newsletter');
            if (response.ok) {
                const data = await response.json();
                setSubscribers(data);
            }
        } catch (error) {
            console.error('Failed to fetch subscribers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredSubscribers = subscribers.filter(sub =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Email,Date Subscribed\n"
            + subscribers.map(s => `${s.email},${new Date(s.createdAt).toLocaleString()}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "newsletter_subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-black mb-2">Newsletter Subscribers</h1>
                    <p className="text-gray-500">Manage and export your newsletter mailing list</p>
                </div>
                <Button
                    variant="outline"
                    onClick={handleExport}
                    className="flex items-center gap-2 border-white/10 text-white hover:bg-white/5"
                >
                    <Download className="h-4 w-4" />
                    Export CSV
                </Button>
            </div>

            <Card className="overflow-hidden border-none bg-[#0A0A0A] shadow-2xl">
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                    <Search className="h-4 w-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none text-sm text-white focus:outline-none w-full"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="p-4 font-black text-gray-400 uppercase tracking-widest text-[10px]">Subscriber Email</th>
                                <th className="p-4 font-black text-gray-400 uppercase tracking-widest text-[10px]">Date Joined</th>
                                <th className="p-4 font-black text-gray-400 uppercase tracking-widest text-[10px] text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="p-12 text-center">
                                        <Loader2 className="h-8 w-8 text-[var(--primary)] animate-spin mx-auto mb-2" />
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Loading List...</p>
                                    </td>
                                </tr>
                            ) : filteredSubscribers.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-12 text-center text-gray-500">
                                        <Mail className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                        <p className="text-xs font-bold uppercase tracking-widest">No subscribers found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredSubscribers.map((sub: any) => (
                                    <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                                                    <Mail className="h-4 w-4 text-[var(--primary)]" />
                                                </div>
                                                <span className="font-bold text-white">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-500 font-medium">
                                            {new Date(sub.createdAt).toLocaleString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-white/5 bg-black/40">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        Total Subscribers: {filteredSubscribers.length}
                    </p>
                </div>
            </Card>
        </div>
    );
}
