import Image from 'next/image';
import CommunityForm from '@/components/community/CommunityForm';
import { Users, Globe, Zap, Heart } from 'lucide-react';

export default function CommunityPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-black text-white">
                <div className="absolute inset-0 z-0 text-center">
                    <Image
                        src="/group-award.jpg"
                        alt="100 Under 40 Community"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-40"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
                        JOIN THE <span className="text-[var(--primary)] text-shadow-glow">COMMUNITY</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-bold mb-8 !text-white max-w-2xl mx-auto leading-relaxed">
                        A network of visionaries, leaders, and change-makers committed to transforming Africa.
                    </p>
                    <a href="#apply-form">
                        <button className="bg-[var(--primary)] text-black px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(200,255,0,0.3)]">
                            Apply to Join
                        </button>
                    </a>
                </div>
            </section>

            {/* Why Join Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">Why Join Our Community?</h2>
                        <div className="w-24 h-2 bg-[var(--primary)] mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Users />, title: "Elite Network", desc: "Connect with the continent's most impactful young achievers and visionaries." },
                            { icon: <Globe />, title: "Global Impact", desc: "Collaborate on projects that drive sustainable socio-economic transformation in Africa." },
                            { icon: <Zap />, title: "Self Growth", desc: "Access exclusive mentorship, leadership training, and professional workshops." },
                            { icon: <Heart />, title: "Service", desc: "Contribute your skills to a mission larger than yourself through our volunteer units." }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-[var(--primary)] transition-colors group">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:bg-[var(--primary)] transition-colors">
                                    <span className="text-black group-hover:scale-110 transition-transform">{item.icon}</span>
                                </div>
                                <h3 className="text-xl font-black mb-3 text-black uppercase">{item.title}</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Section */}
            <section id="apply-form" className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">Submit Your Application</h2>
                        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto italic">
                            "Leadership is the capacity to translate vision into reality."
                        </p>
                    </div>

                    <CommunityForm />
                </div>
            </section>
        </div>
    );
}
