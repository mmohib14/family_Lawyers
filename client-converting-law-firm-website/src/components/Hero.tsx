import React from 'react';
import { ShieldCheck, Calendar, ArrowRight, Phone, CheckCircle2, Award, Scale } from 'lucide-react';
import { TRUST_METRICS } from '../data/legalData';

interface HeroProps {
  onOpenScheduler: () => void;
  onScrollToEligibility: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenScheduler,
  onScrollToEligibility
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#41342E] via-[#4A3A34] to-[#41342E] text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Real legal imagery gives the firm an immediate visual identity. */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1800&q=85')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#41342E] via-[#41342E]/95 to-[#41342E]/75 pointer-events-none" />
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C7A14C] blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 rounded-full bg-[#C7A14C] blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & High-Converting CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Eyebrow Badge */}
            <div className="inline-flex max-w-full items-start sm:items-center gap-2 px-3 py-1.5 rounded-full bg-[#C7A14C]/15 border border-[#C7A14C]/30 text-[#F5E9C8] text-xs sm:text-sm font-semibold tracking-wide text-left">
              <Award className="w-4 h-4 text-[#D7C17A]" />
              <span>Ranked Top 1% Trial Law Firm - 100% Contingency "No Win, No Fee"</span>
            </div>

            {/* Value Headline */}
            <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 leading-[1.15]">
              Relentless Advocacy. <br />
              <span className="text-[#D7C17A] italic">Proven Courtroom Results.</span> <br />
              Over $185M Recovered.
            </h1>

            {/* Plain-English Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              When catastrophic injury, executive retaliation, or high-stakes business betrayal strikes, insurance defense teams prepare to minimize your loss. We prepare to win in court. Get aggressive legal counsel fighting for your maximum recovery today.
            </p>

            {/* Key Assurance Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-medium text-slate-300">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B3C08A] shrink-0" />
                <span>Zero Upfront Retainer Fees</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B3C08A] shrink-0" />
                <span>100% Confidential Case Review</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B3C08A] shrink-0" />
                <span>24/7 Immediate Partner Response</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-primary-book-btn"
                onClick={onOpenScheduler}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#C7A14C] hover:bg-[#B88A2D] text-white text-base font-bold shadow-lg shadow-[#41342E]/30 hover:shadow-xl transition-all duration-150 flex items-center justify-center gap-2 group active:scale-[0.99]"
              >
                <Calendar className="w-5 h-5 text-white/90" />
                <span>Book Consult</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-eligibility-btn"
                onClick={onScrollToEligibility}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#41342E]/80 hover:bg-[#41342E] border border-[#6A554B] text-slate-200 text-base font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-[#D7C17A]" />
                <span>Check Eligibility</span>
              </button>
            </div>

            {/* 1-Click Dialing Prompt for Immediate Crisis */}
            <div className="pt-2 text-xs sm:text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2">
              <span>Need immediate emergency counsel?</span>
              <a
                href="tel:+18005550199"
                className="text-[#D7C17A] hover:text-[#F5E9C8] font-bold inline-flex items-center gap-1 underline underline-offset-4"
              >
                <Phone className="w-3.5 h-3.5 fill-current" />
                (800) 555-0199
              </a>
            </div>
            <p className="text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7C17A]" aria-hidden="true" />
              Licensed in California and New York - Federal court representation available
            </p>
          </div>

          {/* Right Column: High-Impact Trust Card / Proof Anchor */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-[#6A554B]/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm relative">
              <div className="flex items-center justify-between pb-5 border-b border-[#6A554B]/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#C7A14C]/20 border border-[#C7A14C]/40 flex items-center justify-center text-[#D7C17A]">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-lg font-bold text-slate-100">
                      Vanguard &amp; Sterling
                    </h3>
                    <p className="text-xs text-[#D7C17A] font-medium">
                      Trial Practice &amp; Strategic Defense
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#C7A14C]/20 text-[#F5E9C8] text-xs font-semibold border border-[#C7A14C]/30">
                  Duty Attorney On Call
                </span>
              </div>

              {/* Landmark Settlement Callout */}
              <div className="py-5 space-y-4">
                <div className="bg-[#241B17]/60 rounded-xl p-4 border border-[#5A4840]">
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Featured Recent Trial Result (2025)
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#D7C17A] font-serif-display break-words">
                      $22,400,000
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Jury Verdict - US District Court
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Commercial trade secret misappropriation &amp; punitive damages for corporate sabotage.
                  </p>
                </div>

                <div className="bg-[#241B17]/60 rounded-xl p-4 border border-[#5A4840]">
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Catastrophic Injury Recovery (2025)
                  </p>
                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#D7C17A] font-serif-display">
                      $14,850,000
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Settlement - Trucking Liability
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Multi-vehicle freight collision resulting in traumatic spinal injury and life-care annuity.
                  </p>
                </div>
              </div>

              {/* Consultation Quick Trigger */}
              <button
                id="hero-card-consultation-btn"
                onClick={onOpenScheduler}
                className="w-full py-3 px-4 bg-[#C7A14C] hover:bg-[#D7C17A] text-[#241B17] font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Case Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Metrics Strip (Homepage Section 2 Component) */}
        <div className="mt-16 pt-10 border-t border-[#5A4840]/80 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {TRUST_METRICS.map((metric, idx) => (
            <div key={idx} className="space-y-1">
              <p className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#D7C17A]">
                {metric.value}
              </p>
              <p className="text-sm font-semibold text-slate-200">
                {metric.label}
              </p>
              <p className="text-xs text-slate-400">
                {metric.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



