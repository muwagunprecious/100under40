'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Lock } from 'lucide-react';
// We use server actions for login usually but for this demo, client-side fetch implies using signIn from next-auth/react
// However, to keep it simple without wrapping everything in Providers, we can just use a server action or the API route.
// Actually, next-auth v5 recommends server actions. But `signIn` from `next-auth/react` is still common.
// Let's use standard form submission to an API or server action.
// Since we are client component, we can import signIn from next-auth/react? 
// No, v5 has unified APi. Let's use server action wrapper.
// Actually, easier to just use the API flow for now or use `next-auth/react` if installed.
// I installed `next-auth` main package, not `react` adapter specifically if separate in v5... 
// actually it exports from `next-auth/react`.
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Use NextAuth signIn
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid credentials');
            } else {
                router.push('/admin/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#111] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-[var(--primary)] p-6 text-center">
                    <Lock className="bg-black/10 p-2 rounded-full h-12 w-12 mx-auto text-black mb-3" />
                    <h2 className="text-2xl font-black text-black">Admin Portal</h2>
                    <p className="text-black/70 font-medium">Authorized Access Only</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-gray-50"
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-gray-50"
                    />

                    <Button
                        type="submit"
                        className="w-full text-lg font-bold shadow-lg"
                        size="lg"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>

                    <div className="text-center">
                        <p className="text-xs text-gray-400 mt-4">
                            Restricted area. All IP addresses are logged.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
