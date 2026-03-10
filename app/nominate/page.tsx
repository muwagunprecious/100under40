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
import { useEffect } from 'react';
import NominationPopup from '@/components/nomination/NominationPopup';

// Mock categories for dropdown
const categories = [
    { id: '1', name: 'Business & Entrepreneurship' },
    { id: '2', name: 'Technology & Innovation' },
    { id: '3', name: 'Governance, Policy & Public Service' },
    { id: '4', name: 'Finance & Investment' },
    { id: '5', name: 'Creative & Cultural Industries' },
    { id: '6', name: 'Media & Digital Influence' },
    { id: '7', name: 'Healthcare & Wellness' },
    { id: '8', name: 'Education & Human Capital Development' },
    { id: '9', name: 'Agriculture & Food Systems' },
    { id: '10', name: 'Social Innovation, Philanthropy & Development' },
];

export default function NominatePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (data && data.isNominationOpen === false) {
                    setShowPopup(true);
                }
            } catch (error) {
                console.error("Failed to fetch settings", error);
            }
        };
        fetchSettings();
    }, []);



    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        reset,
    } = useForm<NominationFormData>({
        resolver: zodResolver(nominationSchema) as any,
    });

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const nextStep = async () => {
        let fieldsToValidate: (keyof NominationFormData)[] = [];
        if (currentStep === 1) {
            fieldsToValidate = ['nomineeName', 'nomineeEmail', 'nomineePhone', 'nomineeSocial', 'nomineeAge'];
        } else if (currentStep === 2) {
            fieldsToValidate = ['categoryId', 'achievements', 'supportingDocs'];
        }

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps));

            setTimeout(() => {
                const formElement = document.getElementById('step-form-container');
                if (formElement) {
                    const y = formElement.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 50);
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));

        setTimeout(() => {
            const formElement = document.getElementById('step-form-container');
            if (formElement) {
                const y = formElement.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 50);
    };

    const onSubmit = async (data: NominationFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch('/api/nominations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.status === 403) {
                setShowPopup(true);
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit nomination');
            }

            setIsSuccess(true);
            reset();
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[var(--black)] flex items-center justify-center py-20 px-4">
                <div className="bg-[var(--charcoal)] p-12 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] max-w-xl w-full text-center animate-scale-in border border-white/5 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 bg-[var(--primary)]/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-[var(--primary)]/5 rounded-full blur-3xl" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />

                    <div className="relative z-10">
                        <div className="w-28 h-28 bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(200,255,0,0.15)] animate-bounce-subtle">
                            <CheckCircle2 className="h-14 w-14 text-[var(--primary)]" />
                        </div>

                        <div className="space-y-2 mb-8">
                            <h2 className="text-5xl font-black mb-2 tracking-tighter text-white">SUCCESS</h2>
                            <p className="text-[var(--primary)] font-bold tracking-[0.3em] text-xs uppercase">Nomination Confirmed</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-8 mb-10 text-left space-y-6 shadow-2xl">
                            <p className="text-gray-300 leading-relaxed italic text-lg font-light">
                                "Thank you for helping us identify the next generation of African leaders. Your submission has been securely documented in our archives."
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-black border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-white text-sm font-black">100</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold leading-none mb-1">Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                                            <p className="text-xs font-bold text-white uppercase tracking-tight">Vetting Stage</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold leading-none mb-1">Batch</p>
                                    <p className="text-xs font-black text-white">2026-ALPHA</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button onClick={() => { setIsSuccess(false); setCurrentStep(1); }} variant="outline" className="h-14 rounded-xl border-white/10 text-white hover:bg-white/5 font-bold transition-all">
                                Nominate Another
                            </Button>
                            <Link href="/" className="w-full">
                                <Button className="w-full h-14 rounded-xl shadow-xl shadow-[var(--primary)]/10 text-black font-black text-lg">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--grey-soft)] py-20 px-4">
            <NominationPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
            <div className="container mx-auto max-w-3xl" id="nomination-form">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black mb-6 tracking-tighter text-black">Nominate a Leader</h1>
                    <div className="max-w-2xl mx-auto space-y-4">
                        <p className="text-gray-700 text-lg font-medium leading-relaxed">
                            Do you know an exceptional young African driving sustainable impact? Help us identify the next member of the Class of 2026.
                        </p>
                        <p className="text-sm text-gray-500 italic">
                            "The 100 Under 40 Award recognizes excellence that is measurable and transformative."
                        </p>
                    </div>
                </div>

                {/* Progress Guide */}
                <div className="mb-10 max-w-xl mx-auto">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary-dark)]">Nomination Progress</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Step {currentStep} of {totalSteps}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--primary)] rounded-full shadow-[0_0_10px_rgba(200,255,0,0.5)] transition-all duration-500"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div id="step-form-container" className="bg-white rounded-2xl shadow-xl overflow-hidden scroll-mt-24">
                    <div className="bg-black p-8 text-white text-center">
                        <h2 className="text-xl font-bold mb-2 uppercase tracking-tighter">Official Submission Form</h2>
                        <p className="text-xs font-medium text-gray-400">Step {currentStep}: {
                            currentStep === 1 ? 'Nominee Info' : currentStep === 2 ? 'Details & Impact' : 'Nominator Info'
                        }</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        {/* Step 1: Nominee Info */}
                        {currentStep === 1 && (
                            <section className="space-y-6 animate-scale-in">
                                <h3 className="text-xl font-bold border-b pb-2 text-black">Nominee Information</h3>
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
                                        placeholder="+..."
                                        {...register('nomineePhone')}
                                        error={errors.nomineePhone?.message}
                                    />
                                    <Input
                                        label="Nominee Social Media (Instagram/LinkedIn)"
                                        placeholder="@handle or profile link"
                                        {...register('nomineeSocial')}
                                        error={errors.nomineeSocial?.message}
                                        required
                                    />
                                    <Input
                                        label="Age"
                                        type="number"
                                        placeholder="Must be 18-40"
                                        {...register('nomineeAge')}
                                        error={errors.nomineeAge?.message}
                                        required
                                    />
                                </div>
                            </section>
                        )}

                        {/* Step 2: Category & Achievement */}
                        {currentStep === 2 && (
                            <section className="space-y-6 animate-scale-in">
                                <h3 className="text-xl font-bold border-b pb-2 text-black">Nomination Details</h3>

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
                                    placeholder="Describe why this person deserves the award. What have they achieved? (Min 50 characters)"
                                    {...register('achievements')}
                                    error={errors.achievements?.message}
                                    required
                                    className="h-40"
                                />

                                <Input
                                    label="Supporting Link (Optional)"
                                    placeholder="LinkedIn, News, etc."
                                    {...register('supportingDocs')}
                                    error={errors.supportingDocs?.message}
                                />
                            </section>
                        )}

                        {/* Step 3: Nominator Info */}
                        {currentStep === 3 && (
                            <section className="space-y-6 animate-scale-in">
                                <h3 className="text-xl font-bold border-b pb-2 text-black">Your Information</h3>
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
                        )}

                        {/* Navigation Controls */}
                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                            {currentStep > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    className="sm:w-1/3 h-14 rounded-xl font-bold text-gray-600"
                                >
                                    Previous Step
                                </Button>
                            )}

                            {currentStep < totalSteps ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className={cn(
                                        "h-14 font-black text-lg uppercase tracking-widest rounded-xl transition-all",
                                        currentStep === 1 ? "w-full" : "sm:w-2/3"
                                    )}
                                >
                                    Continue to Step {currentStep + 1}
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full sm:w-2/3 h-16 font-black text-xl uppercase tracking-widest shadow-xl shadow-[var(--primary-soft)] rounded-xl"
                                    isLoading={isSubmitting}
                                >
                                    Submit Nomination
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
