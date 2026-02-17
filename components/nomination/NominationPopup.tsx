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
            className="border-t-8 border-[var(--primary)]"
        >
            <div className="text-center py-4">
                <div className="w-16 h-16 bg-[var(--primary-soft)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="h-8 w-8 text-[var(--primary-dark)]" />
                </div>

                <h2 className="text-2xl font-black mb-3">Nomination Starting Soon!</h2>

                <div className="bg-[var(--grey-soft)] p-4 rounded-xl mb-6 flex items-start gap-3 text-left">
                    <Info className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                        The official nomination portal for the <strong>Class of 2026</strong> will open on
                        <span className="text-black font-bold block mt-1">February 28th, 2026</span>
                    </p>
                </div>

                <p className="text-gray-500 text-sm mb-8">
                    In the meantime, feel free to explore our award categories and prepare your submission details.
                </p>

                <div className="flex flex-col gap-3">
                    <Link href="/categories" className="w-full">
                        <Button className="w-full font-bold" onClick={onClose}>
                            Browse Categories
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={onClose}>
                        I Understand
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
