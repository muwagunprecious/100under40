'use client';

import { useState, useEffect } from 'react';
import Card, { CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Upload, Trash2, Users, Plus, Loader2 } from 'lucide-react';
import { categories } from '@/lib/mockData';

export default function AdminVotingNomineesPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [categoryId, setCategoryId] = useState('1');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [nominees, setNominees] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchNominees();
    }, []);

    const fetchNominees = async () => {
        try {
            const res = await fetch('/api/admin/nominees');
            if (res.ok) {
                const data = await res.json();
                setNominees(data);
            }
        } catch (err) {
            console.error('Failed to load nominees', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setPhoto(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Full Name is required');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('email', email.trim());
        formData.append('bio', bio.trim());
        formData.append('categoryId', categoryId);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const res = await fetch('/api/admin/nominees', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to upload nominee');
            }

            setName('');
            setEmail('');
            setBio('');
            setPhoto(null);
            setPhotoPreview(null);
            
            const fileInput = document.getElementById('photo-input') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            await fetchNominees();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this nominee?')) return;

        try {
            const res = await fetch(`/api/admin/nominees?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await fetchNominees();
            } else {
                alert('Failed to delete nominee');
            }
        } catch (err) {
            console.error('Delete error', err);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto font-sans">
            <div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-1 font-sans">Voting Nominees</h1>
                <p className="text-gray-500 font-medium">Upload and manage nominees eligible for public voting</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Form Card */}
                <div className="md:col-span-1">
                    <Card className="bg-[#0A0A0A] border-white/5">
                        <CardContent className="p-6 space-y-6">
                            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                                <Plus className="w-5 h-5 text-[var(--primary)]" />
                                Add Nominee
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Full Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Zainab Ahmed"
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Email (Optional)</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="e.g. zainab@example.com"
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Bio/Description</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="A brief bio of achievements or background..."
                                        rows={3}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Category</label>
                                    <select
                                        value={categoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none"
                                        style={{ colorScheme: 'dark' }}
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id} className="bg-black text-white">
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Picture</label>
                                    <div className="relative group border border-white/10 border-dashed rounded-2xl p-4 hover:border-[var(--primary)]/30 transition-colors flex flex-col items-center justify-center min-h-[140px] bg-white/[0.01]">
                                        {photoPreview ? (
                                            <div className="relative w-24 h-24 rounded-full overflow-hidden border border-white/10">
                                                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => { setPhoto(null); setPhotoPreview(null); }}
                                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-500 font-bold text-xs"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-gray-500 mb-2 group-hover:text-[var(--primary)] transition-colors" />
                                                <span className="text-xs text-gray-400 text-center font-medium">Click to select photo</span>
                                                <input
                                                    id="photo-input"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handlePhotoChange}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 text-red-500 text-xs p-3 rounded-lg border border-red-500/20 font-bold">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    className="w-full py-4 bg-white text-black hover:bg-[var(--primary)] font-black uppercase tracking-widest text-xs rounded-xl"
                                >
                                    Upload Nominee
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* List Card */}
                <div className="md:col-span-2 space-y-4">
                    <Card className="bg-[#0A0A0A] border-white/5">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-2">
                                <Users className="w-5 h-5 text-[var(--primary)]" />
                                Uploaded Nominees ({nominees.length})
                            </h2>

                            {isLoading ? (
                                <div className="flex h-32 items-center justify-center">
                                    <Loader2 className="h-6 w-6 animate-spin text-[var(--primary)]" />
                                </div>
                            ) : nominees.length === 0 ? (
                                <div className="p-12 text-center text-gray-500 border border-white/5 border-dashed rounded-2xl">
                                    No nominees uploaded yet. Use the panel on the left to add voting candidates.
                                </div>
                            ) : (
                                <div className="divide-y divide-white/5">
                                    {nominees.map((nominee) => {
                                        const category = categories.find((c) => c.id === nominee.categoryId);
                                        return (
                                            <div key={nominee.id} className="py-4 flex items-center justify-between gap-4 group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 shrink-0">
                                                        {nominee.photoUrl ? (
                                                            <img src={nominee.photoUrl} alt={nominee.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-white/40 bg-white/[0.02]">
                                                                <Users className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-white font-bold text-sm tracking-wide truncate">{nominee.name}</h3>
                                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                                            <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--primary)] max-w-full truncate">
                                                                {category?.name || 'General Category'}
                                                            </span>
                                                            <span className="text-[10px] text-gray-500 font-bold uppercase shrink-0">
                                                                {nominee.votesCount} {nominee.votesCount === 1 ? 'vote' : 'votes'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(nominee.id)}
                                                    className="p-2 text-gray-500 hover:text-red-500 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
