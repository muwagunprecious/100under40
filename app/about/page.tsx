import { ArrowRight, CheckCircle, Calendar, Users, Award } from 'lucide-react';
import Card, { CardContent } from '@/components/ui/Card';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-black text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,_var(--primary-dark)_0%,_transparent_25%)] opacity-20"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-black mb-6">
                            Celebrating Africa's <br />
                            <span className="text-[var(--primary)]">Future Leaders</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            The 100 Under 40 Awards is dedicated to recognizing the exceptional achievements of young Africans who are driving change, innovation, and progress across the continent.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To identify, honor, and amplify the voices of 100 outstanding individuals under the age of 40 who have demonstrated exceptional leadership, innovation, and impact in their respective fields. We aim to inspire the next generation by showcasing what is possible.
                            </p>

                            <div className="pt-8">
                                <h2 className="text-3xl font-bold mb-6">The Vision</h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    A continent where young leadership is recognized as a catalyst for sustainable development, economic growth, and social transformation.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[var(--grey-soft)] p-8 rounded-2xl relative">
                            <div className="absolute -top-4 -right-4 bg-[var(--primary)] w-24 h-24 rounded-full opacity-20 blur-2xl"></div>
                            <h3 className="text-2xl font-bold mb-6">Core Values</h3>
                            <ul className="space-y-4">
                                {[
                                    { title: 'Excellence', desc: 'Uncompromising commitment to quality and impact.' },
                                    { title: 'Integrity', desc: 'Transparency in our selection and voting processes.' },
                                    { title: 'Innovation', desc: 'Celebrating creative solutions to complex challenges.' },
                                    { title: 'Inclusivity', desc: 'Representing diverse sectors and regions across Africa.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1 bg-[var(--primary)] rounded-full p-1 h-fit">
                                            <CheckCircle className="h-4 w-4 text-black" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                            <p className="text-gray-600">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievers Summit Initiative */}
            <section className="py-20 bg-black text-white relative">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-[var(--primary)] font-bold tracking-widest uppercase mb-4">An Initiative of</p>
                    <h2 className="text-4xl md:text-5xl font-black mb-8">ACHIEVERS SUMMIT</h2>
                    <div className="h-1 w-24 bg-[var(--primary)] mx-auto mb-8"></div>
                    <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed mb-12">
                        The Achievers Summit is Africa's premier gathering of thought leaders, entrepreneurs, and policymakers.
                        The 100 Under 40 Awards extends our commitment to fostering leadership excellence by specifically
                        highlighting the emerging generation of changemakers.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                            <Users className="h-10 w-10 text-[var(--primary)] mx-auto mb-4" />
                            <h4 className="font-bold text-xl mb-2">Networking</h4>
                            <p className="text-sm text-gray-400">Connecting awardees with established industry leaders.</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                            <Award className="h-10 w-10 text-[var(--primary)] mx-auto mb-4" />
                            <h4 className="font-bold text-xl mb-2">Recognition</h4>
                            <p className="text-sm text-gray-400">Global visibility for impactful work and initiatives.</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                            <Calendar className="h-10 w-10 text-[var(--primary)] mx-auto mb-4" />
                            <h4 className="font-bold text-xl mb-2">Mentorship</h4>
                            <p className="text-sm text-gray-400">Access to guidance from the Achievers Summit network.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selection Process */}
            <section className="py-20 bg-[var(--grey-soft)]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-16">The Selection Process</h2>

                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { step: '01', title: 'Nomination', desc: 'Public nominations open for all categories.' },
                            { step: '02', title: 'Validation', desc: 'Initial screening by our research team.' },
                            { step: '03', title: 'Shortlisting', desc: 'Jury selects top finalists per category.' },
                            { step: '04', title: 'Voting', desc: 'Public voting determines the winners.' }
                        ].map((item, i) => (
                            <Card key={i} className="relative pt-8 overflow-hidden hover:scale-105 transition-transform">
                                <div className="absolute top-0 right-0 text-6xl font-black text-gray-100 -z-10">{item.step}</div>
                                <CardContent>
                                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
