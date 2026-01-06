'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        router.push('/admin/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-400 hover:bg-white/5 transition-all font-medium"
        >
            <LogOut className="h-5 w-5" />
            Sign Out
        </button>
    );
}
