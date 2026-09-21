import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle, Phone, ShieldAlert } from 'lucide-react';
import { PRACTICE_AREAS } from '../data/legalData';
import { FAMILY_PRACTICE_AREAS } from '../data/familyLawData';

interface PracticeAreaDetailPageProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

export const PracticeAreaDetailPage: React.FC<PracticeAreaDetailPageProps> = ({
  onOpenScheduler
}) => {
  const { practiceAreaId } = useParams();
  const allPracticeAreas = [...FAMILY_PRACTICE_AREAS, ...PRACTICE_AREAS];
  const practiceArea = allPracticeAreas.find((pa) => pa.id === practiceAreaId) ?? FAMILY_PRACTICE_AREAS[0];

  if (!practiceArea) {
    return null;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
      <div className="mb-8">
        <Link
          to="/practice-areas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F6F2F] hover:text-[#41342E]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to practice areas
        </Link>
      </div>

      <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-[#41342E] px-6 py-8 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#708238]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#B3C08A]">
            <ShieldAlert className="w-3.5 h-3.5" />
            {practiceArea.recoveredTotal}
          </div>
          <h1 className="mt-4 font-serif-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {practiceArea.title}
          </h1>
          <p className="mt-3 max-w-3xl text-slate-300 text-base leading-relaxed">
            {practiceArea.tagline}
          </p>
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <section>
              <h2 className="font-serif-display text-2xl font-bold text-[#30251F]">Why this matters</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{practiceArea.shortDesc}</p>
            </section>

            <section>
              <h2 className="font-serif-display text-2xl font-bold text-[#30251F]">Strategic advantages</h2>
              <div className="mt-4 space-y-3">
                {practiceArea.strategicAdvantages.map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200 p-3">
                    <CheckCircle className="mt-0.5 w-5 h-5 text-[#708238] shrink-0" />
                    <p className="text-slate-700">{advantage}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif-display text-2xl font-bold text-[#30251F]">Common matters</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {practiceArea.typicalCases.map((caseType) => (
                  <li key={caseType} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
                    {caseType}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif-display text-2xl font-bold text-[#30251F]">Frequently asked questions</h2>
              <div className="mt-4 space-y-4">
                {practiceArea.faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-semibold text-[#30251F]">{faq.question}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-[#F7F3F1] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Fee structure</p>
              <p className="mt-2 text-sm text-slate-700">{practiceArea.feeStructure}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#F7F3F1] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Statute of limitations</p>
              <p className="mt-2 text-sm text-slate-700">{practiceArea.statuteOfLimitations}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#F7F3F1] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Lead attorney</p>
              <p className="mt-2 text-sm font-semibold text-[#30251F]">{practiceArea.leadAttorney}</p>
            </div>

            <div className="rounded-2xl border border-[#708238]/50 bg-[#E6EAD7] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#46521F]">Need a fast answer?</p>
              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={() => onOpenScheduler(practiceArea.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#708238] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#5F6F2F]"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule a review
                </button>
                <a
                  href="tel:+18005550199"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#708238] bg-white px-4 py-3 text-sm font-bold text-[#41342E]"
                >
                  <Phone className="w-4 h-4 text-[#708238]" />
                  Call (800) 555-0199
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
};
