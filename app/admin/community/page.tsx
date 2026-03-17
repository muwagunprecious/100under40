'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { Users, Loader2, Download, Search, Eye, Phone, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function AdminCommunityPage() {
    const [applications, setApplications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApp, setSelectedApp] = useState<any | null>(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await fetch('/api/community');
            if (response.ok) {
                const data = await response.json();
                setApplications(data);
            }
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredApplications = applications.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const headers = "Full Name,Email,State,Product Unit,Service Unit,Phone,WhatsApp,Date Applied\n";
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers
            + applications.map(a =>
                `"${a.fullName}","${a.email}","${a.state}","${a.productUnit || 'N/A'}","${a.serviceUnit || 'N/A'}","${a.callLine}","${a.whatsAppNumber}","${new Date(a.createdAt).toLocaleString()}"`
            ).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "community_applications.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-black mb-2">Community Applications</h1>
                    <p className="text-gray-500 font-medium">Manage volunteer recruitment and community members</p>
                </div>
                <Button
                    variant="outline"
                    onClick={handleExport}
                    className="flex items-center gap-2 border-white/10 text-white hover:bg-white/5 font-bold"
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
                        placeholder="Search by name, email, or state..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none text-sm text-white focus:outline-none w-full font-medium"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="p-4 font-black text-gray-400 uppercase tracking-widest text-[10px]">Applicant</th>
                                <th className="p-4 font-black text-gray-400 uppercase tracking-widest text-[10px]">Location</th>
                                <th className="p-4 font-black text-gray-400 uppercase tracking-widest text-[10px]">Units (Product/Service)</th>
                                <th className="p-4 font-black text-gray-400 uppercase tracking-widest text-[10px]">Contact</th>
                                <th className="p-4 font-black text-gray-400 uppercase tracking-widest text-[10px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center">
                                        <Loader2 className="h-8 w-8 text-[var(--primary)] animate-spin mx-auto mb-2" />
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Loading Applications...</p>
                                    </td>
                                </tr>
                            ) : filteredApplications.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500">
                                        <Users className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                        <p className="text-xs font-bold uppercase tracking-widest">No applications found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredApplications.map((app: any) => (
                                    <tr key={app.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white text-base">{app.fullName}</span>
                                                <span className="text-xs text-gray-500 font-medium">{app.email}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-1 bg-white/5 text-gray-300 rounded font-bold text-xs uppercase tracking-wider border border-white/5">
                                                {app.state}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]"></div>
                                                    <span className="text-xs font-bold text-gray-400 tracking-tight">{app.productUnit || 'No Product Unit'}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                    <span className="text-xs font-bold text-gray-400 tracking-tight">{app.serviceUnit || 'No Service Unit'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-gray-500 group-hover:text-white transition-colors">
                                                    <Phone className="h-3 w-3" />
                                                    <span className="text-xs font-medium">{app.callLine}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 group-hover:text-[#25D366] transition-colors">
                                                    <MessageSquare className="h-3 w-3" />
                                                    <span className="text-xs font-medium">{app.whatsAppNumber}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => setSelectedApp(app)}
                                                className="p-2 hover:bg-[var(--primary)] hover:text-black rounded-lg transition-all text-gray-400"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Application Detail Modal */}
            <Modal
                isOpen={!!selectedApp}
                onClose={() => setSelectedApp(null)}
                title="Community Application Detail"
            >
                {selectedApp && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#666]">Full Name</span>
                                <p className="font-bold text-white">{selectedApp.fullName}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#666]">Email</span>
                                <p className="font-bold text-white">{selectedApp.email}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#666]">State</span>
                                <p className="font-bold text-white">{selectedApp.state}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#666]">Date Applied</span>
                                <p className="font-bold text-white">{new Date(selectedApp.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--primary)]">Product Unit (Volunteer)</span>
                                <p className="font-bold text-white text-lg">{selectedApp.productUnit || 'Not Selected'}</p>
                            </div>
                            <div className="h-[1px] bg-white/5 w-full"></div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Service Unit (Volunteer)</span>
                                <p className="font-bold text-white text-lg">{selectedApp.serviceUnit || 'Not Selected'}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-[#050505] p-4 rounded-xl border border-white/5">
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#666] flex items-center gap-2">
                                    <Phone className="h-3 w-3" /> Call Line
                                </span>
                                <p className="font-black text-white text-xl">{selectedApp.callLine}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#25D366] flex items-center gap-2">
                                    <MessageSquare className="h-3 w-3" /> WhatsApp
                                </span>
                                <p className="font-black text-white text-xl">{selectedApp.whatsAppNumber}</p>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedApp(null)}
                                className="border-white/10 text-white font-bold"
                            >
                                Close
                            </Button>
                            <a href={`mailto:${selectedApp.email}`}>
                                <Button className="font-black uppercase tracking-widest px-6 bg-[var(--primary)] text-black">
                                    Contact via Email
                                </Button>
                            </a>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
