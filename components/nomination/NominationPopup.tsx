'use client';

import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Calendar, Info } from 'lucide-react';
import Link from 'next/link';

interface NominationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NominationPopup({ isOpen, onClose }: NominationPopupProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showCloseButton={true}
            variant="premium"
            className="border-t-8 border-[var(--primary)]"
        >
            <div className="text-center py-6">
                <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(200,255,0,0.1)]">
                    <Calendar className="h-10 w-10 text-[var(--primary)]" />
                </div>

                <h2 className="text-3xl font-black mb-4 tracking-tight text-white">Nominations are Closed</h2>

                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl mb-8 flex items-start gap-4 text-left border border-white/10 shadow-xl">
                    <Info className="w-6 h-6 text-[var(--primary)] shrink-0 mt-0.5" />
                    <p className="text-gray-300 leading-relaxed text-sm">
                        The official nomination portal is currently <strong>closed</strong>. We are busy reviewing the incredible submissions we've received so far!
                    </p>
                </div>

                <p className="text-gray-400 mb-10 px-4 text-sm font-medium">
                    Please check back later or follow our social media channels for updates on the Class of 2026.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/categories" className="w-full">
                        <Button className="w-full font-bold h-12 shadow-lg shadow-[var(--primary)]/10" onClick={onClose}>
                            Browse Categories
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full h-12 border-white/10 text-white hover:bg-white/5" onClick={onClose}>
                        I Understand
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
