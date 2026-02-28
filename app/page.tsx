import Link from 'next/link';
import { ArrowRight, Star, Users, Award, Calendar, Globe, Zap, Target } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[var(--primary)] selection:text-black">

      {/* ================= HERO SECTION ================= */}
      {/* Design Guide: Full-width black, subtle grain, calm centered typography */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center border-b border-white/5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-95">

        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          {/* Institutional Label */}
          <span className="inline-block py-1 px-3 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)] mb-8">
            The Class of 2026
          </span>

          {/* Calm, Authoritative Headline */}
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[1]">
            Honoring Africa’s <br /> Most <span className="text-[var(--primary)]">Consequential</span> Leaders.
          </h1>

          {/* Muted Subtext */}
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            The 100 Under 40 Award is the continent’s premier recognition platform, identifying exceptional young Africans driving measurable, sustainable, and transformative impact across 25 strategic sectors.
          </p>

          {/* Deliberate CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/nominate">
              <Button size="lg" variant="primary" className="min-w-[240px] rounded-sm font-black text-lg shadow-[0_20px_50px_rgba(200,255,0,0.15)]">
                Nominate a Leader
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="min-w-[200px] border-white/10 text-white hover:bg-white hover:text-black font-bold">
                Read Our Methodology
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      {/* Design Guide: Black background, white numbers, muted labels, no blocks */}
      <section className="py-24 border-b border-white/5 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
            {[
              { label: 'Nominees Verified', value: '500+' },
              { label: 'Award Categories', value: '25' },
              { label: 'Countries Represented', value: '30+' },
              { label: 'Global Impact', value: '2M+' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-bold">{stat.label}</span>
                <div className="text-4xl lg:text-5xl font-semibold text-white tracking-tight">{stat.value}</div>
                <div className="w-8 h-[2px] bg-[var(--primary)] mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MISSION / ABOUT ================= */}
      {/* Design Guide: Strong grid, negative space, no banners */}
      <section className="py-32 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20">

            {/* Text Content */}
            <div className="lg:w-1/2">
              <span className="badge-label">The Mission</span>
              <h2 className="text-4xl md:text-6xl text-white mb-8 font-black leading-tight">
                Identifying the Architects of <span className="text-[var(--primary)]">Africa's Future</span>.
              </h2>
              <div className="space-y-6 text-gray-300 text-lg font-medium leading-relaxed max-w-xl">
                <p>
                  The 100 Under 40 Award is not just a ceremony; it is a rigorous verification of excellence. We exist to spotlight the young visionaries who are solving the continent's most complex challenges through innovation, governance, and enterprise.
                </p>
                <p>
                  Under the stewardship of the Achievers Summit, we are curating a definitive roster of high-impact leaders—building a credible network that stakeholders can trust for decades to come.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <Link href="/nominate">
                  <Button className="font-bold px-8">Start a Nomination</Button>
                </Link>
                <Link href="/about" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Visual / Decor */}
            <div className="lg:w-1/2 relative bg-[#050505] border border-white/5 p-8 flex items-end min-h-[400px]">
              <div className="absolute top-0 right-0 p-4">
                <Star className="w-12 h-12 text-[var(--primary)]/20" />
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-light text-white">2026</div>
                <div className="h-[1px] w-full bg-white/10"></div>
                <div className="text-xs uppercase tracking-widest text-[#666]">Official Selection Cycle</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CATEGORIES GRID ================= */}
      {/* Design Guide: Clean grid, dark cards, minimal borders */}
      <section className="py-32 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="badge-label">Fields of Endeavor</span>
              <h2 className="text-3xl md:text-4xl text-white">Award Categories</h2>
            </div>
            <Link href="/categories">
              <span className="text-xs font-bold uppercase tracking-widest text-[#888] hover:text-[var(--primary)] transition-colors cursor-pointer">View All 25 Categories &rarr;</span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Technology & Innovation', icon: Zap },
              { title: 'Business & Entrepreneurship', icon: Target },
              { title: 'Social Impact & Philanthropy', icon: Globe },
              { title: 'Creative Arts & Culture', icon: Star },
              { title: 'Media & Journalism', icon: Users },
              { title: 'Governance & Policy', icon: Award },
            ].map((cat, i) => (
              <Link href="/categories" key={i}>
                <div className="group p-8 border border-white/5 bg-[#0A0A0A] hover:border-[var(--primary)]/30 transition-all duration-300 min-h-[180px] flex flex-col justify-between cursor-pointer">
                  <div className="flex justify-between items-start">
                    <cat.icon className="w-6 h-6 text-[#444] group-hover:text-[var(--primary)] transition-colors" />
                    <ArrowRight className="w-4 h-4 text-[#333] group-hover:text-white -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:translate-x-1 transition-transform">{cat.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 bg-[#0A0A0A] border-t border-white/5 text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl text-white mb-6 font-semibold">Ready to make history?</h2>
          <p className="text-[#888] text-lg font-light mb-10">
            Nominations for the Class of 2026 are widely open. Help us identify the next generation of giants.
          </p>
          <Link href="/nominate">
            <Button size="lg" className="px-10 py-4 uppercase tracking-widest rounded-sm bg-white text-black hover:bg-[var(--primary)] border-none">
              Begin Nomination
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
