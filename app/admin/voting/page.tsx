import Card, { CardContent } from '@/components/ui/Card';
import { BarChart3, Lock, ShieldCheck, Timer } from 'lucide-react';

export default function VotingAnalyticsPage() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-8 animate-fade-in max-w-4xl mx-auto text-center">
            <div className="relative">
                <div className="absolute inset-0 bg-[var(--primary)]/20 blur-[100px] rounded-full"></div>
                <div className="relative w-32 h-32 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] flex items-center justify-center shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Lock className="w-12 h-12 text-[var(--primary)] relative z-10" />
                </div>
            </div>

            <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
                    <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Institutional Securities Active</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                    Analytics <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">Under Seal</span>
                </h1>
                <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
                    Real-time voting intelligence is currently encrypted. Analytics will activate automatically upon the official conclusion of the vetting phase.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12">
                <div className="p-8 bg-[#0A0A0A] border border-white/5 rounded-3xl text-left hover:border-white/10 transition-colors group">
                    <Timer className="w-6 h-6 text-gray-600 mb-6 group-hover:text-[var(--primary)] transition-colors" />
                    <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2">Activation</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase leading-relaxed">Phase 3 Deployment</p>
                </div>
                <div className="p-8 bg-[#0A0A0A] border border-white/5 rounded-3xl text-left hover:border-white/10 transition-colors group">
                    <BarChart3 className="w-6 h-6 text-gray-600 mb-6 group-hover:text-[var(--primary)] transition-colors" />
                    <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2">Metrics</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase leading-relaxed">Category Distribution</p>
                </div>
                <div className="p-8 bg-[#0A0A0A] border border-white/5 rounded-3xl text-left hover:border-white/10 transition-colors group">
                    <ShieldCheck className="w-6 h-6 text-gray-600 mb-6 group-hover:text-[var(--primary)] transition-colors" />
                    <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2">Protocol</h3>
                    <p className="text-gray-500 text-[10px] font-bold uppercase leading-relaxed">AES-256 Verified</p>
                </div>
            </div>
        </div>
    );
}
