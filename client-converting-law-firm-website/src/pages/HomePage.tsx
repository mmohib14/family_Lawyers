import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Calculator,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  HeartHandshake,
  HouseHeart,
  Landmark,
  LockKeyhole,
  MapPin,
  Phone,
  Scale,
  Search,
  ShieldCheck,
  Star,
  UsersRound
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FAMILY_PRACTICE_AREAS } from '../data/familyLawData';
import { ATTORNEYS, CLIENT_REVIEWS } from '../data/legalData';

interface HomePageProps {
  onOpenScheduler: () => void;
  onScrollToEligibility: () => void;
}

const pillarIcons = [HeartHandshake, Landmark, UsersRound, HouseHeart, ShieldCheck];
const faqItems = [
  ['Divorce', 'How long does a divorce take?', 'Every case is different. Uncontested matters can move quickly; contested financial or custody issues require a tailored plan.'],
  ['Custody', 'Can I change our parenting plan?', 'Yes. A significant change in circumstances or a child-centered reason may support a modification. We can help assess the facts.'],
  ['Fees', 'How much does a family lawyer cost?', 'You receive a clear engagement scope and billing expectations before work begins. We offer an initial confidential case evaluation.'],
  ['Process', 'What should I bring to a consultation?', 'Bring any court orders, financial statements, agreements, and a short timeline. Do not delay calling if safety is involved.']
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenScheduler }) => {
  const [faqCategory, setFaqCategory] = useState('All');
  const [faqOpen, setFaqOpen] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [income, setIncome] = useState(8500);
  const [nights, setNights] = useState(14);
  const [children, setChildren] = useState(2);
  const [statValues, setStatValues] = useState([0, 0, 0, 0]);
  const testimonialTouchStart = useRef<number | null>(null);

  const monthlySupport = Math.round(Math.max(0, income * 0.18 * children * (nights / 30)));
  const review = CLIENT_REVIEWS[reviewIndex % CLIENT_REVIEWS.length];
  const visibleFaqs = faqCategory === 'All' ? faqItems : faqItems.filter(([category]) => category === faqCategory);
  const handleReviewTouchEnd = (event: React.TouchEvent) => {
    if (testimonialTouchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - testimonialTouchStart.current;
    if (Math.abs(distance) > 45) {
      setReviewIndex((currentIndex) => (currentIndex + (distance < 0 ? 1 : -1) + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length);
    }
    testimonialTouchStart.current = null;
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setReviewIndex((currentIndex) => (currentIndex + 1) % CLIENT_REVIEWS.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    document.querySelectorAll('.apex-reveal').forEach((element) => revealObserver.observe(element));

    const counterTarget = document.querySelector('[data-counter-group]');
    let counterFrame = 0;
    const counterObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const targets = [30, 500, 24, 5];
      const startedAt = performance.now();
      const updateCounters = (now: number) => {
        const progress = Math.min((now - startedAt) / 900, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setStatValues(targets.map((target) => Math.round(target * eased)));
        if (progress < 1) counterFrame = window.requestAnimationFrame(updateCounters);
      };
      counterFrame = window.requestAnimationFrame(updateCounters);
      counterObserver.disconnect();
    }, { threshold: 0.35 });

    if (counterTarget) counterObserver.observe(counterTarget);
    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      if (counterFrame) window.cancelAnimationFrame(counterFrame);
    };
  }, []);

  return (
    <div className="bg-[#f6f3ef] text-[#28302f]">
      <section className="relative overflow-hidden bg-[#41342e] text-white">
        <div className="apex-hero-image absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=85')" }} aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#41342e_12%,rgba(65,52,46,.94)_48%,rgba(65,52,46,.58))]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="max-w-3xl self-center">
            <p className="apex-hero-enter mb-5 inline-flex items-center gap-2 border-l-2 border-[#d6a84d] pl-3 text-xs font-bold uppercase tracking-[.2em] text-[#f4d994]">Apex Family Law | Counsel with consequence</p>
            <h1 className="apex-hero-enter apex-hero-enter-delay-1 max-w-2xl font-serif-display text-2xl font-bold leading-[1.1] text-white sm:text-3xl lg:text-5xl"><span className="text-[#f4d994]">Protecting what matters most:</span> your family, your future, your peace of mind.</h1>
            <p className="apex-hero-enter apex-hero-enter-delay-1 mt-6 max-w-2xl text-base leading-7 text-[#d9e2df] sm:text-lg">Backed by over 30 years of trial-tested advocacy in complex divorces, child custody disputes, and high-asset division.</p>
            <div className="apex-hero-enter apex-hero-enter-delay-2 mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-[#eef4ed] sm:text-sm">
              {['Available 24/7', 'Free confidential consultation', "Rated 'Best Lawyers 2026'", '500+ 5-star reviews'].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#d6a84d]" />{item}</span>)}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={onOpenScheduler} className="gold-cta apex-cta inline-flex items-center justify-center gap-2 bg-[#d6a84d] px-6 py-3.5 text-sm font-bold text-[#41342e] transition hover:bg-[#f0ce75]">Free Case Evaluation <ArrowRight className="h-4 w-4" /></button>
              <a href="tel:+18005550199" className="inline-flex items-center justify-center gap-2 border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"><Phone className="h-4 w-4" /> Call Now: (800) 555-FAMILY</a>
            </div>
          </div>
          <div className="apex-hero-panel relative min-h-[430px] self-end overflow-hidden border border-[#d6a84d]/50 bg-[#41342e]/95 shadow-2xl backdrop-blur-sm sm:min-h-[470px]">
            <div className="grid h-full sm:grid-cols-[1.15fr_.85fr]">
              <div className="relative z-10 p-7 sm:p-10"><div className="flex items-start justify-between gap-4 border-b border-white/15 pb-6"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#f4d994]">Your next right step</p><h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">A clear plan starts here.</h2></div><Scale className="h-8 w-8 shrink-0 text-[#d6a84d]" /></div>
            <div className="space-y-5 py-6 text-sm text-[#d9e2df]"><div className="flex gap-3"><span className="text-[#d6a84d]">01</span><p>Tell us what is happening, in your own words.</p></div><div className="flex gap-3"><span className="text-[#d6a84d]">02</span><p>Get matched with the right family-law attorney.</p></div><div className="flex gap-3"><span className="text-[#d6a84d]">03</span><p>Leave with practical options, not more uncertainty.</p></div></div>
            <button onClick={onOpenScheduler} className="apex-gold-pulse w-full border border-[#d6a84d] px-4 py-3 text-sm font-bold text-[#d6a84d] transition hover:bg-[#d6a84d] hover:text-[#41342e]">Start a confidential intake</button>
            <p className="mt-4 flex items-center gap-2 text-xs text-[#9fb4b0]"><LockKeyhole className="h-3.5 w-3.5" /> Your information is treated as confidential.</p></div>
              <div className="relative min-h-[260px] overflow-hidden sm:min-h-0"><img src={ATTORNEYS[0].image} alt={ATTORNEYS[0].name} className="absolute inset-0 h-full w-full object-cover object-top" /><div className="absolute inset-0 bg-gradient-to-r from-[#41342e]/35 via-transparent to-[#241b17]/10" /><div className="absolute bottom-5 left-5 border-l-2 border-[#d6a84d] pl-3 text-xs text-white/90"><p className="font-bold">Victoria Vanguard, Esq.</p><p className="mt-1 text-[#f4d994]">Senior family-law counsel</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d9d5ce] bg-[#f6f3ef] py-5 sm:py-7" data-counter-group aria-label="Apex Family Law trust metrics"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-6 lg:px-8"><div className="apex-reveal apex-card border-t-2 border-[#d6a84d] bg-white px-4 py-4 shadow-sm sm:px-5"><div className="flex items-start justify-between"><div><p className="text-2xl font-bold text-[#41342e]">{statValues[0]}+</p><p className="mt-1 text-xs font-medium text-slate-500">Years advocating for families</p></div><Scale className="h-5 w-5 text-[#b88a2d]" /></div><div className="mt-4 h-1 w-10 bg-[#d6a84d]" /></div><div className="apex-reveal apex-card border-t-2 border-[#d6a84d] bg-white px-4 py-4 shadow-sm sm:px-5" style={{ transitionDelay: '80ms' }}><div className="flex items-start justify-between"><div><p className="text-2xl font-bold text-[#41342e]">{statValues[1]}+</p><p className="mt-1 text-xs font-medium text-slate-500">Verified 5-star reviews</p></div><Star className="h-5 w-5 fill-[#d6a84d] text-[#b88a2d]" /></div><div className="mt-4 h-1 w-10 bg-[#d6a84d]" /></div><div className="apex-reveal apex-card border-t-2 border-[#d6a84d] bg-white px-4 py-4 shadow-sm sm:px-5" style={{ transitionDelay: '160ms' }}><div className="flex items-start justify-between"><div><p className="text-2xl font-bold text-[#41342e]">{statValues[2]}/7</p><p className="mt-1 text-xs font-medium text-slate-500">Confidential response line</p></div><Phone className="h-5 w-5 text-[#b88a2d]" /></div><div className="mt-4 h-1 w-10 bg-[#d6a84d]" /></div><div className="apex-reveal apex-card border-t-2 border-[#d6a84d] bg-white px-4 py-4 shadow-sm sm:px-5" style={{ transitionDelay: '240ms' }}><div className="flex items-start justify-between"><div><p className="text-2xl font-bold text-[#41342e]">{statValues[3]}.0</p><p className="mt-1 text-xs font-medium text-slate-500">Average client rating</p></div><BadgeCheck className="h-5 w-5 text-[#b88a2d]" /></div><div className="mt-4 h-1 w-10 bg-[#d6a84d]" /></div></div></section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" id="practice-areas">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a87920]">Focused family-law counsel</p><h2 className="mt-3 text-3xl font-bold text-[#173b3b] sm:text-4xl">The right depth for the moment you are in.</h2><p className="mt-4 leading-7 text-slate-600">Family law is personal. Our practice is deliberately focused so your advice is specific, strategic, and grounded in the life you are trying to protect.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {FAMILY_PRACTICE_AREAS.map((pillar, index) => { const Icon = pillarIcons[index]; return <article key={pillar.id} data-reveal className="apex-reveal apex-card flex min-h-[330px] flex-col border border-[#d9d5ce] bg-white p-6 transition hover:-translate-y-1 hover:border-[#d6a84d] hover:bg-[#fffdf9]" style={{ transitionDelay: `${index * 80}ms` }}><Icon className="h-7 w-7 text-[#a87920]" /><h3 className="mt-8 text-lg font-bold leading-6 text-[#173b3b]">{pillar.title}</h3><p className="mt-3 flex-1 text-xs leading-5 text-slate-600">{pillar.shortDesc}</p><Link to={`/practice-areas/${pillar.id}`} className="apex-card-arrow mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#173b3b]">Explore practice <ArrowRight className="h-4 w-4 text-[#a87920]" /></Link></article>; })}
        </div>
      </section>

      <section className="bg-[#e8ede8]" id="tools"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a87920]">Private planning tools</p><h2 className="mt-3 text-3xl font-bold text-[#173b3b]">A little clarity can change the next conversation.</h2><p className="mt-4 leading-7 text-slate-600">Use these starting points to organize your questions before speaking with counsel. They are educational estimates, not legal advice.</p><div className="mt-8 border border-[#c8d5ce] bg-white p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-[#a87920]">Child support estimator</p><h3 className="mt-1 text-xl font-bold text-[#173b3b]">A working estimate for planning</h3></div><Calculator className="h-6 w-6 text-[#a87920]" /></div><div className="mt-6 space-y-5"><label className="block text-sm font-semibold text-slate-700">Combined monthly income <span className="float-right font-bold text-[#173b3b]">${income.toLocaleString()}</span><input type="range" min="3000" max="25000" step="500" value={income} onChange={(event) => setIncome(Number(event.target.value))} className="mt-3 w-full accent-[#a87920]" /></label><label className="block text-sm font-semibold text-slate-700">Overnights with paying parent <span className="float-right font-bold text-[#173b3b]">{nights} nights</span><input type="range" min="0" max="28" value={nights} onChange={(event) => setNights(Number(event.target.value))} className="mt-3 w-full accent-[#a87920]" /></label><label className="block text-sm font-semibold text-slate-700">Children <span className="float-right font-bold text-[#173b3b]">{children}</span><input type="range" min="1" max="5" value={children} onChange={(event) => setChildren(Number(event.target.value))} className="mt-3 w-full accent-[#a87920]" /></label></div><div className="mt-7 flex items-end justify-between border-t border-slate-200 pt-5"><div><p className="text-xs text-slate-500">Illustrative monthly estimate</p><p className="mt-1 text-3xl font-bold text-[#173b3b]">${monthlySupport.toLocaleString()}</p></div><button onClick={onOpenScheduler} className="text-xs font-bold text-[#a87920] underline underline-offset-4">Discuss your numbers</button></div></div></div>
        <div className="space-y-5"><div className="border border-[#c8d5ce] bg-[#173b3b] p-7 text-white"><Download className="h-6 w-6 text-[#f4d994]" /><h3 className="mt-5 text-2xl font-bold text-[#fff7e6]">10-Step Pre-Divorce Financial &amp; Legal Prep Checklist</h3><p className="mt-3 text-sm leading-6 text-[#d9e2df]">A private, practical download to help you gather documents, protect access, and prepare better questions.</p><button onClick={onOpenScheduler} className="mt-6 inline-flex items-center gap-2 border border-[#f4d994] px-4 py-3 text-sm font-bold text-[#f4d994]">Get the checklist <ArrowRight className="h-4 w-4" /></button></div><div className="border border-[#c8d5ce] bg-white p-7"><div className="flex items-center gap-3"><Search className="h-5 w-5 text-[#a87920]" /><h3 className="text-xl font-bold text-[#173b3b]">Search family-law answers</h3></div><div className="mt-5 flex border border-slate-300"><input aria-label="Search FAQs" placeholder="Search divorce, custody, fees..." className="min-w-0 flex-1 px-3 py-3 text-sm outline-none" /><button aria-label="Search FAQs" className="bg-[#173b3b] px-4 text-white"><Search className="h-4 w-4" /></button></div><div className="mt-4 flex flex-wrap gap-2">{['All', 'Divorce', 'Custody', 'Fees', 'Process'].map((category) => <button key={category} onClick={() => setFaqCategory(category)} className={`px-3 py-1.5 text-xs font-bold ${faqCategory === category ? 'bg-[#d6a84d] text-[#173b3b]' : 'bg-[#edf0ed] text-slate-600'}`}>{category}</button>)}</div><div className="mt-4 divide-y divide-slate-200">{visibleFaqs.map(([category, question, answer], index) => <div key={question} className="py-3"><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold text-[#173b3b]"><span>{question}</span><ChevronDown className={`h-4 w-4 transition ${faqOpen === index ? 'rotate-180' : ''}`} /></button>{faqOpen === index && <p className="mt-2 text-xs leading-5 text-slate-600">{answer}</p>}</div>)}</div></div></div>
      </div></section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a87920]">Independent trust signals</p><h2 className="mt-3 text-3xl font-bold text-[#173b3b]">Authority you can verify.</h2><p className="mt-4 leading-7 text-slate-600">Credentials matter when the stakes are personal. We make our experience, reviews, and approach easy to evaluate before you ever call.</p><div className="mt-7 grid grid-cols-2 gap-3 text-xs font-bold text-[#173b3b]"><div className="flex items-center gap-2 border border-[#d9d5ce] bg-white p-4"><BadgeCheck className="h-5 w-5 text-[#a87920]" /> Super Lawyers</div><div className="flex items-center gap-2 border border-[#d9d5ce] bg-white p-4"><BadgeCheck className="h-5 w-5 text-[#a87920]" /> Best Lawyers 2026</div><div className="flex items-center gap-2 border border-[#d9d5ce] bg-white p-4"><BadgeCheck className="h-5 w-5 text-[#a87920]" /> Justia Platinum</div><div className="flex items-center gap-2 border border-[#d9d5ce] bg-white p-4"><BadgeCheck className="h-5 w-5 text-[#a87920]" /> State Bar certified</div></div></div><div key={review.id} onTouchStart={(event) => { testimonialTouchStart.current = event.touches[0].clientX; }} onTouchEnd={handleReviewTouchEnd} className="apex-testimonial-enter border-l-2 border-[#d6a84d] bg-[#41342e] p-7 shadow-sm sm:p-10"><div className="flex items-center justify-between gap-4"><div className="flex gap-1 text-[#d6a84d]">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div><span className="text-xs font-bold text-[#a87920]">{review.verifiedSource}</span></div><blockquote className="mt-6 text-xl font-medium leading-8 text-white">“{review.reviewText}”</blockquote><div className="mt-7 flex items-end justify-between gap-4 border-t border-slate-200 pt-5"><div><p className="text-sm font-bold text-white">{review.clientName}</p><p className="text-xs text-slate-500">{review.role}</p></div><div className="flex gap-2"><button aria-label="Previous review" onClick={() => setReviewIndex((reviewIndex - 1 + CLIENT_REVIEWS.length) % CLIENT_REVIEWS.length)} className="border border-slate-300 p-2"><ChevronLeft className="h-4 w-4" /></button><button aria-label="Next review" onClick={() => setReviewIndex((reviewIndex + 1) % CLIENT_REVIEWS.length)} className="border border-slate-300 p-2"><ChevronRight className="h-4 w-4" /></button></div></div></div></div><div className="mt-12 border-t border-[#d9d5ce] pt-10"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a87920]">Selected case successes</p><div className="mt-5 grid gap-4 md:grid-cols-3"><div className="bg-[#173b3b] p-6 text-white"><Banknote className="h-5 w-5 text-[#f4d994]" /><p className="mt-5 text-2xl font-bold">Interstate custody</p><p className="mt-2 text-sm leading-6 text-[#c7d6d2]">Secured the safe return of a child and a durable cross-state parenting plan.</p></div><div className="bg-white p-6"><Landmark className="h-5 w-5 text-[#a87920]" /><p className="mt-5 text-2xl font-bold text-[#173b3b]">High-asset division</p><p className="mt-2 text-sm leading-6 text-slate-600">Protected a founder's business interests through valuation, tracing, and negotiated offsets.</p></div><div className="bg-white p-6"><ShieldCheck className="h-5 w-5 text-[#a87920]" /><p className="mt-5 text-2xl font-bold text-[#173b3b]">Safety first</p><p className="mt-2 text-sm leading-6 text-slate-600">Obtained emergency protective orders and a stable custody framework under pressure.</p></div></div></div></section>

      <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a87920]">The people behind the strategy</p><h2 className="mt-3 text-3xl font-bold text-[#173b3b]">Senior counsel, present from day one.</h2></div><Link to="/attorneys" className="inline-flex items-center gap-2 text-sm font-bold text-[#173b3b]">Meet the full team <ArrowRight className="h-4 w-4 text-[#a87920]" /></Link></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{ATTORNEYS.slice(0, 4).map((attorney) => <article key={attorney.id} className="border border-[#d9d5ce] bg-[#f6f3ef]"><img src={attorney.image} alt={attorney.name} className="h-56 w-full object-cover object-top" /><div className="p-5"><h3 className="text-lg font-bold text-[#173b3b]">{attorney.name}</h3><p className="mt-1 text-xs font-semibold text-[#a87920]">{attorney.title}</p><p className="mt-4 text-xs leading-5 text-slate-600">{attorney.specialties.slice(0, 2).join(' | ')}</p><p className="mt-4 border-t border-[#d9d5ce] pt-4 text-[11px] leading-5 text-slate-500">{attorney.admissions.slice(0, 2).join(' | ')}</p></div></article>)}</div></div></section>

      <section className="bg-[#d6a84d]" id="contact"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#173b3b]">Apex Family Law</p><h2 className="mt-2 text-3xl font-bold text-[#173b3b]">A steady voice for your next decision.</h2><p className="mt-2 max-w-2xl text-sm text-[#365451]">Call our confidential 24/7 answering service or request a free case evaluation. Attorney advertising. Prior results do not guarantee a similar outcome.</p><div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-[#173b3b]"><span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" />(800) 555-FAMILY</span><span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" />San Francisco | Palo Alto</span></div></div><button onClick={onOpenScheduler} className="inline-flex items-center justify-center gap-2 bg-[#173b3b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#285d5a]">Schedule free evaluation <ArrowRight className="h-4 w-4" /></button></div></section>
    </div>
  );
};

