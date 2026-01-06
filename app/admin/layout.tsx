import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    FileText,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import LogoutButton from './LogoutButton';
// Since this is a layout, default to server component but if we need interactivity (hamburger), need client.
// Let's make a client wrapper or use client component for layout elements.

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-black text-white h-screen fixed left-0 top-0 overflow-y-auto z-20">
                <div className="p-6 border-b border-[#333]">
                    <span className="text-xl font-black tracking-tighter leading-none text-white">
                        100<span className="text-[var(--primary)]">UNDER</span>40
                    </span>
                    <span className="text-[0.6rem] font-bold tracking-widest text-gray-400 uppercase block mt-1">
                        Admin Panel
                    </span>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Overview" />
                    <NavItem href="/admin/nominations" icon={FileText} label="Nominations" />
                    <NavItem href="/admin/nominees" icon={Users} label="Nominees" />
                    <NavItem href="/admin/voting" icon={BarChart3} label="Voting Analytics" />
                    <NavItem href="/admin/categories" icon={Users} label="Categories" />
                    <NavItem href="/admin/settings" icon={Settings} label="Settings" />
                </nav>

                <div className="p-4 border-t border-[#333]">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-[var(--primary)] hover:text-black transition-all font-medium">
            <Icon className="h-5 w-5" />
            {label}
        </Link>
    );
}

