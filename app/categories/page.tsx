import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Card, { CardContent } from '@/components/ui/Card';
import { categories, nominees } from '@/lib/mockData';

export default function CategoriesPage() {
    // Calculate nominee count per category
    const categoriesWithCount = categories.map(cat => ({
        ...cat,
        count: nominees.filter(n => n.categoryId === cat.id && n.published).length
    }));

    return (
        <div className="bg-[var(--grey-soft)] min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-black mb-6">Award Categories</h1>
                    <p className="text-xl text-gray-600">
                        We recognize excellence across various sectors that are pivotal to Africa's growth and development.
                        Explore the categories below.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoriesWithCount.map((category) => (
                        <Link key={category.id} href={`/nominees?category=${category.name}`} className="group h-full">
                            <Card hover className="h-full flex flex-col justify-between border-transparent hover:border-[var(--primary)] transition-colors">
                                <CardContent className="pt-6">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--primary-dark)] transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-gray-600 mb-6 line-clamp-3">{category.description}</p>
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
