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
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-8 leading-[1.1]">
            Recognizing Africa’s <br /> Next Generation of <span className="text-[var(--primary)] font-normal italic">Leaders</span>.
          </h1>

          {/* Muted Subtext */}
          <p className="text-lg md:text-xl text-[#888] font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            The 100 Under 40 Awards identifies, verifies, and honors the most consequential young achievers shaping the continent's future across industry, governance, and culture.
          </p>

          {/* Deliberate CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/nominate">
              <Button size="lg" variant="primary" className="min-w-[200px] rounded-sm">
                Submit Nomination
              </Button>
            </Link>
            <Link href="/about">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#666] hover:text-white transition-colors border-b border-transparent hover:border-white pb-1 cursor-pointer">
                Learn About Our Mission
              </span>
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
              <span className="badge-label">Our Mandate</span>
              <h2 className="text-3xl md:text-5xl text-white mb-8">
                We don't just give awards. <br /> We verify <span className="text-[var(--primary)]">excelence</span>.
              </h2>
              <div className="space-y-6 text-[#999] text-lg font-light leading-relaxed max-w-xl">
                <p>
                  In an era of noise, the 100 Under 40 Awards serves as a definitive roster of high-impact individuals. An initiative of Achievers Summit, our selection process is rigorous, data-driven, and devoid of hype.
                </p>
                <p>
                  We are building a network of credible leadership that investors, partners, and the public can trust for the next 50 years.
                </p>
              </div>

              <div className="mt-10">
                <Link href="/about">
                  <Button variant="outline" className="border-white/20 text-white hover:text-black hover:bg-white rounded-sm">
                    Read the Methodology
                  </Button>
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
