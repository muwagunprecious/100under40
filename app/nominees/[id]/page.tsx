import Link from 'next/link';
import { ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';

// Mock Data (Must match gallery)
const mockNominees = [
    {
        id: '1',
        name: 'Sarah Johnson',
        category: 'Technology & Innovation',
        photoUrl: '/placeholder-avatar.jpg',
        bio: 'Founder of TechFarm, an AI-driven agricultural platform.',
        fullBio: 'Sarah Johnson is a pioneering technologist who founded TechFarm at the age of 26. Her platform uses artificial intelligence to help small-scale farmers in East Africa optimize their crop yields and reduce waste. Under her leadership, TechFarm has onboarded over 50,000 farmers and increased their collective income by 40%. She is a recipient of multiple international innovation awards.',
        achievements: [
            'Developed proprietary AI algorithm for soil analysis',
            'Raised $2M in seed funding',
            'Partnered with Ministry of Agriculture',
            'Named in Forbes Africa 30 Under 30'
        ]
    },
    {
        id: '2',
        name: 'David Osei',
        category: 'Business & Entrepreneurship',
        photoUrl: '/placeholder-avatar.jpg',
        bio: 'CEO of Pan-African Logistics, expanding trade routes across 15 countries.',
        fullBio: 'David Osei started Pan-African Logistics with a single truck and a vision to simplify cross-border trade. Today, his fleet operates in 15 West and Central African countries, providing seamless logistics solutions for SMEs. His digital-first approach has reduced shipping times by 60% and created over 500 direct jobs.',
        achievements: [
            'Expanded operations to 15 countries in 5 years',
            'Built a digital tracking system used by 2000+ clients',
            'Winner of the African Business Hero Award',
            'Employing 500+ staff'
        ]
    },
    // Add more mock data as needed
];

export default async function NomineeProfilePage({ params }: { params: Promise<{ id: string }> }) {
    // In Next.js 15, params is async 
    const resolvedParams = await params;
    const nominee = mockNominees.find(n => n.id === resolvedParams.id);

    if (!nominee) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Nominee Not Found</h1>
                <Link href="/nominees"><Button>Back to Nominees</Button></Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header / Hero */}
            <div className="h-64 bg-black relative mb-20">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_var(--primary)_0%,_transparent_40%)] opacity-20"></div>
                <div className="container mx-auto px-4 h-full relative z-10">
                    <Link href="/nominees" className="inline-flex items-center text-gray-400 hover:text-white mt-8 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Nominees
                    </Link>
                </div>

                {/* Profile Image & Name (Overlapping) */}
                <div className="absolute bottom-0 left-0 w-full translate-y-12">
                    <div className="container mx-auto px-4 flex flex-col md:flex-row items-end md:items-end gap-6">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-200 rounded-xl border-4 border-white shadow-xl flex items-center justify-center shrink-0">
                            <span className="text-6xl font-black text-gray-300">{nominee.name.charAt(0)}</span>
                        </div>
                        <div className="pb-2 md:pb-4 flex-grow">
                            <div className="bg-[var(--primary)] text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-2 uppercase tracking-wide">
                                {nominee.category}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-black md:text-white md:mix-blend-difference">{nominee.name}</h1>
                        </div>
                        <div className="pb-4 shrink-0 hidden md:block">
                            <Link href={`/vote?nomineeId=${nominee.id}`}>
                                <Button size="lg" className="rounded-full px-8 text-lg font-bold shadow-[0_0_20px_rgba(200,255,0,0.3)]">
                                    Vote for {nominee.name.split(' ')[0]}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-12 text-center md:hidden mb-8">
                <Link href={`/vote?nomineeId=${nominee.id}`}>
                    <Button size="lg" className="w-full rounded-full text-lg font-bold">
                        Vote for {nominee.name.split(' ')[0]}
                    </Button>
                </Link>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8 animate-fade-in">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Biography</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {nominee.fullBio}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Key Achievements</h2>
                        <ul className="space-y-3">
                            {nominee.achievements?.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-3 bg-[var(--grey-soft)] p-4 rounded-lg">
                                    <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-[var(--primary-dark)]"></div>
                                    <span className="text-gray-700 font-medium">{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-[var(--grey-soft)] p-6 rounded-xl">
                        <h3 className="font-bold text-lg mb-4">Share Profile</h3>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#1877F2] hover:shadow-md transition-all">
                                <Facebook className="h-5 w-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#1DA1F2] hover:shadow-md transition-all">
                                <Twitter className="h-5 w-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-[#0A66C2] hover:shadow-md transition-all">
                                <Linkedin className="h-5 w-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-black hover:shadow-md transition-all">
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-black text-white p-6 rounded-xl">
                        <p className="text-xs uppercase tracking-widest text-[#888] mb-2">Did You Know?</p>
                        <p className="text-sm text-gray-300">
                            The 100 Under 40 Awards has recognized over 500 trailblazers since its inception. Your vote helps us identify the next success story.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
