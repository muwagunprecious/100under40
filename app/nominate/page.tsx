'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nominationSchema, type NominationFormData } from '@/lib/validations';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import NominationPopup from '@/components/nomination/NominationPopup';
import { useEffect } from 'react';

// Mock categories for dropdown
const categories = [
    { id: 'technology', name: 'Technology & Innovation' },
    { id: 'entrepreneurship', name: 'Business & Entrepreneurship' },
    { id: 'social-impact', name: 'Social Impact & Philanthropy' },
    { id: 'creative-arts', name: 'Creative Arts & Culture' },
    { id: 'media', name: 'Media & Journalism' },
    { id: 'governance', name: 'Leadership & Governance' },
    { id: 'agriculture', name: 'Agriculture & Agribusiness' },
    { id: 'education', name: 'Education & Academia' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'sports', name: 'Sports' },
];

export default function NominatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Nomination starts February 28th, 2026
        const startDate = new Date('2026-02-28');
        const currentDate = new Date();

        if (currentDate < startDate) {
            setShowPopup(true);
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NominationFormData>({
        resolver: zodResolver(nominationSchema) as any,
    });

    const onSubmit = async (data: NominationFormData) => {
        // Double check start date on submission
        const startDate = new Date('2026-02-28');
        const currentDate = new Date();

        if (currentDate < startDate) {
            setShowPopup(true);
            return;
        }

        setIsSubmitting(true);
        setError(null);
        try {
            // In a real application, we would create the category first if it doesn't exist
            // For this demo, we'll assume the API handles it or relax the FK constraint for the MVP demo
            // Note: The API route expects valid IDs. Since we don't have seeds yet, this might fail 500 if FK constraint enforced.
            // But for UI demo purposes:

            const response = await fetch('/api/nominations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit nomination');
            }

            setIsSuccess(true);
            reset();
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[var(--grey-soft)] flex items-center justify-center py-20 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center animate-fade-in border-t-8 border-[var(--primary)]">
                    <div className="w-20 h-20 bg-[var(--primary-soft)] rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-[var(--primary-dark)]" />
                    </div>
                    <h2 className="text-3xl font-black mb-4">Nomination Received!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for helping us identify the next generation of African leaders. Our team will review your submission shortly.
                    </p>

                    <div className="bg-black text-white p-4 rounded-lg mb-8">
                        <p className="text-[10px] uppercase tracking-widest text-[#888] mb-1">An Initiative of</p>
                        <h4 className="text-lg font-bold tracking-tight">ACHIEVERS SUMMIT</h4>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => setIsSuccess(false)} variant="outline">
                            Nominate Another
                        </Button>
                        <Link href="/">
                            <Button>Back to Home</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--grey-soft)] py-20 px-4">
            <NominationPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black mb-4">Nominate a Leader</h1>
                    <p className="text-gray-600 text-lg">
                        Do you know someone under 40 who is making a significant impact?
                        Tell us about them.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-black p-6 text-white text-center">
                        <p className="text-sm font-medium opacity-80">Please fill out all required fields marked with *</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Nominee Info */}
                        <section className="space-y-6">
                            <h3 className="text-xl font-bold border-b pb-2">Nominee Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Full Name"
                                    placeholder="e.g. John Doe"
                                    {...register('nomineeName')}
                                    error={errors.nomineeName?.message}
                                    required
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    placeholder="john@example.com"
                                    {...register('nomineeEmail')}
                                    error={errors.nomineeEmail?.message}
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    placeholder="+254..."
                                    {...register('nomineePhone')}
                                    error={errors.nomineePhone?.message}
                                />
                                <Input
                                    label="Age"
                                    type="number"
                                    placeholder="Must be 18-39"
                                    {...register('nomineeAge')}
                                    error={errors.nomineeAge?.message}
                                    required
                                />
                            </div>
                        </section>

                        {/* Category & Achievement */}
                        <section className="space-y-6">
                            <h3 className="text-xl font-bold border-b pb-2">Nomination Details</h3>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-black">
                                    Award Category <span className="text-[var(--error)]">*</span>
                                </label>
                                <select
                                    className={cn(
                                        "w-full px-4 py-3 rounded-lg border-2 border-[var(--grey-medium)] bg-white text-black focus:border-[var(--primary)] focus:outline-none transition-colors appearance-none",
                                        errors.categoryId && "border-[var(--error)]"
                                    )}
                                    {...register('categoryId')}
                                >
                                    <option value="">Select a category...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && (
                                    <p className="text-sm text-[var(--error)]">{errors.categoryId.message}</p>
                                )}
                            </div>

                            <Textarea
                                label="Achievements & Impact"
                                placeholder="Describe why this person deserves the award. What have they achieved? How are they impacting their community or industry? (Min 50 characters)"
                                {...register('achievements')}
                                error={errors.achievements?.message}
                                required
                                className="h-40"
                            />

                            <Input
                                label="Supporting Link (Optional)"
                                placeholder="LinkedIn, Portfolio, News Article URL..."
                                {...register('supportingDocs')}
                                error={errors.supportingDocs?.message}
                            />
                        </section>

                        {/* Nominator Info */}
                        <section className="space-y-6">
                            <h3 className="text-xl font-bold border-b pb-2">Your Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Your Name"
                                    placeholder="Your Full Name"
                                    {...register('nominatorName')}
                                    error={errors.nominatorName?.message}
                                    required
                                />
                                <Input
                                    label="Your Email"
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register('nominatorEmail')}
                                    error={errors.nominatorEmail?.message}
                                    required
                                />
                            </div>
                        </section>

                        <div className="pt-6">
                            <Button type="submit" size="lg" className="w-full text-lg font-bold" isLoading={isSubmitting}>
                                Submit Nomination
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
