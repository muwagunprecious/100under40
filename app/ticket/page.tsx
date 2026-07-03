import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function TicketPage() {
  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-16">
      <section className="py-16" id="tickets">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="badge-label">Awardee Participation</span>
            <h1 className="text-4xl md:text-6xl text-white font-black">Choose Your Experience</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">Select a participation tier for the award ceremony. Each package is tailored to maximize your recognition, networking, and celebration.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Standard Experience */}
            <div className="bg-[#050505] border border-white/10 rounded-xl overflow-hidden flex flex-col transition-all hover:border-[var(--primary)]/50">
              <div className="p-8 border-b border-white/10 bg-white/5">
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Standard Experience</h3>
                <div className="text-[var(--primary)] text-4xl font-black">₦100,000</div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    'Pre-Award Mixer — 11 Aug (Poolside, cocktails & networking)',
                    'International Youth Day Summit — 12 Aug (VIP Pass + 1-2 General Admission passes)',
                    'Red Carpet Reception — 12 Aug, 7:00 PM',
                    'Awards Gala & Dinner Night — 12 Aug, 8:00 PM - Midnight',
                    'Reserved VIP Seating at all sessions',
                    'Priority Check-in & Fast-track Registration',
                    'Certificate of Participation',
                    'Feature in the 100 Under 40 Magazine',
                    'Admits 2 people'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-medium text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://paystack.shop/pay/100under40-tier1" target="_blank" rel="noreferrer" className="block w-full">
                  <Button variant="outline" className="w-full py-4 border-white/20 text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-sm">
                    Secure Standard Experience
                  </Button>
                </a>
              </div>
            </div>

            {/* Premium Experience */}
            <div className="bg-[#050505] border-2 border-[var(--primary)] rounded-xl overflow-hidden flex flex-col relative transform md:-translate-y-4 shadow-[0_20px_50px_rgba(200,255,0,0.05)]">
              <div className="absolute top-0 right-0 bg-[var(--primary)] text-black text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg">
                Recommended
              </div>
              <div className="p-8 border-b border-white/10 bg-[var(--primary)]/5">
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">Premium Experience</h3>
                <div className="text-[var(--primary)] text-4xl font-black">₦250,000</div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  {[
                    'Pre-Award Mixer — 11 Aug (Poolside, cocktails & networking)',
                    'International Youth Day Summit — 12 Aug (VIP Pass + 1-2 General Admission passes)',
                    'Red Carpet Reception — 12 Aug, 7:00 PM',
                    'Awards Gala & Dinner Night — 12 Aug, 8:00 PM - Midnight',
                    'Reserved VIP Seating at all sessions',
                    'Priority Check-in & Fast-track Registration',
                    'Certificate of Participation',
                    'Feature in the 100 Under 40 Magazine',
                    'Access to Investor Roundtable & Deal Room',
                    '100Under40 Hall Fame',
                    'Feature in The Guardian Newspaper 100 Under 40 Special Edition',
                    'Priority access to closed-door sessions & networking forums',
                    'Admits up to 3 people'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-medium text-sm leading-relaxed">
                        {feature.includes('Hall Fame') || feature.includes('Guardian Newspaper') ? (
                          <strong className="text-white">{feature}</strong>
                        ) : feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a href="https://paystack.shop/pay/100under40-tier2" target="_blank" rel="noreferrer" className="block w-full">
                  <Button variant="primary" className="w-full py-4 text-black font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(200,255,0,0.15)]">
                    Secure Premium Experience
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
