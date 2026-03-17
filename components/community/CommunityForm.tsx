'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { communitySchema, type CommunityFormData } from '@/lib/validations';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const productUnits = [
    'Creative/Graphics Design',
    'Web Development',
    'Photography',
    'Videography',
    'Content Development',
    'Customer/Call Representation',
    'Video Editing',
    'Social Media Manager',
    'Sound Production',
    'Stage & Lighting',
    'Ambience & Decoration',
];

const serviceUnits = [
    'Ushering',
    'Protocol',
    'Welfare',
    'Registration & Check-in',
];

export default function CommunityForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CommunityFormData>({
        resolver: zodResolver(communitySchema),
    });

    const onSubmit = async (data: CommunityFormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const response = await fetch('/api/community', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit application');
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
            <div className="text-center py-12 px-6 bg-white rounded-3xl shadow-xl border border-gray-100">
                <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-[var(--primary-dark)]" />
                </div>
                <h2 className="text-3xl font-black mb-4 tracking-tight text-black">APPLICATION RECEIVED</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto font-medium">
                    Thank you for your interest in joining the 100 Under 40 Community. Our team will review your application and get back to you soon.
                </p>
                <Button onClick={() => setIsSuccess(false)} variant="primary" className="px-8 shadow-lg shadow-[var(--primary-soft)]">
                    Submit Another Application
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="bg-black p-8 text-white text-center">
                <h2 className="text-2xl font-black mb-2 uppercase tracking-tighter !text-white">Join Our Community</h2>
                <p className="text-sm font-medium text-gray-400">Please fill out the form below to apply.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 font-medium animate-shake">
                        {error}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <Input
                        label="Full Name"
                        placeholder="Your full name"
                        {...register('fullName')}
                        error={errors.fullName?.message}
                        required
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        error={errors.email?.message}
                        required
                    />
                    <Input
                        label="State of Residence"
                        placeholder="e.g. Lagos"
                        {...register('state')}
                        error={errors.state?.message}
                        required
                    />
                    <Input
                        label="Call Line"
                        type="tel"
                        placeholder="+234..."
                        {...register('callLine')}
                        error={errors.callLine?.message}
                        required
                    />
                    <Input
                        label="WhatsApp Number"
                        type="tel"
                        placeholder="+234..."
                        {...register('whatsAppNumber')}
                        error={errors.whatsAppNumber?.message}
                        required
                    />

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-black uppercase tracking-wider">
                            Product Unit (Volunteer)
                        </label>
                        <select
                            className={cn(
                                "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-black focus:border-[var(--primary)] focus:bg-white focus:outline-none transition-all appearance-none font-medium",
                                errors.productUnit && "border-red-200 bg-red-50"
                            )}
                            {...register('productUnit')}
                        >
                            <option value="">Select a unit...</option>
                            {productUnits.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-bold text-black uppercase tracking-wider">
                            Service Unit (Volunteer)
                        </label>
                        <select
                            className={cn(
                                "w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 text-black focus:border-[var(--primary)] focus:bg-white focus:outline-none transition-all appearance-none font-medium",
                                errors.serviceUnit && "border-red-200 bg-red-50"
                            )}
                            {...register('serviceUnit')}
                        >
                            <option value="">Select a unit...</option>
                            {serviceUnits.map((unit) => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-6">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-16 font-black text-xl uppercase tracking-widest shadow-xl shadow-[var(--primary-soft)] rounded-2xl"
                        isLoading={isSubmitting}
                    >
                        Apply to Join
                    </Button>
                </div>
            </form>
        </div>
    );
}
