import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Card, { CardContent, CardTitle } from '@/components/ui/Card';

// This would eventually come from the database
const categories = [
    {
        id: 'technology',
        name: 'Technology & Innovation',
        description: 'Celebrating tech entrepreneurs, developers, and innovators building digital solutions for Africa.',
        count: 12
    },
    {
        id: 'entrepreneurship',
        name: 'Business & Entrepreneurship',
        description: 'Recognizing founders and business leaders driving economic growth and job creation.',
        count: 24
    },
    {
        id: 'social-impact',
        name: 'Social Impact & Philanthropy',
        description: 'Honoring individuals dedicated to solving social challenges and uplifting communities.',
        count: 18
    },
    {
        id: 'creative-arts',
        name: 'Creative Arts & Culture',
        description: 'Spotlighting artists, musicians, filmmakers, and cultural ambassadors.',
        count: 15
    },
    {
        id: 'media',
        name: 'Media & Journalism',
        description: 'Celebrating storytellers, journalists, and media personalities shaping the narrative.',
        count: 10
    },
    {
        id: 'governance',
        name: 'Leadership & Governance',
        description: 'Recognizing young leaders in public service, policy making, and governance.',
        count: 8
    },
    {
        id: 'agriculture',
        name: 'Agriculture & Agribusiness',
        description: 'Honoring innovation and leadership in food security and agricultural value chains.',
        count: 9
    },
    {
        id: 'education',
        name: 'Education & Academia',
        description: 'Celebrating educators and researchers advancing knowledge and learning.',
        count: 11
    },
    {
        id: 'health',
        name: 'Health & Wellness',
        description: 'Recognizing contributions to public health, medicine, and wellness.',
        count: 14
    },
    {
        id: 'sports',
        name: 'Sports',
        description: 'Honoring athletes and sports administrators making a mark globally.',
        count: 7
    }
];

export default function CategoriesPage() {
    return (
        <div className="bg-[var(--grey-soft)] min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Award Categories</h1>
                    <p className="text-xl text-gray-600">
                        We recognize excellence across 10 key sectors that are pivotal to Africa's growth and development.
                        Explore the categories below.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/nominees?category=${category.id}`} className="group h-full">
                            <Card hover className="h-full flex flex-col justify-between border-transparent hover:border-[var(--primary)] transition-colors">
                                <CardContent className="pt-6">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--primary-dark)] transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 mb-6">{category.description}</p>
                                </CardContent>
                                <div className="px-6 pb-6 mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-sm font-medium text-gray-400">{category.count} Nominees</span>
                                    <span className="flex items-center text-sm font-bold text-black group-hover:text-[var(--primary-dark)]">
                                        View Nominees <ArrowRight className="ml-1 h-4 w-4" />
                                    </span>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
