import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory persistent store for Leads and Consultations
export interface Lead {
  id: string;
  createdAt: string;
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
  status: 'new' | 'contacted' | 'scheduled' | 'retained';
  notes?: string;
}

const leadsStore: Lead[] = [
  {
    id: 'lead-1001',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    fullName: 'Robert Henderson',
    email: 'r.henderson@example.com',
    phone: '(415) 890-2144',
    practiceArea: 'commercial-litigation',
    urgency: 'high',
    caseSummary: 'Breach of commercial distribution agreement with $1.8M inventory withheld.',
    incidentDate: '2026-02-14',
    preferredDate: '2026-09-20',
    preferredTime: '10:00 AM',
    consultationType: 'video',
    status: 'scheduled',
    notes: 'Preliminary conflict check cleared. Assigned to Senior Partner Marcus Sterling.'
  },
  {
    id: 'lead-1002',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    fullName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '(415) 671-8890',
    practiceArea: 'personal-injury',
    urgency: 'critical',
    caseSummary: 'Rear-ended by commercial freight carrier on US-101. Herniated disc and hospital bills.',
    incidentDate: '2026-08-28',
    preferredDate: '2026-09-18',
    preferredTime: '02:30 PM',
    consultationType: 'phone',
    status: 'contacted',
    notes: 'Medical records requested. Expedited intake protocol initiated.'
  }
];

// Pre-seeded verified Case Results
export interface CaseResult {
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

const caseResultsStore: CaseResult[] = [
  {
    id: 'cr-1',
    amount: '$14,850,000',
    title: 'Commercial Trucking Multi-Vehicle Collision',
    practiceArea: 'personal-injury',
    categoryName: 'Personal Injury',
    settlementType: 'Settlement',
    year: '2025',
    summary: 'Catastrophic injury settlement against national freight conglomerate following disputed hours-of-service electronic logging violations.',
    leadAttorney: 'Victoria Vanguard, Esq.',
    keyDetails: ['Pre-trial policy limits tender', 'Overcame disputed liability defense', 'Lifetime annuity structured']
  },
  {
    id: 'cr-2',
    amount: '$22,400,000',
    title: 'Trade Secret Misappropriation & Patent Breach',
    practiceArea: 'commercial-litigation',
    categoryName: 'Commercial Litigation',
    settlementType: 'Jury Verdict',
    year: '2025',
    summary: 'Unanimous federal jury verdict in US District Court against departing executives who stole proprietary biotech algorithmic trade secrets.',
    leadAttorney: 'Marcus Sterling, Esq.',
    keyDetails: ['Triple statutory damages awarded', 'Permanent worldwide injunctive relief', 'Full legal fee reimbursement']
  },
  {
    id: 'cr-3',
    amount: '$6,250,000',
    title: 'Executive Whistleblower Retaliation & Wrongful Termination',
    practiceArea: 'employment-labor',
    categoryName: 'Employment Law',
    settlementType: 'Arbitration Award',
    year: '2025',
    summary: 'Represented Chief Compliance Officer terminated after reporting SEC reporting irregularities inside publicly traded enterprise.',
    leadAttorney: 'Diana Thorne, Esq.',
    keyDetails: ['Overcame binding arbitration enforceability clauses', 'Compensatory + punitive damages', 'Reputational clearance statement']
  },
  {
    id: 'cr-4',
    amount: '$9,100,000',
    title: 'Hospital Failure-to-Diagnose & Surgical Malpractice',
    practiceArea: 'medical-malpractice',
    categoryName: 'Medical Malpractice',
    settlementType: 'Settlement',
    year: '2024',
    summary: 'Settlement secured against regional healthcare system for failure to diagnose acute aortic dissection in emergency triage.',
    leadAttorney: 'Victoria Vanguard, Esq.',
    keyDetails: ['Deposed 14 medical specialists', 'Comprehensive life-care plan established', 'Hospital revised triage protocol']
  },
  {
    id: 'cr-5',
    amount: '$18,500,000',
    title: 'Multi-State High-Net-Worth Asset & Trust Dissolution',
    practiceArea: 'family-estate',
    categoryName: 'Family & Estate',
    settlementType: 'Settlement',
    year: '2025',
    summary: 'Successfully defended beneficiary rights in contested offshore trust dispute involving complex real estate and private equity valuations.',
    leadAttorney: 'Nathaniel Hayes, Esq.',
    keyDetails: ['Preserved 100% of hereditary family trusts', 'Avoided liquidation of core operating entities', 'Confidential mediation resolution']
  },
  {
    id: 'cr-6',
    amount: 'Full Dismissal',
    title: 'Federal Securities Fraud & Wire Allegations',
    practiceArea: 'criminal-defense',
    categoryName: 'White Collar Defense',
    settlementType: 'Jury Verdict',
    year: '2024',
    summary: 'Complete dismissal of 18 felony counts against tech founder prior to jury empanelment following successful suppression of warrantless warrant returns.',
    leadAttorney: 'Marcus Sterling, Esq.',
    keyDetails: ['4th Amendment violation established', 'All assets unfrozen by DOJ', 'Zero criminal record maintained']
  }
];

// Gemini AI Helper
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!aiClient) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (e) {
      console.warn('Failed to initialize GoogleGenAI client:', e);
      return null;
    }
  }
  return aiClient;
}

