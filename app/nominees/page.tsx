'use client';

import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function NomineesPage() {
    const [text, setText] = useState('');
    const fullText = "Nominees would be displayed soon...";
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 70);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText]);

    return (
        <div className="bg-black min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-2xl px-4">
                {/* Institutional Accent */}
                <div className="mb-8 opacity-20">
                    <span className="text-8xl md:text-9xl font-black text-white tracking-tighter select-none">100</span>
                </div>

                <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 text-[var(--primary)] mb-4">
                        <Terminal className="h-4 w-4 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">System Status: Vetting in Progress</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase min-h-[4rem] leading-tight flex items-center justify-center">
                        {text}
                        <span className="w-1 h-8 md:h-12 bg-[var(--primary)] ml-2 animate-pulse"></span>
                    </h1>

                    <p className="text-gray-500 font-medium tracking-wide max-w-md mx-auto italic">
                        "The official Class of 2026 is currently undergoing final institutional verification. Stay tuned for the unveiling."
                    </p>

                    <div className="pt-12">
                        <div className="w-12 h-1 bg-[var(--primary)]/30 mx-auto rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
