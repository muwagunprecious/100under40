'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Loader2, CheckCircle } from 'lucide-react';
import { categories } from '@/lib/mockData';

function VoteContent() {
    const searchParams = useSearchParams();
    const nomineeId = searchParams.get('nomineeId');
    const [nominee, setNominee] = useState<any>(null);
    const [isLoadingNominee, setIsLoadingNominee] = useState(true);
    const [isVoting, setIsVoting] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (nomineeId) {
            // Check if already voted
            const votes = JSON.parse(localStorage.getItem('votes') || '[]');
            if (votes.includes(nomineeId)) {
                setError('You have already voted for this nominee on this device.');
                setIsVoted(true);
                setIsLoadingNominee(false);
                return;
            }

            const fetchNominee = async () => {
                try {
                    const res = await fetch(`/api/nominees?id=${nomineeId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setNominee(data);
                    } else {
                        setError('Nominee not found.');
                    }
                } catch (err) {
                    console.error(err);
                    setError('Failed to load nominee details.');
                } finally {
                    setIsLoadingNominee(false);
                }
            };
            fetchNominee();
        } else {
            setIsLoadingNominee(false);
        }
    }, [nomineeId]);

    const handleVote = async () => {
        if (!nomineeId) return;

        setIsVoting(true);
        setError(null);

        try {
            // Check localStorage for existing votes
            const votes = JSON.parse(localStorage.getItem('votes') || '[]');

            if (votes.includes(nomineeId)) {
                setError('You have already voted for this nominee on this device.');
                setIsVoting(false);
                return;
            }

            const res = await fetch('/api/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nomineeId }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit vote');
            }

            // Store vote in localStorage
            votes.push(nomineeId);
            localStorage.setItem('votes', JSON.stringify(votes));

            setIsVoted(true);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsVoting(false);
        }
    };

    if (isLoadingNominee) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-black">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    if (!nominee && !isVoted) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center bg-black text-white p-4">
                <h2 className="text-2xl font-bold mb-4 font-sans uppercase tracking-tight">Nominee not found</h2>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        );
    }

    if (isVoted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-black text-white animate-fade-in font-sans">
                <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-6 border border-[var(--primary)]/20">
                    <CheckCircle className="h-10 w-10 text-[var(--primary)]" />
                </div>
                <h1 className="text-3xl font-black mb-2 text-center uppercase tracking-tight">Vote Confirmed!</h1>
                <p className="text-gray-400 text-base mb-8 text-center max-w-md font-medium">
                    {nominee ? (
                        <>Thank you for voting for <strong className="text-white">{nominee.name}</strong>. Your vote counts in celebrating excellence.</>
                    ) : (
                        <>Thank you for voting. Your vote has been recorded on this device.</>
                    )}
                </p>
                <Button 
                    onClick={() => window.location.href = '/nominees'}
                    className="bg-white text-black hover:bg-[var(--primary)] font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl cursor-pointer"
                >
                    Back to Nominees
                </Button>
            </div>
        );
    }

    const category = categories.find(c => c.id === nominee.categoryId);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-[#050505] font-sans pt-32">
            <div className="max-w-md w-full bg-[#0A0A0A] rounded-2xl shadow-2xl border border-white/5 overflow-hidden">
                <div className="bg-black p-8 text-center text-white relative overflow-hidden border-b border-white/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] rounded-full blur-[50px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
                    <p className="text-[var(--primary)] font-black uppercase tracking-[0.2em] text-[10px] mb-3">Cast Your Vote For</p>
                    
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-white/5 border border-white/10 mx-auto mb-4">
                        {nominee.photoUrl ? (
                            <img src={nominee.photoUrl} alt={nominee.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/30 bg-white/[0.02]">
                                <Loader2 className="w-6 h-6 animate-spin text-[var(--primary)]" />
                            </div>
                        )}
                    </div>

                    <h1 className="text-2xl font-black uppercase tracking-tight">{nominee.name}</h1>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">{category?.name || 'General Category'}</p>
                </div>

                <div className="p-8 space-y-6">
                    {nominee.bio && (
                        <div className="bg-white/[0.01] p-5 rounded-xl border border-white/5">
                            <p className="text-gray-400 text-sm font-medium leading-relaxed italic text-center">"{nominee.bio}"</p>
                        </div>
                    )}

                    {error && !isVoted && (
                        <div className="bg-red-500/10 text-red-500 p-4 rounded-xl text-xs font-bold text-center border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleVote}
                        isLoading={isVoting}
                        className="w-full text-sm py-4 font-black uppercase tracking-widest rounded-xl bg-white text-black hover:bg-[var(--primary)] transition-all cursor-pointer"
                        size="lg"
                    >
                        Confirm Vote
                    </Button>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VotePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black"><Loader2 className="animate-spin text-[var(--primary)]" /></div>}>
            <VoteContent />
        </Suspense>
    );
}