// Fallback intelligent legal triage response generator
function generateRuleBasedChatResponse(userMsg: string, context?: { practiceArea?: string; phone?: string; name?: string }) {
  const lower = userMsg.toLowerCase();

  let advice = '';
  if (lower.includes('car') || lower.includes('accident') || lower.includes('crash') || lower.includes('injury') || lower.includes('hospital')) {
    advice = "For injury and accident claims, time is critical. We operate on a 100% Contingency Fee basis ('No Win, No Fee'), meaning you pay zero legal fees upfront. We recommend not providing recorded statements to insurance adjusters before consulting our trial team.";
  } else if (lower.includes('contract') || lower.includes('business') || lower.includes('partner') || lower.includes('commercial') || lower.includes('sue') || lower.includes('sued')) {
    advice = "For business litigation and breach of contract disputes, preserving all correspondence, contracts, and financial statements is paramount. Our commercial trial practice has recovered over $85M for companies and stakeholders.";
  } else if (lower.includes('fired') || lower.includes('job') || lower.includes('severance') || lower.includes('harass') || lower.includes('discrimination') || lower.includes('boss')) {
    advice = "California and federal employment statutes strictly prohibit retaliation, unpaid overtime, and wrongful termination. Keep records of your performance evaluations, emails, and employee handbook.";
  } else if (lower.includes('divorce') || lower.includes('estate') || lower.includes('will') || lower.includes('trust') || lower.includes('custody')) {
    advice = "Family law and estate disputes require discrete, high-level tactical asset valuation and fiduciary experience to protect your hard-earned wealth and family interests.";
  } else if (lower.includes('arrest') || lower.includes('charge') || lower.includes('police') || lower.includes('dui') || lower.includes('federal')) {
    advice = "If facing criminal investigation or charges, exercise your right to remain silent immediately. Request to speak to counsel before making any statements to investigators.";
  } else {
    advice = "Thank you for reaching out to Vanguard & Sterling. Our senior partners evaluate prospective claims 24/7 to determine actionable liability, statute of limitations urgency, and maximum recovery potential.";
  }

  return {
    reply: `${advice}\n\nWould you like to schedule a free, strictly confidential 15-minute case assessment with one of our senior partners today? You can also reach our emergency intake line directly at (800) 555-0199.`,
    disclaimer: "Disclaimer: This chat is powered by Vanguard & Sterling's 24/7 legal intake assistant for informational purposes and does not create an attorney-client relationship."
  };
}

// REST API Endpoints

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGemini: !!process.env.GEMINI_API_KEY
  });
});

// 2. GET /api/results - Filterable case results
app.get('/api/results', (req, res) => {
  const { practiceArea } = req.query;
  let results = caseResultsStore;
  if (practiceArea && practiceArea !== 'all') {
    results = results.filter(r => r.practiceArea === practiceArea);
  }
  res.json({
    success: true,
    count: results.length,
    results
  });
});

