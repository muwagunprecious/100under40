'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    BarChart3,
    Settings,
    Loader2,
    Mail,
    Award,
    Menu,
    X
} from 'lucide-react';
import LogoutButton from './LogoutButton';
import { cn } from '@/lib/utils';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

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

    const navigationItems = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { href: '/admin/nominees', icon: Users, label: 'Nomination Inbox' },
        { href: '/admin/voting-nominees', icon: Users, label: 'Voting Nominees' },
        { href: '/admin/awardees', icon: Award, label: 'Confirmed Awardees' },
        { href: '/admin/community', icon: Users, label: 'Community' },
        { href: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
        { href: '/admin/voting', icon: BarChart3, label: 'Voting Analytics' },
        { href: '/admin/settings', icon: Settings, label: 'Settings' }
    ];

    return (
        <div className="min-h-screen bg-black flex flex-col md:flex-row font-sans text-white">
            {/* Mobile Top Bar */}
            <header className="md:hidden flex items-center justify-between p-4 bg-black border-b border-white/5 sticky top-0 z-30">
                <div className="flex flex-col">
                    <span className="text-base font-black tracking-tighter leading-none text-white">
                        100<span className="text-[var(--primary)]">UNDER</span>40
                    </span>
                    <span className="text-[8px] font-bold tracking-widest text-gray-500 uppercase mt-0.5">
                        Admin Panel
                    </span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white hover:text-[var(--primary)] transition-colors focus:outline-none cursor-pointer"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </header>

            {/* Mobile Menu Drawer */}
            <div className={cn(
                "fixed inset-y-0 left-0 bg-black z-40 md:hidden flex flex-col pt-20 px-6 transition-all duration-300 ease-in-out border-r border-white/5 w-64 shadow-2xl",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Close Button in drawer */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
                <nav className="flex-grow space-y-2 overflow-y-auto pb-6">
                    {navigationItems.map((item) => (
                        <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
                    ))}
                </nav>
                <div className="py-6 border-t border-white/5">
                    <LogoutButton />
                </div>
            </div>

            {/* Overlay background when mobile menu is open */}
            {isMobileMenuOpen && (
                <div 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                />
            )}

            {/* Sidebar (Desktop) */}
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
                    {navigationItems.map((item) => (
                        <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} />
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-8 bg-[#050505] min-h-[calc(100vh-65px)] md:min-h-screen">
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
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-sm cursor-pointer ${isActive
                ? 'bg-[var(--primary)] text-black font-bold shadow-[0_0_20px_rgba(200,255,0,0.2)]'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
        </Link>
    );
}

