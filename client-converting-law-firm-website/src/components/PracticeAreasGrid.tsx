import React from 'react';
import {
  ShieldAlert,
  Briefcase,
  Scale,
  Activity,
  Building,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { PRACTICE_AREAS } from '../data/legalData';
import { PracticeArea } from '../types';

interface PracticeAreasGridProps {
  onOpenPracticeArea: (id: string) => void;
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'ShieldAlert':
      return <ShieldAlert className="w-7 h-7 text-[#708238]" />;
    case 'Briefcase':
      return <Briefcase className="w-7 h-7 text-[#708238]" />;
    case 'Scale':
      return <Scale className="w-7 h-7 text-[#708238]" />;
    case 'Activity':
      return <Activity className="w-7 h-7 text-[#708238]" />;
    case 'Building':
      return <Building className="w-7 h-7 text-[#708238]" />;
    case 'ShieldCheck':
    default:
      return <ShieldCheck className="w-7 h-7 text-[#708238]" />;
  }
};

export const PracticeAreasGrid: React.FC<PracticeAreasGridProps> = ({
  onOpenPracticeArea,
  onOpenScheduler
}) => {
  return (
    <section id="practice-areas" className="py-20 bg-[#F7F3F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#708238]" />
            <span>Uncompromising Trial Representation</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#41342E] tracking-tight">
            Select Your Legal Specialty
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Our trial attorneys do not dabble. Each department is directed by seasoned partners who have secured landmark verdicts in federal and state courts.
          </p>
        </div>

        {/* 6 Specialty Cards Grid */}
        <div className="mt-14 grid items-stretch grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((pa: PracticeArea) => (
            <div
              key={pa.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:border-[#708238]/50 hover:shadow-xl"
            >
              {/* Subtle top indicator bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#D9D0CA] via-[#D1AF5C] to-[#D9D0CA] group-hover:from-[#C7A14C] group-hover:to-[#B88A2D] transition-all duration-300" />

              <div className="flex flex-1 flex-col space-y-5 p-7">
                <div className="flex min-h-14 items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200/80 group-hover:bg-[#C7A14C]/10 group-hover:border-[#C7A14C]/30 flex items-center justify-center transition-colors">
                    {getIcon(pa.iconName)}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-[#41342E] text-xs font-bold tracking-wide">
                    {pa.recoveredTotal}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#41342E] group-hover:text-[#7A6328] transition-colors">
                    {pa.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {pa.shortDesc}
                  </p>
                </div>

                {/* Key Landmark Result Highlight */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Benchmark Result
                  </span>
                  <span className="text-xs font-semibold text-[#41342E] line-clamp-1 mt-0.5">
                    {pa.keyWin}
                  </span>
                </div>

                {/* Typical Cases Tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Common Matters:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pa.typicalCases.slice(0, 2).map((tc, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                      >
                        {tc}
                      </span>
                    ))}
                    <span className="text-[11px] font-medium text-[#5F6F2F] px-1 py-1">
                      +{pa.typicalCases.length - 2} more
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  id={`view-deep-dive-${pa.id}`}
                  onClick={() => onOpenPracticeArea(pa.id)}
                  className="text-xs font-bold text-slate-700 hover:text-[#7A6328] flex items-center gap-1 transition-colors"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  id={`consult-practice-${pa.id}`}
                  onClick={() => onOpenScheduler(pa.id)}
                  className="px-3.5 py-2 rounded-lg bg-[#41342E] group-hover:bg-[#C7A14C] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Immediate Assistance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="font-serif-display font-bold text-lg text-[#30251F]">
              Not sure which legal practice area fits your exact circumstance?
            </h4>
            <p className="text-slate-600 text-sm mt-0.5">
              Take our 60-second interactive eligibility assessment or connect directly with our 24/7 legal triage coordinator.
            </p>
          </div>
          <button
            onClick={() => onOpenScheduler()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#708238] hover:bg-[#5F6F2F] text-white font-bold text-sm transition-colors shrink-0 shadow-sm"
          >
            Speak With an Attorney Now
          </button>
        </div>
      </div>
    </section>
  );
};



