import { PracticeArea, Attorney, ClientReview } from '../types';

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'personal-injury',
    title: 'Personal Injury & Catastrophic Accidents',
    shortDesc: 'Relentless trial advocacy for victims of commercial truck crashes, vehicular collisions, and traumatic spinal or brain injuries.',
    tagline: 'Zero Upfront Legal Fees. Maximum Lifetime Recovery.',
    iconName: 'ShieldAlert',
    recoveredTotal: '$74M+ Recovered',
    keyWin: '$14.85M Trucking Collision Settlement',
    statuteOfLimitations: 'Typically 2 years from incident date in California (statute may shorten for municipal entities).',
    feeStructure: '100% Contingency Fee ("No Win, No Fee Guarantee"). If we do not win compensation, you owe us nothing.',
    typicalCases: [
      'Commercial Freight & Semi-Truck Collisions',
      'Traumatic Brain (TBI) & Spinal Cord Severance',
      'Rideshare & Highway Multi-Vehicle Pileups',
      'Wrongful Death & Loss of Consortium Claims',
      'Catastrophic Workplace & Industrial Accidents'
    ],
    strategicAdvantages: [
      'Immediate deployment of accident reconstruction forensic engineers within 24 hours.',
      'Access to top independent medical life-care planners to calculate future lifetime care expenses.',
      'Battle-tested courtroom litigators who prepare every claim as if going to full jury trial.'
    ],
    faqs: [
      {
        question: 'What if the insurance adjuster offers me a quick settlement check?',
        answer: 'Never sign a release or cash an initial check without counsel. Early offers are designed to cap your recovery before the true long-term medical prognosis and lifetime loss of income can be determined.'
      },
      {
        question: 'How much does it cost to retain Vanguard & Sterling for my injury?',
        answer: 'Zero out-of-pocket costs. We advance all investigation costs, deposition fees, and expert medical retainers. We only receive a percentage if and when we win compensation.'
      }
    ],
    leadAttorney: 'Victoria Vanguard, Esq.'
  },
  {
    id: 'commercial-litigation',
    title: 'Commercial & High-Stakes Business Litigation',
    shortDesc: 'Aggressive prosecution and defense of breach of contract, shareholder oppression, trade secret theft, and corporate fraud.',
    tagline: 'Defending Enterprise Capital & Shareholder Value.',
    iconName: 'Briefcase',
    recoveredTotal: '$62M+ Recovered',
    keyWin: '$22.4M Federal Trade Secret Misappropriation Verdict',
    statuteOfLimitations: 'Typically 4 years for written contracts; 3 years for fraud / trade secret discovery.',
    feeStructure: 'Flexible Fee Structures: Hybrid Contingency, Milestone Retainers, or Competitive Hourly Rates.',
    typicalCases: [
      'Breach of Complex Commercial Agreements & Supply Chains',
      'Misappropriation of Algorithmic & Proprietary Trade Secrets',
      'Shareholder, Partnership, & Founder Freeze-Out Disputes',
      'Fiduciary Duty Breaches & Corporate Governance Claims',
      'Emergency Temporary Restraining Orders (TRO) & Injunctions'
    ],
    strategicAdvantages: [
      'Deep forensic financial modeling led by former Big Four forensic accountants.',
      'Track record in federal and state trial courts across the Western United States.',
      'Decisive TRO capabilities to halt irreparable competitive damage within 48 hours.'
    ],
    faqs: [
      {
        question: 'Can we stop a former executive from using our customer lists immediately?',
        answer: 'Yes. We frequently file emergency ex-parte motions for Temporary Restraining Orders (TROs) and preliminary injunctions to lock down compromised trade data.'
      },
      {
        question: 'Do you represent both plaintiffs and defense in business disputes?',
        answer: 'Yes. Our dual-perspective trial experience gives our clients distinct leverage in predicting opposing counsel maneuvers.'
      }
    ],
    leadAttorney: 'Marcus Sterling, Esq.'
  },
  {
    id: 'employment-labor',
    title: 'Executive Employment & Wrongful Termination',
    shortDesc: 'Championing executives and workers facing whistleblower retaliation, executive severance suppression, and systematic wage violations.',
    tagline: 'Protecting Executive Reputation & Career Equity.',
    iconName: 'Scale',
    recoveredTotal: '$28M+ Recovered',
    keyWin: '$6.25M SEC Compliance Whistleblower Award',
    statuteOfLimitations: 'Typically 3 years with the California Civil Rights Department (CRD) or 180-300 days with the EEOC.',
    feeStructure: 'Contingency or Hybrid Retainer for Executive Package Negotiations.',
    typicalCases: [
      'Whistleblower Retaliation (Sarbanes-Oxley, Dodd-Frank, Labor Code 1102.5)',
      'Executive Severance & Equity Acceleration Negotiation',
      'C-Suite Wrongful Termination & Constructive Discharge',
      'Hostile Work Environment & Systemic Harassment',
      'Non-Compete & Restrictive Covenant Invalidation'
    ],
    strategicAdvantages: [
      'Subpoena power to preserve incriminating Slack, email, and audit logs before corporate spoliation.',
      'Uncompromising stance against corporate mandatory arbitration silencing clauses.',
      'Discrete reputation management preserving future executive board viability.'
    ],
    faqs: [
      {
        question: 'I was offered a severance package. Can I negotiate for more?',
        answer: 'Almost always. Companies offer standard packages in exchange for total liability waivers. If you possess viable claims for wrongful termination or retaliation, leverage significantly multiplies.'
      },
      {
        question: 'What if I signed a mandatory arbitration agreement when hired?',
        answer: 'Many arbitration clauses contain legal defects or violate recent statutory reforms (such as the Ending Forced Arbitration of Sexual Assault and Sexual Harassment Act). We routinely challenge overreaching agreements.'
      }
    ],
    leadAttorney: 'Diana Thorne, Esq.'
  },
  {
    id: 'medical-malpractice',
    title: 'Medical Malpractice & Hospital Negligence',
    shortDesc: 'Holding healthcare systems accountable for diagnostic failures, surgical errors, birth trauma, and pharmaceutical oversights.',
    tagline: 'Relentless Truth for Preventable Medical Tragedies.',
    iconName: 'Activity',
    recoveredTotal: '$35M+ Recovered',
    keyWin: '$9.1M Delayed Aortic Dissection Diagnosis Settlement',
    statuteOfLimitations: 'California MICRA statutes generally require action within 1 year from discovery or 3 years from injury date.',
    feeStructure: 'Contingency Fee pursuant to California MICRA statutory guidelines (AB 35 reform compliant).',
    typicalCases: [
      'Misdiagnosis or Delayed Diagnosis of Cancer & Acute Vascular Events',
      'Surgical Errors, Anesthesia Complications, & Foreign Body Retention',
      'Labor & Delivery Malpractice Resulting in Cerebral Palsy or HIE',
      'Emergency Department Premature Discharge & Negligent Triage',
      'Hospital-Acquired Sepsis & Critical Medication Overdoses'
    ],
    strategicAdvantages: [
      'Board-certified physician consulting network across cardiology, neurosurgery, and obstetrics.',
      'Meticulous electronic medical record (EMR) audit trail interrogation to uncover altered charting.',
      'Compassionate family-first advocacy handling all insurance bureaucracy.'
    ],
    faqs: [
      {
        question: 'How do I know if my medical injury was malpractice or just an unavoidable complication?',
        answer: 'Our in-house nurse consultants and independent physician experts review your full records against standard-of-care benchmarks to give you an objective, honest determination.'
      },
      {
        question: 'What is the California MICRA cap on non-economic damages?',
        answer: 'Under recent legislative reform (AB 35), previous caps were dramatically increased (currently up to $400,000+ for non-death claims and $500,000+ for wrongful death, scaling annually). Economic damages (medical bills, lost earnings) remain 100% uncapped.'
      }
    ],
    leadAttorney: 'Victoria Vanguard, Esq.'
  },
  {
    id: 'family-estate',
    title: 'High-Net-Worth Family Law & Trust Litigation',
    shortDesc: 'Strategic representation in multi-asset marital dissolution, fiduciary trust disputes, and family business valuation.',
    tagline: 'Discretion, Asset Preservation & Fiduciary Defense.',
    iconName: 'Building',
    recoveredTotal: '$42M+ Preserved',
    keyWin: '$18.5M Offshore Trust & Business Entity Protection',
    statuteOfLimitations: 'Varies by petition type; fiduciary breaches must generally be brought within 3 years of accounting disclosure.',
    feeStructure: 'Structured Retainer with Transparent Accounting & Milestone Billing.',
    typicalCases: [
      'Complex Marital Dissolution Involving Private Equity & Tech Equities',
      'Contested Trust Admin, Trustee Surcharge, & Will Contests',
      'Pre-Nuptial & Post-Nuptial Asset Shielding Agreements',
      'Interstate & International Custody Jurisdictional Disputes',
      'Close Corporation Valuation & Buyout Litigation'
    ],
    strategicAdvantages: [
      'Forensic tracing of undisclosed cryptocurrency holdings, offshore trusts, and private equity profits.',
      'Absolute confidentiality protocols protecting private family wealth and public visibility.',
      'Collaborative mediation paths backed by ironclad trial preparedness if negotiations stall.'
    ],
    faqs: [
      {
        question: 'How are unvested RSUs and stock options divided in high-asset divorces?',
        answer: 'We utilize Nelson and Hug formula allocations combined with market forecasting to structure optimal asset offsets while minimizing capital gains liabilities.'
      },
      {
        question: 'Can a trustee be removed for refusing to distribute trust funds?',
        answer: 'Yes. Trustees hold strict fiduciary duties. If a trustee is self-dealing, withholding mandatory income, or refusing accountings, courts can remove them and impose surcharge penalties.'
      }
    ],
    leadAttorney: 'Nathaniel Hayes, Esq.'
  },
  {
    id: 'criminal-defense',
    title: 'White Collar & Regulatory Enforcement Defense',
    shortDesc: 'Formidable defense against DOJ, SEC, FINRA, and state attorney general investigations, wire fraud, and grand jury subpoenas.',
    tagline: 'Protecting Liberty, Reputation & Corporate Standing.',
    iconName: 'ShieldCheck',
    recoveredTotal: '100% Dismissal Records',
    keyWin: 'Complete Dismissal of 18 Federal Fraud Indictments',
    statuteOfLimitations: 'Varies by federal code (typically 5 to 10 years for specific financial and tax statutes).',
    feeStructure: 'Flat Phase-Based Defense Retainers or Tailored Corporate Retainers.',
    typicalCases: [
      'Federal Wire, Mail, & Securities Fraud Indictments',
      'DOJ & SEC Grand Jury Subpoena Response & Proffers',
      'Healthcare & False Claims Act (Qui Tam) Defense',
      'Internal Corporate Investigations & Whistleblower Audits',
      'Antitrust, Price-Fixing, & Foreign Corrupt Practices Act (FCPA)'
    ],
    strategicAdvantages: [
      'Direct leadership by former federal prosecutors with intimate insight into government playbooks.',
      'Proactive pre-indictment intervention to dissuade grand jury filings before formal charges occur.',
      'Rapid subpoena response coordination to prevent obstruction of justice exposure.'
    ],
    faqs: [
      {
        question: 'I received a target letter or federal grand jury subpoena. What should I do?',
        answer: 'Do not speak to federal agents under any circumstances. Contact defense counsel immediately so we can contact the Assistant US Attorney and protect your constitutional rights.'
      },
      {
        question: 'Can white-collar allegations be resolved before an indictment is publicized?',
        answer: 'Yes. Our most impactful victories happen behind closed doors during the pre-file investigation stage through persuasive presentations to prosecutors.'
      }
    ],
    leadAttorney: 'Marcus Sterling, Esq.'
  }
];

