'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { Loader2, CheckCircle } from 'lucide-react';

// Mock Data (Must match nominees page for demo consistency)
const mockNominees = [
    {
        id: '1',
        name: 'Sarah Johnson',
        category: 'Technology & Innovation',
        bio: 'Founder of TechFarm, an AI-driven agricultural platform.',
    },
    {
        id: '2',
        name: 'David Osei',
        category: 'Business & Entrepreneurship',
        bio: 'CEO of Pan-African Logistics, expanding trade routes across 15 countries.',
    },
    // Add other matches...
];

function VoteContent() {
    const searchParams = useSearchParams();
    const nomineeId = searchParams.get('nomineeId');
    const [isVoting, setIsVoting] = useState(false);
    const [isVoted, setIsVoted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const nominee = mockNominees.find(n => n.id === nomineeId);

    const handleVote = async () => {
        if (!nomineeId) return;

        setIsVoting(true);
        setError(null);
        try {
            const response = await fetch('/api/votes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nomineeId }),
            });

            if (response.status === 409) {
                setError('You have already voted for this nominee.');
                return;
            }

            if (!response.ok) {
                throw new Error('Vote failed');
            }

            setIsVoted(true);
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsVoting(false);
        }
    };

    if (!nominee) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Nominee Not Found</h2>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        );
    }

    if (isVoted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 animate-fade-in">
                <div className="w-24 h-24 bg-[var(--primary-soft)] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-12 w-12 text-[var(--primary-dark)]" />
                </div>
                <h1 className="text-3xl font-black mb-2 text-center">Vote Confirmed!</h1>
                <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
                    Thank you for voting for <strong>{nominee.name}</strong>.
                    Your voice counts in celebrating excellence.
                </p>
                <Button onClick={() => window.location.href = '/nominees'}>
                    Vote for Another Category
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-[var(--grey-soft)]">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-black p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)] rounded-full blur-[50px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <p className="text-[var(--primary)] font-bold uppercase tracking-widest text-xs mb-2">Cast Your Vote For</p>
                    <h1 className="text-3xl font-black">{nominee.name}</h1>
                    <p className="text-gray-400 text-sm mt-2">{nominee.category}</p>
                </div>

                <div className="p-8">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-8">
                        <p className="text-gray-600 italic text-center text-sm">"{nominee.bio}"</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleVote}
                        isLoading={isVoting}
                        className="w-full text-lg py-4 font-bold rounded-xl"
                        size="lg"
                    >
                        Confirm Vote
                    </Button>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full mt-4 text-gray-400 text-sm font-semibold hover:text-black transition-colors"
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <VoteContent />
        </Suspense>
    );
}
