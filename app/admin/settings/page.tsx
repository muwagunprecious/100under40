'use client';

import { useState, useEffect } from 'react';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Settings, Save, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSettingsPage() {
    const [isNominationOpen, setIsNominationOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                if (!response.ok) throw new Error('Failed to fetch settings');
                const data = await response.json();
                setIsNominationOpen(data.isNominationOpen || false);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        try {
            const response = await fetch('/api/settings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isNominationOpen }),
            });
            if (!response.ok) throw new Error('Failed to save settings');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-1">Platform Settings</h1>
                    <p className="text-gray-500 font-medium">Control the global infrastructure and visibility parameters</p>
                </div>
                <Button
                    onClick={handleSave}
                    isLoading={isSaving}
                    className="h-14 px-8 bg-white text-black hover:bg-[var(--primary)] transition-all rounded-2xl font-black uppercase tracking-widest text-xs border-none shadow-xl shadow-black/40 group"
                >
                    <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Publish Changes
                </Button>
            </div>

            {error && (
                <div className="bg-red-500/10 text-red-500 p-6 rounded-2xl flex items-center gap-4 border border-red-500/20 shadow-2xl animate-shake">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <p className="font-bold text-sm tracking-wide">{error}</p>
                </div>
            )}

            <div className="grid gap-8">
                <Card className="border-none bg-[#0A0A0A] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                        <Settings className="w-32 h-32 text-white" />
                    </div>

                    <CardContent className="p-10 relative z-10">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                            <div className="p-5 bg-white/5 rounded-[2rem] border border-white/5 transition-colors group-hover:bg-[var(--primary)]/10 group-hover:border-[var(--primary)]/20 shadow-inner">
                                <Settings className="w-8 h-8 text-[var(--primary)]" />
                            </div>
                            <div className="flex-1">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">Nomination Portal Governance</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed max-w-2xl">
                                        Activate or suspend the public nomination portal. When suspended, the system will automatically display the <span className="text-[var(--primary)]">"Vetting in Progress"</span> executive announcement to all users.
                                    </p>
                                </div>

                                <div className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] w-full md:w-fit transition-all hover:bg-white/[0.04]">
                                    <button
                                        onClick={() => setIsNominationOpen(!isNominationOpen)}
                                        className={cn(
                                            "relative inline-flex h-10 w-20 shrink-0 cursor-pointer rounded-full border-4 border-black/50 transition-all duration-500 ease-elastic focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50",
                                            isNominationOpen ? "bg-[var(--primary)] shadow-[0_0_30px_rgba(200,255,0,0.3)]" : "bg-gray-800"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "pointer-events-none inline-block h-7.5 w-7.5 transform rounded-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition duration-500 ease-elastic mt-[1px]",
                                                isNominationOpen ? "translate-x-9" : "translate-x-1"
                                            )}
                                        />
                                    </button>
                                    <div className="flex flex-col">
                                        <span className={cn(
                                            "text-xs font-black uppercase tracking-[0.2em] transition-colors",
                                            isNominationOpen ? "text-[var(--primary)]" : "text-gray-600"
                                        )}>
                                            Status: {isNominationOpen ? "LIVE" : "DORMANT"}
                                        </span>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                                            {isNominationOpen ? "Accepting Submissions" : "Vetting Active Only"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Settings Placeholder */}
                <div className="grid md:grid-cols-2 gap-6 opacity-60">
                    <div className="p-8 border border-white/5 rounded-[2rem] bg-white/[0.01] border-dashed">
                        <div className="w-10 h-10 bg-white/5 rounded-xl mb-4"></div>
                        <div className="h-4 w-32 bg-white/5 rounded-full mb-2"></div>
                        <div className="h-3 w-48 bg-white/5 rounded-full"></div>
                    </div>
                    <div className="p-8 border border-white/5 rounded-[2rem] bg-white/[0.01] border-dashed">
                        <div className="w-10 h-10 bg-white/5 rounded-xl mb-4"></div>
                        <div className="h-4 w-32 bg-white/5 rounded-full mb-2"></div>
                        <div className="h-3 w-48 bg-white/5 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
