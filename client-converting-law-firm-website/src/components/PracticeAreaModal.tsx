import React from 'react';
import { X, ShieldCheck, AlertTriangle, Calendar, Phone, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { PracticeArea } from '../types';

interface PracticeAreaModalProps {
  practiceArea: PracticeArea | null;
  onClose: () => void;
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

export const PracticeAreaModal: React.FC<PracticeAreaModalProps> = ({
  practiceArea,
  onClose,
  onOpenScheduler
}) => {
  if (!practiceArea) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#30251F]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header with Dark Navy Background */}
        <div className="bg-[#41342E] text-white p-6 sm:p-8 flex items-start justify-between relative">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#708238]/20 border border-[#708238]/30 text-[#B3C08A] text-xs font-semibold">
              <span>{practiceArea.recoveredTotal}</span>
              <span>-</span>
              <span>Lead: {practiceArea.leadAttorney}</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-50">
              {practiceArea.title}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {practiceArea.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-[#41342E]/80 hover:bg-[#41342E] transition-colors"
            aria-label="Close practice area view"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-700">
          {/* Critical Warnings / Statute of Limitations Strip */}
          <div className="p-4 rounded-xl bg-[#F1F3E8] border border-[#D5DDBB] flex items-start gap-3.5 text-[#46521F] text-sm">
            <AlertTriangle className="w-5 h-5 text-[#708238] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#384317]">Statute of Limitations Warning:</p>
              <p className="mt-0.5 text-[#53632A]">{practiceArea.statuteOfLimitations}</p>
              <p className="text-xs text-[#5F6F2F] mt-1">Delaying legal action may forfeit your right to financial compensation under state civil codes.</p>
            </div>
          </div>

          {/* Fee Structure Guarantee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Fee Structure &amp; Guarantee
              </p>
              <p className="text-sm font-semibold text-[#30251F] mt-1">
                {practiceArea.feeStructure}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Benchmark Victory
              </p>
              <p className="text-sm font-bold text-[#5F6F2F] mt-1">
                {practiceArea.keyWin}
              </p>
            </div>
          </div>

          {/* Strategic Advantages Section */}
          <div className="space-y-3">
            <h3 className="font-serif-display text-lg font-bold text-[#30251F] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#708238]" />
              <span>Why Vanguard &amp; Sterling Wins in This Specialty</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {practiceArea.strategicAdvantages.map((adv, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle className="w-4 h-4 text-[#5F6F2F] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{adv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Types of Matters Handled */}
          <div className="space-y-3">
            <h3 className="font-serif-display text-lg font-bold text-[#30251F]">
              Representative Matters Handled
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {practiceArea.typicalCases.map((tc, idx) => (
                <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium">
                  - {tc}
                </div>
              ))}
            </div>
          </div>

          {/* Practice Area FAQs */}
          <div className="space-y-4">
            <h3 className="font-serif-display text-lg font-bold text-[#30251F] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#708238]" />
              <span>Frequently Asked Questions</span>
            </h3>
            <div className="space-y-3">
              {practiceArea.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <p className="font-bold text-[#30251F] text-sm">
                    {faq.question}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTAs with High-Conversion Focus */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span>Confidential review with lead partner: </span>
            <span className="font-semibold text-[#41342E]">{practiceArea.leadAttorney}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="tel:+18005550199"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-[#41342E] text-sm font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#708238]" />
              <span>(800) 555-0199</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenScheduler(practiceArea.id);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#708238] hover:bg-[#5F6F2F] text-white text-sm font-bold shadow transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Case Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



