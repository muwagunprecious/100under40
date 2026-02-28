'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    Loader2
} from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            if (!isLoginPage) {
                router.push('/admin/login');
            }
        }
    }, [isLoginPage, router]);

    // Show nothing or a loading spinner while checking auth, unless it's the login page
    if (isAuthenticated === null && !isLoginPage) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 text-[var(--primary)] animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Verifying Credentials...</p>
                </div>
            </div>
        );
    }

    // If it's the login page, render children directly without the sidebar
    if (isLoginPage) {
        return <>{children}</>;
    }

    // If not authenticated and not on login page, don't render content (useEffect will redirect)
    if (!isAuthenticated && !isLoginPage) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black flex font-sans">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-black text-white h-screen fixed left-0 top-0 overflow-y-auto z-20 border-r border-white/5">
                <div className="p-6 border-b border-white/5">
                    <span className="text-xl font-black tracking-tighter leading-none text-white">
                        100<span className="text-[var(--primary)]">UNDER</span>40
                    </span>
                    <span className="text-[0.6rem] font-bold tracking-widest text-gray-400 uppercase block mt-1">
                        Admin Panel
                    </span>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Overview" />
                    <NavItem href="/admin/nominees" icon={Users} label="Nominees" />
                    <NavItem href="/admin/voting" icon={BarChart3} label="Voting Analytics" />
                    <NavItem href="/admin/settings" icon={Settings} label="Settings" />
                </nav>

                <div className="p-4 border-t border-white/5">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 bg-[#050505]">
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${isActive
                ? 'bg-[var(--primary)] text-black font-bold shadow-[0_0_20px_rgba(200,255,0,0.2)]'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <Icon className="h-5 w-5" />
            {label}
        </Link>
    );
}

