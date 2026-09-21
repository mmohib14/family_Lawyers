export type PracticeAreaId =
  | 'marital-relationship'
  | 'divorce-property'
  | 'children-custody'
  | 'adoption-guardianship'
  | 'safety-dispute-resolution'
  | 'personal-injury'
  | 'commercial-litigation'
  | 'employment-labor'
  | 'medical-malpractice'
  | 'family-estate'
  | 'criminal-defense';

export interface PracticeArea {
  id: PracticeAreaId;
  title: string;
  shortDesc: string;
  tagline: string;
  iconName: string;
  recoveredTotal: string;
  keyWin: string;
  typicalCases: string[];
  statuteOfLimitations: string;
  feeStructure: string;
  faqs: { question: string; answer: string }[];
  strategicAdvantages: string[];
  leadAttorney: string;
}

export interface CaseResultItem {
  id: string;
  amount: string;
  title: string;
  practiceArea: string;
  categoryName: string;
  settlementType: 'Settlement' | 'Jury Verdict' | 'Arbitration Award';
  year: string;
  summary: string;
  leadAttorney: string;
  keyDetails: string[];
}

export interface ClientReview {
  id: string;
  clientName: string;
  role: string;
  practiceArea: string;
  rating: number;
  date: string;
  verifiedSource: 'Google Verified' | 'Avvo Top Rated' | 'Martindale-Hubbell';
  reviewText: string;
  outcomeTag: string;
}

export interface Attorney {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  education: string;
  admissions: string[];
  experienceYears: number;
  totalRecovered: string;
  bio: string;
  image: string;
  quotes: string;
  awards: string[];
}

export interface ConsultationLeadPayload {
  fullName: string;
  email: string;
  phone: string;
  practiceArea: string;
  urgency: 'critical' | 'high' | 'standard';
  caseSummary: string;
  incidentDate?: string;
  preferredDate?: string;
  preferredTime?: string;
  consultationType: 'in-person' | 'video' | 'phone';
}

export interface StoredLead extends ConsultationLeadPayload {
  id: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'scheduled' | 'retained';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isQuickPrompt?: boolean;
}
