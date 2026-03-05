'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Clock, Award, Mail, Phone, User, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card, { CardContent } from '@/components/ui/Card';

export default function NominationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [nomination, setNomination] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        fetchNomination();
    }, [params.id]);

    const fetchNomination = async () => {
        try {
            const response = await fetch(`/api/nominations/${params.id}`);
            if (response.ok) {
                const data = await response.json();
                setNomination(data);
            } else {
                router.push('/admin/nominees');
            }
        } catch (error) {
            console.error('Failed to fetch nomination:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (newStatus: string) => {
        setIsUpdating(true);
        setFeedback(null);
        try {
            const response = await fetch(`/api/nominations/${params.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updated = await response.json();
                setNomination(updated);
                setFeedback({
                    type: 'success',
                    message: `Nomination successfully ${newStatus === 'approved' ? 'approved' : 'rejected'}.`
                });

                // Auto-hide feedback after 5 seconds
                setTimeout(() => setFeedback(null), 5000);
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Failed to update status:', error);
            setFeedback({
                type: 'error',
                message: 'Failed to update nomination status. Please try again.'
            });
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-[var(--primary)] animate-spin" />
            </div>
        );
    }

    if (!nomination) return null;

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/nominees"
                    className="flex items-center text-gray-500 hover:text-white transition-colors group"
                >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Nominations
                </Link>

                <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${nomination.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        nomination.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                            'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        }`}>
                        {nomination.status || 'pending'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-2xl bg-[#0A0A0A] overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-20"></div>
                        <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
                                        {nomination.nomineeName}
                                    </h1>
                                    <div className="flex items-center text-[var(--primary)] font-bold text-xs uppercase tracking-widest">
                                        <Award className="h-3 w-4 mr-2" />
                                        {nomination.categoryName || 'Strategic Sector'}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Submitted On</p>
                                    <p className="text-white font-bold">{new Date(nomination.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Executive Bio & Impact</h3>
                                    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-gray-300 leading-relaxed font-medium">
                                        {nomination.achievements}
                                    </div>
                                </div>

                                {nomination.supportingDocs && (
                                    <div>
                                        <h3 className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] mb-4">Supporting Materials</h3>
                                        <a
                                            href={nomination.supportingDocs}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-xs font-bold transition-all transition-colors group"
                                        >
                                            <ExternalLink className="h-3 w-4 mr-2 text-[var(--primary)]" />
                                            View External Documentation
                                        </a>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feedback Message */}
                    {feedback && (
                        <div className={`p-6 rounded-2xl flex items-center gap-4 border animate-in slide-in-from-top duration-500 shadow-xl ${feedback.type === 'success'
                            ? 'bg-green-500/10 border-green-500/20 text-green-500'
                            : 'bg-red-500/10 border-red-500/20 text-red-500'
                            }`}>
                            {feedback.type === 'success' ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                            <p className="font-bold text-sm tracking-wide uppercase">{feedback.message}</p>
                        </div>
                    )}

                    {/* Vetting Controls */}
                    <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                        <div>
                            <h2 className="text-white font-black uppercase tracking-tight text-xl mb-1">Administrative Vetting</h2>
                            <p className="text-gray-500 text-sm font-medium">Finalize the status for this nomination</p>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateStatus('rejected')}
                                isLoading={isUpdating}
                                className="flex-1 md:flex-none h-14 px-8 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px]"
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                            </Button>
                            <Button
                                onClick={() => handleUpdateStatus('approved')}
                                isLoading={isUpdating}
                                className="flex-1 md:flex-none h-14 px-8 bg-green-600 hover:bg-green-500 text-white border-none rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-green-900/20"
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card className="border-none bg-[#0A0A0A] shadow-xl">
                        <CardContent className="p-8 space-y-8">
                            <div>
                                <h3 className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6">Candidate Details</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm">
                                        <Mail className="h-4 w-4 text-[var(--primary)] mr-3" />
                                        <span className="text-gray-300 font-medium">{nomination.nomineeEmail}</span>
                                    </div>
                                    {nomination.nomineePhone && (
                                        <div className="flex items-center text-sm">
                                            <Phone className="h-4 w-4 text-[var(--primary)] mr-3" />
                                            <span className="text-gray-300 font-medium">{nomination.nomineePhone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center text-sm">
                                        <TrendingUp className="h-4 w-4 text-[var(--primary)] mr-3" />
                                        <a href={nomination.nomineeSocial?.startsWith('http') ? nomination.nomineeSocial : `https://instagram.com/${nomination.nomineeSocial?.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:underline">
                                            {nomination.nomineeSocial}
                                        </a>
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Clock className="h-4 w-4 text-[var(--primary)] mr-3" />
                                        <span className="text-gray-300 font-medium">{nomination.nomineeAge} Years Old</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6">Nominator Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center text-sm">
                                        <User className="h-4 w-4 text-gray-500 mr-3" />
                                        <span className="text-white font-bold">{nomination.nominatorName}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Mail className="h-4 w-4 mr-3" />
                                        <span className="font-medium">{nomination.nominatorEmail}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-6 bg-[var(--primary)]/5 border border-[var(--primary)]/10 rounded-2xl">
                        <p className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest mb-2 flex items-center">
                            <Clock className="h-3 w-4 mr-1" /> Vetting Note
                        </p>
                        <p className="text-gray-400 text-xs leading-relaxed font-medium">
                            Approved nominations will be automatically visible on the public voting board and in the dashboard analytics.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
