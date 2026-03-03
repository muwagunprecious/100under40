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
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                            <span className="text-[var(--primary)]">Africa's Most</span> <br />
                            <span className="text-[var(--primary)] text-shadow-glow">Consequential Leaders</span>
                        </h1>
                        <p className="text-xl !text-white leading-relaxed font-bold">
                            Identifying, verifying, and amplifying the stories of the continent's most impactful young achievers through a rigorous, data-driven recognition framework.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black tracking-tight">The Mandate</h2>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                To identify, verify, and honor 100 outstanding individuals under the age of 40 who have demonstrated measurable and sustainable impact across the continent. We exist to provide a credible roster of leadership that stakeholders can trust for the long term.
                            </p>

                            <div className="pt-8">
                                <h2 className="text-4xl font-black tracking-tight mb-6">The Horizon</h2>
                                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                    A continent where ethical and high-impact leadership is recognized as the ultimate catalyst for systemic transformation and economic prosperity.
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

            {/* Emmanuel Agida International Initiative */}
            <section className="py-20 bg-black text-white relative">
                <div className="container mx-auto px-4 text-center">
                    <p className="!text-white font-black tracking-[0.4em] uppercase mb-4">An Initiative of</p>
                    <h2 className="text-4xl md:text-5xl font-black mb-8 !text-white">EMMANUEL AGIDA INTERNATIONAL</h2>
                    <div className="h-1 w-24 bg-[var(--primary)] mx-auto mb-8"></div>
                    <p className="max-w-3xl mx-auto !text-white text-lg leading-relaxed mb-12 font-medium">
                        Emmanuel Agida International is a global organization dedicated to youth empowerment, leadership development, and socio-economic transformation.
                        The 100 Under 40 Awards extends our commitment to fostering leadership excellence by specifically
                        highlighting the emerging generation of changemakers across the continent.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                            <Users className="h-10 w-10 text-[var(--primary)] mx-auto mb-4" />
                            <h4 className="font-bold text-xl mb-2">Networking</h4>
                            <p className="text-sm !text-white opacity-80 font-medium">Connecting awardees with established industry leaders.</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                            <Award className="h-10 w-10 text-[var(--primary)] mx-auto mb-4" />
                            <h4 className="font-bold text-xl mb-2">Recognition</h4>
                            <p className="text-sm !text-white opacity-80 font-medium">Global visibility for impactful work and initiatives.</p>
                        </div>
                        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
                            <Calendar className="h-10 w-10 text-[var(--primary)] mx-auto mb-4" />
                            <h4 className="font-bold text-xl mb-2">Mentorship</h4>
                            <p className="text-sm !text-white opacity-80 font-medium">Access to guidance from the Emmanuel Agida International network.</p>
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
                            { step: 'Phase 1', title: 'Nomination', desc: 'Secure public submission and archival for initial review.' },
                            { step: 'Phase 2', title: 'Validation', desc: 'Rigorous data-driven screening by our internal research department.' },
                            { step: 'Phase 3', title: 'Public Voting', desc: 'Community validation of the shortlist [20% Weightage].' },
                            { step: 'Phase 4', title: 'Jury Assessment', desc: 'Final executive evaluation by an independent board [80% Weightage].' }
                        ].map((item, i) => (
                            <Card key={i} className="relative pt-8 overflow-hidden hover:-translate-y-2 transition-all duration-300">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <span className="text-4xl font-black text-black">{item.step}</span>
                                </div>
                                <CardContent>
                                    <div className="inline-flex items-center px-3 py-1 bg-black text-[var(--primary)] text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="font-black text-2xl mb-2 tracking-tighter uppercase">{item.title}</h3>
                                    <p className="text-gray-600 text-sm font-medium leading-relaxed">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
