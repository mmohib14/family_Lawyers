import React from 'react';
import { ArrowUpRight, Calendar, Mail, MapPin, Phone, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SiteFooterProps {
  onOpenScheduler: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onOpenScheduler }) => {
  return (
    <footer className="relative overflow-hidden bg-[#241B17] text-slate-300 border-t border-[#5A4840]">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_85%_10%,rgba(199,161,76,0.18),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(199,161,76,0.1),transparent_30%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1fr] gap-10 py-12 sm:py-14 border-b border-[#5A4840]">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#41342E] border border-[#C7A14C]/50 flex items-center justify-center text-[#D7C17A]">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <p className="font-serif-display text-xl font-bold text-white">Apex Family Law</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#D7C17A] font-semibold">Family Law | Trial &amp; Resolution</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Strategic, compassionate family-law counsel for divorce, custody, family formation, safety, and complex property matters.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold text-[#F5E9C8]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C7A14C]/35 bg-[#C7A14C]/10 px-3 py-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Confidential intake</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C7A14C]/35 bg-[#C7A14C]/10 px-3 py-1.5">24/7 answering service</span>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7C17A]">Explore</h2>
            <nav className="mt-4 flex flex-col gap-3 text-sm" aria-label="Footer navigation">
              <Link className="hover:text-[#F5E9C8] transition-colors" to="/practice-areas">Practice Areas</Link>
              <Link className="hover:text-[#F5E9C8] transition-colors" to="/eligibility">Case Eligibility</Link>
              <Link className="hover:text-[#F5E9C8] transition-colors" to="/case-results">Results &amp; Reviews</Link>
              <Link className="hover:text-[#F5E9C8] transition-colors" to="/attorneys">Our Attorneys</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7C17A]">Offices</h2>
            <div className="mt-4 space-y-4 text-sm text-slate-400">
              <p className="flex gap-2.5"><MapPin className="w-4 h-4 shrink-0 text-[#C7A14C] mt-0.5" /><span>555 Montgomery Street<br />San Francisco, CA 94111</span></p>
              <p className="flex gap-2.5"><MapPin className="w-4 h-4 shrink-0 text-[#C7A14C] mt-0.5" /><span>2200 University Avenue<br />Palo Alto, CA 94301</span></p>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7C17A]">Start privately</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">Speak with an intake coordinator about your matter today.</p>
            <div className="mt-4 space-y-2.5 text-sm">
              <a className="flex items-center gap-2.5 font-semibold text-white hover:text-[#F5E9C8]" href="tel:+18005550199"><Phone className="w-4 h-4 text-[#C7A14C]" />(800) 555-0199</a>
              <a className="flex items-center gap-2.5 text-slate-400 hover:text-[#F5E9C8]" href="mailto:intake@vanguardsterling.law"><Mail className="w-4 h-4 text-[#C7A14C]" />intake@vanguardsterling.law</a>
            </div>
            <button onClick={onOpenScheduler} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#C7A14C] px-4 py-3 text-sm font-bold text-[#241B17] hover:bg-[#D7C17A] transition-colors">
              <Calendar className="w-4 h-4" /> Book a consultation <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5 text-[11px] text-slate-500">
          <p>(c) {new Date().getFullYear()} Apex Family Law. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2"><span>Attorney advertising</span><span>Privacy</span><span>Terms</span></div>
        </div>
      </div>
    </footer>
  );
};
