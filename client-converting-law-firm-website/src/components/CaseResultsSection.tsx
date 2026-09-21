import React, { useState, useEffect } from 'react';
import {
  Award,
  Filter,
  CheckCircle,
  Star,
  Quote,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { CaseResultItem } from '../types';
import { CASE_RESULTS, CLIENT_REVIEWS, TRUST_BADGES } from '../data/legalData';

interface CaseResultsSectionProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

export const CaseResultsSection: React.FC<CaseResultsSectionProps> = ({
  onOpenScheduler
}) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [results, setResults] = useState<CaseResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [expandedResultId, setExpandedResultId] = useState<string | null>(null);

  // Fetch results from backend /api/results
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const url = selectedFilter === 'all'
      ? '/api/results'
      : `/api/results?practiceArea=${encodeURIComponent(selectedFilter)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.results) {
          setResults(data.results.length > 0 ? data.results : CASE_RESULTS.filter((item) => selectedFilter === 'all' || item.practiceArea === selectedFilter));
        }
      })
      .catch((err) => {
        console.error('Failed to load case results from /api/results:', err);
        if (isMounted) {
          setResults(CASE_RESULTS.filter((item) => selectedFilter === 'all' || item.practiceArea === selectedFilter));
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedFilter]);

  const categories = [
    { id: 'all', label: 'All Results' },
    { id: 'personal-injury', label: 'Personal Injury' },
    { id: 'commercial-litigation', label: 'Commercial' },
    { id: 'employment-labor', label: 'Employment' },
    { id: 'medical-malpractice', label: 'Medical Malpractice' },
    { id: 'family-estate', label: 'Estate & Family' },
    { id: 'criminal-defense', label: 'White Collar Defense' }
  ];

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % CLIENT_REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length);
  };

  return (
    <section id="case-results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EAD7] text-[#46521F] text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-[#708238]" />
            <span>Documented Trial &amp; Settlement Record</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#41342E] tracking-tight">
            Over $185 Million Recovered
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Insurance carriers and corporate opponents know which law firms settle cheap and which fight to verdict. Here is our record.
          </p>
        </div>

        {/* Practice Area Filter Tabs */}
        <div className="mt-10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedFilter === cat.id
                  ? 'bg-[#41342E] text-[#87994B] shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Case Results Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-slate-50 animate-pulse space-y-4">
                <div className="h-8 bg-slate-200 rounded w-1/2" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-16 bg-slate-200 rounded" />
              </div>
            ))
          ) : results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden bg-slate-50 border rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${expandedResultId === item.id ? 'border-[#C7A14C] bg-[#fffdf8] shadow-lg' : 'border-slate-200 hover:border-[#C7A14C]/70 hover:-translate-y-1 hover:shadow-lg'}`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#C7A14C] transition-transform duration-300 group-hover:scale-x-100" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-display text-2xl sm:text-3xl font-extrabold text-[#B88A2D] transition-transform duration-300 group-hover:scale-[1.03]">
                      {item.amount}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-200/80 text-[#41342E] text-[11px] font-bold transition-colors duration-300 group-hover:bg-[#F5E9C8]">
                      {item.settlementType}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#30251F] text-base leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Category: {item.categoryName} - Concluded {item.year}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${expandedResultId === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="space-y-1.5 border-t border-slate-200/60 pt-3">
                      {item.keyDetails.map((kd, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-[#C7A14C] shrink-0" />
                          <span>{kd}</span>
                        </div>
                      ))}
                      <p className="pt-2 text-xs text-slate-500">Lead attorney: <strong className="text-[#41342E]">{item.leadAttorney}</strong></p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                  <button
                    type="button"
                    aria-expanded={expandedResultId === item.id}
                    onClick={() => setExpandedResultId((currentId) => currentId === item.id ? null : item.id)}
                    className="group/details inline-flex items-center gap-1 text-xs font-bold text-[#A87920] hover:text-[#41342E] transition-colors"
                  >
                    {expandedResultId === item.id ? 'Hide case details' : 'View case details'}
                    <ArrowRight className={`h-3.5 w-3.5 transition-transform duration-300 ${expandedResultId === item.id ? 'rotate-90' : 'group-hover/details:translate-x-1'}`} />
                  </button>
                  <button
                    onClick={() => onOpenScheduler(item.practiceArea)}
                    className="text-xs font-bold text-[#A87920] hover:text-[#41342E] flex items-center gap-1 transition-colors"
                  >
                    <span>Claim Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-500">
              No results found in this category.
            </div>
          )}
        </div>

        {/* Section 5 Component: Verified Google & Client Reviews Carousel */}
        <div id="reviews" className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center space-y-2 mb-10">
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#41342E]">
              What Our Clients Say
            </h3>
            <p className="text-sm text-slate-600">
              Verified independent reviews from clients whose futures were defended by our partners.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative bg-[#41342E] text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-6 right-8 text-[#41342E] opacity-30 pointer-events-none">
              <Quote className="w-24 h-24" />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Star Rating & Verified Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[#87994B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-slate-300 ml-2">5.0 Out of 5.0</span>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#41342E] border border-[#6A554B] text-[#87994B] text-xs font-semibold">
                  {CLIENT_REVIEWS[activeReviewIdx].verifiedSource}
                </span>
              </div>

              {/* Review Text */}
              <p className="font-serif-display text-lg sm:text-xl md:text-2xl text-slate-100 italic leading-relaxed">
                "{CLIENT_REVIEWS[activeReviewIdx].reviewText}"
              </p>

              {/* Client Info & Outcome Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#5A4840]">
                <div>
                  <h4 className="font-bold text-base text-slate-100">
                    {CLIENT_REVIEWS[activeReviewIdx].clientName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {CLIENT_REVIEWS[activeReviewIdx].role} - {CLIENT_REVIEWS[activeReviewIdx].practiceArea}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#708238]/20 text-[#B3C08A] text-xs font-bold">
                  <span>Outcome:</span>
                  <span>{CLIENT_REVIEWS[activeReviewIdx].outcomeTag}</span>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {CLIENT_REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReviewIdx(i)}
                    className={`h-2 rounded-full transition-all ${
                      activeReviewIdx === i ? 'w-6 bg-[#87994B]' : 'w-2 bg-[#5A4840]'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="p-2.5 rounded-full bg-[#41342E] hover:bg-[#5A4840] text-slate-200 transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextReview}
                  className="p-2.5 rounded-full bg-[#41342E] hover:bg-[#5A4840] text-slate-200 transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 Component: Trust & Media Badges */}
        <div className="mt-16 pt-10 border-t border-slate-100">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
            Accredited &amp; Honored by the Nation's Preeminent Legal Institutions
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TRUST_BADGES.map((b, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1 hover:border-[#87994B] transition-colors"
              >
                <div className="flex justify-center text-[#708238] mb-1">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <p className="font-bold text-xs text-[#30251F] line-clamp-1">{b.name}</p>
                <p className="text-[11px] text-slate-500 leading-tight">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



