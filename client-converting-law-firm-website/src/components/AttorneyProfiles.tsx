import React, { useState } from 'react';
import { Award, GraduationCap, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { ATTORNEYS } from '../data/legalData';
import { Attorney } from '../types';

interface AttorneyProfilesProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

export const AttorneyProfiles: React.FC<AttorneyProfilesProps> = ({
  onOpenScheduler
}) => {
  const [selectedAttorney, setSelectedAttorney] = useState<Attorney | null>(null);

  return (
    <section id="attorneys" className="py-16 bg-[#F7F3F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-[#41342E] text-[10px] font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#C7A14C]" />
            <span>Senior Trial Counsel</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#41342E] tracking-tight">
            Meet Our Partners
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {ATTORNEYS.map((at) => (
            <div
              key={at.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-72 w-full overflow-hidden bg-[#F7F3F1]">
                <img
                  src={at.image}
                  alt={at.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain object-top group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#41342E]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-[#C7A14C] text-[#241B17] text-[10px] font-bold shadow-sm">
                    {at.totalRecovered}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-200 bg-[#30251F]/75 px-2 py-0.5 rounded">
                    {at.experienceYears} yrs
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#41342E] leading-tight">
                    {at.name}
                  </h3>
                  <p className="text-[11px] text-[#7A6328] font-semibold mt-1">
                    {at.title}
                  </p>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-slate-600">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{at.education}</span>
                </div>

                <p className="text-[11px] text-slate-500 italic line-clamp-2">
                  “{at.quotes}”
                </p>
              </div>

              <div className="mt-auto p-3 border-t border-slate-100 bg-slate-50 flex items-center gap-2">
                <button
                  onClick={() => setSelectedAttorney(at)}
                  className="flex-1 py-2 text-[11px] font-semibold text-slate-700 hover:text-[#41342E] border border-slate-300 rounded-lg hover:bg-white transition-colors"
                >
                  Bio
                </button>
                <button
                  onClick={() => onOpenScheduler()}
                  className="flex-1 py-2 text-[11px] font-bold text-white bg-[#41342E] hover:bg-[#C7A14C] rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedAttorney && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#30251F]/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-5">
                <img
                  src={selectedAttorney.image}
                  alt={selectedAttorney.name}
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-contain object-top bg-[#F7F3F1] border border-slate-200 shrink-0"
                />
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F5E9C8] text-[#5F4B1F] text-xs font-bold">
                    {selectedAttorney.totalRecovered}
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#30251F]">
                    {selectedAttorney.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold">
                    {selectedAttorney.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedAttorney.education}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[#30251F] uppercase tracking-wider">
                  Biography
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedAttorney.bio}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs text-[#30251F] uppercase tracking-wider">
                  Honors &amp; Admissions
                </h4>
                <div className="space-y-1.5">
                  {selectedAttorney.awards.map((award, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-[#C7A14C] shrink-0" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedAttorney(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setSelectedAttorney(null);
                    onOpenScheduler();
                  }}
                  className="px-5 py-2.5 bg-[#C7A14C] hover:bg-[#B88A2D] text-white text-sm font-bold rounded-xl shadow flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Consult</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

