import { PracticeArea } from '../types';

export const FAMILY_PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'marital-relationship' as PracticeArea['id'],
    title: 'Marital & Relationship Law',
    shortDesc: 'Thoughtful agreements and counsel for the decisions that shape a family before, during, and after marriage.',
    tagline: 'Clarity before commitment.',
    iconName: 'HeartHandshake',
    recoveredTotal: 'Preventive counsel',
    keyWin: 'Prenuptial, postnuptial, annulment, and cohabitation planning',
    typicalCases: ['Prenuptial & postnuptial agreements', 'Annulments & cohabitation', 'Same-sex family law'],
    statuteOfLimitations: 'Deadlines vary by agreement and matter. Early advice protects options.',
    feeStructure: 'Transparent hourly or flat-fee planning options explained before work begins.',
    faqs: [],
    strategicAdvantages: ['Plain-English advice before conflict escalates.', 'Tax-aware drafting and negotiation.', 'Respectful counsel for every family structure.'],
    leadAttorney: 'Nathaniel Hayes, Esq.'
  },
  {
    id: 'divorce-property' as PracticeArea['id'],
    title: 'Divorce & Property Division',
    shortDesc: 'Strategic representation for contested, uncontested, and high-asset divorce with a focus on what comes next.',
    tagline: 'Protect the future you built.',
    iconName: 'Landmark',
    recoveredTotal: 'Asset-focused strategy',
    keyWin: 'Business valuation, QDRO, military, and high-net-worth divorce',
    typicalCases: ['High-net-worth divorce', 'Business valuation & QDROs', 'Military & complex divorce'],
    statuteOfLimitations: 'Financial disclosures and response deadlines can arrive quickly after filing.',
    feeStructure: 'Milestone-based retainers with regular, plain-language billing updates.',
    faqs: [],
    strategicAdvantages: ['Forensic tracing of businesses, equity, and digital assets.', 'Negotiation backed by trial readiness.', 'A practical plan for housing, cash flow, and transition.'],
    leadAttorney: 'Nathaniel Hayes, Esq.'
  },
  {
    id: 'children-custody' as PracticeArea['id'],
    title: 'Children & Custody Matters',
    shortDesc: 'Focused advocacy for custody, parenting plans, support, and the stability children need during change.',
    tagline: 'Steady guidance for growing families.',
    iconName: 'UsersRound',
    recoveredTotal: 'Child-centered counsel',
    keyWin: 'Interstate, international, and emergency custody advocacy',
    typicalCases: ['Legal & physical custody', 'Parenting plans', 'Child support enforcement'],
    statuteOfLimitations: 'Emergency custody and relocation issues may require action within days, not weeks.',
    feeStructure: 'Transparent retainers with urgent-response options for time-sensitive matters.',
    faqs: [],
    strategicAdvantages: ['Evidence-led parenting plans that work in real life.', 'Calm advocacy in high-conflict matters.', 'Coordination across jurisdictions when needed.'],
    leadAttorney: 'Victoria Vanguard, Esq.'
  },
  {
    id: 'adoption-guardianship' as PracticeArea['id'],
    title: 'Adoption, Paternity & Guardianship',
    shortDesc: 'Clear, compassionate guidance through the legal steps that create and protect a family.',
    tagline: 'Make family official.',
    iconName: 'HouseHeart',
    recoveredTotal: 'Family formation counsel',
    keyWin: 'Stepparent, agency, paternity, and guardianship matters',
    typicalCases: ['Stepparent & agency adoption', 'Paternity testing', 'Guardianships & termination of rights'],
    statuteOfLimitations: 'Consent, notice, and filing rules vary by case and should be reviewed early.',
    feeStructure: 'Flat-fee and staged representation options available for defined proceedings.',
    faqs: [],
    strategicAdvantages: ['Detailed preparation for every filing and hearing.', 'Respectful communication with all involved parties.', 'A clear roadmap from petition through final order.'],
    leadAttorney: 'Diana Thorne, Esq.'
  },
  {
    id: 'safety-dispute-resolution' as PracticeArea['id'],
    title: 'Safety, Protection & Resolution',
    shortDesc: 'Immediate legal protection and lower-conflict paths when safety, privacy, or a workable resolution is at stake.',
    tagline: 'Safety first. Strategy always.',
    iconName: 'ShieldCheck',
    recoveredTotal: 'Rapid response available',
    keyWin: 'Protection orders, emergency custody, mediation, and collaborative law',
    typicalCases: ['Domestic violence restraining orders', 'Emergency custody', 'Mediation & collaborative law'],
    statuteOfLimitations: 'Protection and emergency custody requests can be time-sensitive. Call for immediate triage.',
    feeStructure: 'Urgent filings and resolution services are scoped clearly before engagement.',
    faqs: [],
    strategicAdvantages: ['24/7 triage for immediate safety concerns.', 'Mediation when it serves the family, litigation when it does not.', 'Confidential planning around digital and physical privacy.'],
    leadAttorney: 'Victoria Vanguard, Esq.'
  }
];