export const ATTORNEYS: Attorney[] = [
  {
    id: 'attorney-1',
    name: 'Victoria Vanguard, Esq.',
    title: 'Founding Managing Partner | Head of Trial Litigation',
    specialties: ['Catastrophic Personal Injury', 'Medical Malpractice', 'Complex Tort Actions'],
    education: 'Stanford Law School, J.D. (Editor, Stanford Law Review) • UC Berkeley, B.A. with Highest Honors',
    admissions: ['California State Bar (#214890)', 'U.S. Supreme Court Bar', 'U.S. Court of Appeals for the Ninth Circuit'],
    experienceYears: 24,
    totalRecovered: '$95M+',
    bio: 'Victoria Vanguard is celebrated as one of California’s most formidable civil trial advocates. Over 24 years, she has secured dozens of multi-million-dollar jury verdicts and settlements against major automobile manufacturers, trucking syndicates, and national healthcare systems. She is a member of the Inner Circle of Advocates and has served as President of the Consumer Attorneys of California.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    quotes: 'Every client who walks into our firm has experienced an injustice. Our sworn duty is to command absolute accountability in front of a jury.',
    awards: ['Super Lawyers Top 100 Attorneys (12 Consecutive Years)', 'National Trial Lawyers "Trial Lawyer of the Year"', 'Martindale-Hubbell AV Preeminent 5.0 Peer Rating']
  },
  {
    id: 'attorney-2',
    name: 'Marcus Sterling, Esq.',
    title: 'Senior Partner | Chair of Commercial & White Collar Defense',
    specialties: ['Commercial Litigation', 'Trade Secret Theft', 'Federal Criminal Defense'],
    education: 'Harvard Law School, J.D. cum laude • Dartmouth College, B.A. Economics',
    admissions: ['California State Bar (#198422)', 'New York State Bar', 'U.S. District Courts (NDCA, CDCA, SDNY)'],
    experienceYears: 26,
    totalRecovered: '$80M+',
    bio: 'Marcus Sterling spent seven years as an Assistant United States Attorney (AUSA) in the Northern District of California prosecuting complex securities fraud, corporate corruption, and international intellectual property rings before founding Vanguard & Sterling. His trial strategies in high-stakes corporate disputes are renowned for unyielding precision and devastating cross-examinations.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    quotes: 'Preparation is the supreme weapon. We know the opposition’s case better than they know it themselves before we set foot in the courtroom.',
    awards: ['Best Lawyers in America - Bet-the-Company Litigation', 'Chambers USA Ranked Band 1 Trial Litigator', 'Daily Journal Top 100 Defense Litigators']
  },
  {
    id: 'attorney-3',
    name: 'Diana Thorne, Esq.',
    title: 'Partner | Chair of Employment & Executive Advocacy',
    specialties: ['Wrongful Termination', 'Whistleblower Protection', 'Executive Severance'],
    education: 'Columbia Law School, J.D. • Georgetown University, B.S. Foreign Service',
    admissions: ['California State Bar (#289014)', 'U.S. District Court Northern & Central California'],
    experienceYears: 16,
    totalRecovered: '$32M+',
    bio: 'Diana Thorne is a nationally respected champion for executives, founders, and employees facing systemic corporate malfeasance and retaliatory terminations. She has recovered millions against Silicon Valley giants and Wall Street firms while negotiating discreet, high-value transition packages for C-level executives.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    quotes: 'Corporations rely on fear and lengthy legal filings to wear people down. We equalize that battlefield immediately.',
    awards: ['Lawdragon 500 Leading Plaintiff Employment Lawyers', 'California Employment Lawyers Association Advocate of the Year']
  },
  {
    id: 'attorney-4',
    name: 'Nathaniel Hayes, Esq.',
    title: 'Partner | Head of Private Wealth & Estate Litigation',
    specialties: ['High-Net-Worth Divorce', 'Trust & Estate Contests', 'Asset Valuation'],
    education: 'UC Berkeley School of Law (Boalt Hall), J.D. • Princeton University, A.B. History',
    admissions: ['California State Bar (#245719)', 'Certified Family Law Specialist (CFLS)'],
    experienceYears: 19,
    totalRecovered: '$45M+ Preserved',
    bio: 'Nathaniel Hayes advises high-profile founders, venture capital partners, and multi-generational families in contentious matrimonial and trust dissolution proceedings. His deep understanding of tax structures, offshore trusts, and private equity allows clients to resolve high-stakes disputes with surgical discretion.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    quotes: 'Protecting your legacy requires strategic calm and meticulous financial precision during moments of acute emotional turmoil.',
    awards: ['American Academy of Matrimonial Lawyers Fellow', 'Northern California Super Lawyers (Family & Trust Law)']
  }
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Michael S.',
    role: 'CEO & Founder, Horizon Logistics',
    practiceArea: 'Commercial Litigation',
    rating: 5,
    date: 'February 2026',
    verifiedSource: 'Google Verified',
    reviewText: 'When our departing co-founder took proprietary software algorithms to a competitor, our business was in existential peril. Marcus Sterling obtained an emergency injunction in 48 hours and subsequently secured a $22M verdict. There is no other firm I would trust with my company’s life.',
    outcomeTag: '$22.4M Trade Secret Verdict'
  },
  {
    id: 'rev-2',
    clientName: 'Sarah & David Jenkins',
    role: 'Catastrophic Accident Survivors',
    practiceArea: 'Personal Injury',
    rating: 5,
    date: 'January 2026',
    verifiedSource: 'Google Verified',
    reviewText: 'After a commercial truck driver hit our family vehicle on Highway 101, the trucking company’s insurers tried to blame us and offered a pathetic insult of a settlement. Victoria Vanguard fought for two years without backing down and secured a $14.85 million settlement that pays for our lifelong care. They treated us like family.',
    outcomeTag: '$14.85M Trucking Recovery'
  },
  {
    id: 'rev-3',
    clientName: 'Dr. Arthur V.',
    role: 'Former Chief Compliance Officer',
    practiceArea: 'Employment Law',
    rating: 5,
    date: 'November 2025',
    verifiedSource: 'Avvo Top Rated',
    reviewText: 'When I uncovered financial reporting discrepancies and refused to sign off on false audits, I was abruptly terminated. Diana Thorne and her team dismantled the company’s smear attempts and won a $6.25M award in arbitration. Complete vindication of my reputation.',
    outcomeTag: '$6.25M Whistleblower Award'
  },
  {
    id: 'rev-4',
    clientName: 'Evelyn P.',
    role: 'Surviving Spouse & Family Advocate',
    practiceArea: 'Medical Malpractice',
    rating: 5,
    date: 'October 2025',
    verifiedSource: 'Martindale-Hubbell',
    reviewText: 'The hospital insisted my husband’s sudden death was an unavoidable heart attack, but Victoria Vanguard had top cardiologists review the telemetry charts and found negligence in the emergency room. She secured $9.1M for our children’s future. Compassionate, relentless, and deeply ethical.',
    outcomeTag: '$9.1M Hospital Negligence Win'
  }
];

export const TRUST_METRICS = [
  { label: 'Recovered for Clients', value: '$185M+', sub: 'Verdicts & Settlements' },
  { label: 'Trial & Case Win Rate', value: '99%', sub: 'Proven Courtroom Record' },
  { label: 'Combined Experience', value: '85+ Yrs', sub: 'Senior Trial Partners' },
  { label: 'Client Satisfaction', value: '5.0 ★', sub: 'Over 450+ Verified Reviews' },
  { label: 'Emergency Intake', value: '24/7/365', sub: 'Under 15 Min Response' }
];

export const TRUST_BADGES = [
  { name: 'Super Lawyers', desc: 'Top 5% of Practicing Attorneys' },
  { name: 'Martindale-Hubbell AV Preeminent', desc: 'Highest Possible Legal & Ethical Rating' },
  { name: 'The National Trial Lawyers', desc: 'Top 100 Civil Plaintiff & Criminal Defense' },
  { name: 'Million Dollar Advocates Forum', desc: 'Top Trial Lawyers in America' },
  { name: 'Better Business Bureau', desc: 'A+ Rating & Fully Accredited' }
];
