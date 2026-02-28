'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    return (
        <>
            {!isAdminPage && <Header />}
            <main className={!isAdminPage ? "min-h-screen pt-20" : ""}>
                {children}
            </main>
            {!isAdminPage && <Footer />}
        </>
    );
}
