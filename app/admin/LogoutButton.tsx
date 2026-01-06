'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Button from '@/components/ui/Button';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-400 hover:bg-white/5 transition-all font-medium"
        >
            <LogOut className="h-5 w-5" />
            Sign Out
        </button>
    );
}