// 3. POST /api/leads/submit - Validate intake form data, save lead, trigger simulated notifications
app.post('/api/leads/submit', (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      practiceArea,
      urgency,
      caseSummary,
      incidentDate,
      preferredDate,
      preferredTime,
      consultationType
    } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Full name and phone number are required for urgent legal consultation scheduling.'
      });
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      fullName: String(fullName).trim(),
      email: String(email || '').trim(),
      phone: String(phone).trim(),
      practiceArea: practiceArea || 'general-inquiry',
      urgency: urgency === 'critical' ? 'critical' : urgency === 'high' ? 'high' : 'standard',
      caseSummary: String(caseSummary || 'Direct consultation booking request.').trim(),
      incidentDate: incidentDate || undefined,
      preferredDate: preferredDate || undefined,
      preferredTime: preferredTime || undefined,
      consultationType: consultationType || 'phone',
      status: 'new',
      notes: 'Automated intake notification dispatched to duty partner.'
    };

    leadsStore.unshift(newLead);

    // Automation & Services simulation: Nodemailer & Webhooks trigger
    console.log(`[AUTOMATION] 🔔 Priority Legal Intake Dispatched:`);
    console.log(`[NOTIFICATION-NODEMAILER] To: partners@vanguardsterlinglaw.com | Lead: ${newLead.fullName} (${newLead.phone}) | Area: ${newLead.practiceArea} | Urgency: ${newLead.urgency}`);
    console.log(`[WEBHOOK-DISPATCH] Payload sent to internal CRM / n8n workflow: ID ${newLead.id}`);

    res.status(201).json({
      success: true,
      message: 'Your confidential legal consultation has been submitted. An attorney will review your details within 15 minutes.',
      confirmationId: newLead.id,
      lead: newLead,
      estimatedResponseTime: newLead.urgency === 'critical' ? 'Under 10 minutes' : 'Under 30 minutes'
    });
  } catch (err: any) {
    console.error('Error in /api/leads/submit:', err);
    res.status(500).json({ success: false, error: 'Internal server error while processing legal intake.' });
  }
});

// 4. GET /api/leads - Retrieve saved leads (for intake review / admin verification)
app.get('/api/leads', (req, res) => {
  res.json({
    success: true,
    total: leadsStore.length,
    leads: leadsStore
  });
});

// 5. POST /api/chat/message - 24/7 AI / Live Chat Widget handling
app.post('/api/chat/message', async (req, res) => {
  try {
    const { message, conversationHistory, leadContext } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A message string is required.' });
    }

    const ai = getGenAI();

    if (ai) {
      try {
        const systemPrompt = `You are 'CounselConnect', the 24/7 Senior Legal Intake Specialist for Vanguard & Sterling Law Firm (established trial attorneys specializing in Personal Injury, Commercial Litigation, Wrongful Termination & Employment, Medical Malpractice, High-Net-Worth Family/Estate, and White Collar Criminal Defense).

Firm facts:
- Over $185 Million recovered for clients
- 99% track record in trial and high-stakes settlements
- Free, 100% confidential consultations
- Personal injury and employment cases handled on Contingency ("No Win, No Fee")
- Emergency 24/7 hotline: (800) 555-0199
- Offices: San Francisco Financial District (555 Montgomery St) & Silicon Valley

Guidelines:
1. Speak with composure, warmth, empathy, and professional legal gravity.
2. Provide clear, helpful plain-English insights into the user's situation.
3. Keep answers concise (2 to 4 sentences per topic) so it is easy to read on mobile.
4. If the user shares case details, ask for their preferred callback phone number or encourage them to click "Book Consultation" so an attorney can examine their statute of limitations immediately.
5. Mandatory Disclaimer at the very end: "Legal Disclaimer: I am an automated intake coordinator, not an attorney. This conversation provides general legal information and does not establish an attorney-client relationship."`;

        const contents: any[] = [];
        if (Array.isArray(conversationHistory)) {
          conversationHistory.slice(-6).forEach((item: any) => {
            if (item.sender === 'user') {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'ai') {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          });
        }
        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          }
        });

        const replyText = response.text || '';

        // Check if message contains a phone number or email to auto-flag lead
        const phoneMatch = message.match(/(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}/);
        if (phoneMatch) {
          console.log(`[CHAT-LEAD-CAPTURE] Detected phone in chat: ${phoneMatch[0]} | Context: ${message.slice(0, 100)}`);
        }

        return res.json({
          success: true,
          reply: replyText,
          source: 'gemini-3.8-flash'
        });
      } catch (aiErr: any) {
        console.warn('Gemini API call encountered error, falling back to rules engine:', aiErr?.message || aiErr);
      }
    }

    // Fallback rule-based legal triage engine
    const fallback = generateRuleBasedChatResponse(message, leadContext);
    return res.json({
      success: true,
      reply: fallback.reply,
      disclaimer: fallback.disclaimer,
      source: 'rules-engine'
    });

  } catch (err: any) {
    console.error('Error in /api/chat/message:', err);
    res.status(500).json({
      error: 'Unable to process chat query at this time.',
      fallback: 'Please call our 24/7 rapid intake line immediately at (800) 555-0199.'
    });
  }
});

// Vite middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚖️  Law Firm Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
