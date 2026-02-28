import LayoutWrapper from '@/components/layout/LayoutWrapper';
import './globals.css';

export const metadata = {
  title: '100 Under 40 Awards',
  description: 'Recognizing exceptional individuals under 40 across Africa. An Initiative of Achievers Summit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-[var(--background)] text-[var(--foreground)]">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
