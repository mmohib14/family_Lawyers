import React from 'react';
import { BadgeCheck, Building2, MapPin, Users } from 'lucide-react';

const trustItems = [
  {
    icon: Users,
    label: 'Direct partner access',
    detail: 'Your matter is led by a named senior trial attorney, not passed through an anonymous intake queue.'
  },
  {
    icon: MapPin,
    label: 'California-based representation',
    detail: 'Serving clients across San Francisco, Silicon Valley, and the federal courts of the Western United States.'
  },
  {
    icon: BadgeCheck,
    label: 'Credentials you can verify',
    detail: 'Bar admissions, education, awards, documented results, and independent review sources are listed openly.'
  },
  {
    icon: Building2,
    label: 'Built for high-stakes matters',
    detail: 'Trial preparation, expert coordination, and confidential strategy for cases where the outcome matters most.'
  }
];

export const FirmTrustSection: React.FC = () => {
  return (
    <section className="bg-white border-b border-slate-200" aria-labelledby="firm-trust-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-5 lg:gap-12 mb-8">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B88A2D]">A real firm for consequential cases</p>
            <h2 id="firm-trust-heading" className="mt-2 font-serif-display text-2xl sm:text-3xl font-bold text-[#41342E]">
              Know who is standing beside you.
            </h2>
          </div>
          <p className="min-w-0 max-w-xl lg:justify-self-end text-sm leading-relaxed text-slate-600">
            Vanguard &amp; Sterling combines visible attorney credentials with a responsive intake team, so prospective clients can make an informed decision before sharing sensitive details.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7">
          {trustItems.map(({ icon: Icon, label, detail }) => (
            <div key={label} className="min-w-0 border-t-2 border-[#C7A14C] pt-4">
              <Icon className="w-5 h-5 text-[#B88A2D]" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-bold text-[#30251F]">{label}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


