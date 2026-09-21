import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, Lock, Building, Scale } from 'lucide-react';
import { ConsultationLeadPayload } from '../types';

interface ContactAndFooterProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
  onOpenPracticeArea: (id: string) => void;
  onLeadSuccess?: (id: string, name: string) => void;
}

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({
  onOpenScheduler,
  onOpenPracticeArea,
  onLeadSuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [practiceArea, setPracticeArea] = useState('personal-injury');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const [activeOffice, setActiveOffice] = useState<'sf' | 'sv'>('sf');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('');

    if (!fullName.trim() || !phone.trim()) {
      setStatusMsg('Please enter your full name and telephone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ConsultationLeadPayload = {
        fullName: fullName.trim(),
        email: email.trim() || 'website-footer@lead.law',
        phone: phone.trim(),
        practiceArea,
        urgency: 'high',
        caseSummary: message.trim() || 'Direct inquiry submitted via footer contact form.',
        consultationType: 'phone'
      };

      const res = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        if (onLeadSuccess) {
          onLeadSuccess(data.confirmationId, fullName);
        }
      } else {
        setStatusMsg(data.error || 'Failed to submit inquiry. Please call (800) 555-0199 directly.');
      }
    } catch (err) {
      console.error(err);
      setStatusMsg('Network error submitting. Please call our 24/7 line at (800) 555-0199.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="bg-white text-slate-700 pt-16 pb-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Contact Form & Office Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 7 Columns: Express-Connected Intake Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl shadow-lg">
            <div className="space-y-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-[#F7F0DB] text-[#8A6B30] text-xs font-bold uppercase tracking-wider">
                Direct Intake Desk
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#30251F]">
                Connect With a Senior Partner Today
              </h3>
              <p className="text-slate-600 text-sm">
                Submit your matter for rapid review by our litigation team. Strict attorney-client confidentiality guaranteed.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F7F0DB] text-[#B88A2D] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif-display text-xl font-bold text-[#30251F]">
                  Case Submission Received
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you, <span className="text-[#B88A2D] font-semibold">{fullName}</span>. An intake attorney is reviewing your details right now. We will call <strong className="text-[#30251F]">{phone}</strong> shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:text-[#30251F] text-xs font-semibold hover:bg-slate-50"
                  >
                    Submit Additional Info
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {statusMsg && (
                  <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
                    {statusMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Your Full Name <span className="text-[#B88A2D]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. David Sterling"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#30251F] text-sm placeholder-slate-400 focus:outline-none focus:border-[#C7A14C] focus:ring-1 focus:ring-[#C7A14C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Telephone Number <span className="text-[#B88A2D]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(415) 555-0199"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#30251F] text-sm placeholder-slate-400 focus:outline-none focus:border-[#C7A14C] focus:ring-1 focus:ring-[#C7A14C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#30251F] text-sm placeholder-slate-400 focus:outline-none focus:border-[#C7A14C] focus:ring-1 focus:ring-[#C7A14C]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Legal Practice Area
                    </label>
                    <select
                      value={practiceArea}
                      onChange={(e) => setPracticeArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-[#30251F] text-sm focus:outline-none focus:border-[#C7A14C] focus:ring-1 focus:ring-[#C7A14C]"
                    >
                      <option value="personal-injury">Personal Injury &amp; Catastrophic Accidents</option>
                      <option value="commercial-litigation">Commercial &amp; Business Litigation</option>
                      <option value="employment-labor">Executive Employment &amp; Retaliation</option>
                      <option value="medical-malpractice">Medical Malpractice &amp; Hospital Negligence</option>
                      <option value="family-estate">High-Net-Worth Family &amp; Trust Disputes</option>
                      <option value="criminal-defense">White Collar &amp; Regulatory Defense</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Brief Summary of What Happened
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what happened, when it occurred, or any adverse party actions..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-[#30251F] text-sm placeholder-slate-400 focus:outline-none focus:border-[#C7A14C] focus:ring-1 focus:ring-[#C7A14C] resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-[#B88A2D] shrink-0" />
                    <span>100% Confidential. Zero Obligation.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 bg-[#C7A14C] hover:bg-[#B88A2D] text-[#241B17] font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Confidential Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right 5 Columns: Interactive Office Locations & Map Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#F7F0DB] text-[#8A6B30] text-xs font-semibold">
                Strategic Office Locations
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#30251F]">
                Visit Our Chambers
              </h3>
              <p className="text-xs text-slate-600">
                Headquartered in San Francisco's Financial District with regional branch offices in Silicon Valley.
              </p>
            </div>

            {/* Office Switcher Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveOffice('sf')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeOffice === 'sf'
                    ? 'bg-[#C7A14C] text-[#241B17] shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                San Francisco Flagship
              </button>
              <button
                onClick={() => setActiveOffice('sv')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeOffice === 'sv'
                    ? 'bg-[#C7A14C] text-[#241B17] shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Silicon Valley Branch
              </button>
            </div>

            {/* Active Office Card */}
            {activeOffice === 'sf' ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-[#B88A2D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#30251F] text-sm">
                      Montgomery Tower Chambers
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      555 Montgomery Street, 18th Floor, San Francisco, CA 94111
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Main Telephone:</span>
                    <a href="tel:+18005550199" className="font-bold text-[#B88A2D] hover:underline">
                      (800) 555-0199
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Direct Desk:</span>
                    <span className="font-medium text-[#30251F]">(415) 782-9000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Office Hours:</span>
                    <span className="text-[#8A6B30] font-semibold">24/7 Intake Protocol Active</span>
                  </div>
                </div>

                {/* Simulated Interactive Map Representation */}
                <div className="relative h-40 w-full rounded-xl overflow-hidden bg-[#F7F3F1] border border-slate-200 flex items-center justify-center group">
                  {/* Subtle map stylization */}
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-size-[16px_16px] opacity-40" />
                  <div className="relative text-center p-3 space-y-1">
                    <div className="w-8 h-8 rounded-full bg-[#C7A14C] text-[#241B17] flex items-center justify-center mx-auto shadow-lg animate-bounce">
                      <MapPin className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-xs font-bold text-[#30251F]">555 Montgomery St, SF</p>
                    <p className="text-[11px] text-slate-500">Financial District - Valet Available</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-[#B88A2D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[#30251F] text-sm">
                      Palo Alto Technology Practice
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      2200 University Avenue, Suite 400, Palo Alto, CA 94301
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Telephone:</span>
                    <a href="tel:+18005550199" className="font-bold text-[#B88A2D] hover:underline">
                      (800) 555-0199
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Direct Desk:</span>
                    <span className="font-medium text-[#30251F]">(650) 492-3300</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Office Hours:</span>
                    <span className="text-[#8A6B30] font-semibold">Monday - Friday: 8:00 AM - 7:00 PM</span>
                  </div>
                </div>

                <div className="relative h-40 w-full rounded-xl overflow-hidden bg-[#F7F3F1] border border-slate-200 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-size-[16px_16px] opacity-40" />
                  <div className="relative text-center p-3 space-y-1">
                    <div className="w-8 h-8 rounded-full bg-[#C7A14C] text-[#241B17] flex items-center justify-center mx-auto shadow-lg animate-bounce">
                      <MapPin className="w-4 h-4 fill-current" />
                    </div>
                    <p className="text-xs font-bold text-[#30251F]">2200 University Ave, Palo Alto</p>
                    <p className="text-[11px] text-slate-500">Silicon Valley Tech &amp; Executive Center</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {false && (
          <>
        {/* Practice Areas Deep Links Footer Matrix */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs border-b border-[#5A4840]">
          <div className="space-y-2">
            <h5 className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">
              Personal Injury &amp; Torts
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onOpenPracticeArea('personal-injury')} className="hover:text-[#87994B]">Commercial Truck Accidents</button></li>
              <li><button onClick={() => onOpenPracticeArea('personal-injury')} className="hover:text-[#87994B]">Traumatic Brain Injuries (TBI)</button></li>
              <li><button onClick={() => onOpenPracticeArea('personal-injury')} className="hover:text-[#87994B]">Spinal Injury &amp; Paralysis</button></li>
              <li><button onClick={() => onOpenPracticeArea('personal-injury')} className="hover:text-[#87994B]">Wrongful Death Actions</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">
              Commercial Litigation
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onOpenPracticeArea('commercial-litigation')} className="hover:text-[#87994B]">Trade Secret Misappropriation</button></li>
              <li><button onClick={() => onOpenPracticeArea('commercial-litigation')} className="hover:text-[#87994B]">Breach of Fiduciary Duty</button></li>
              <li><button onClick={() => onOpenPracticeArea('commercial-litigation')} className="hover:text-[#87994B]">Shareholder Freezeouts</button></li>
              <li><button onClick={() => onOpenPracticeArea('commercial-litigation')} className="hover:text-[#87994B]">Emergency Injunctions &amp; TRO</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">
              Employment &amp; Malpractice
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onOpenPracticeArea('employment-labor')} className="hover:text-[#87994B]">Executive Whistleblower Claims</button></li>
              <li><button onClick={() => onOpenPracticeArea('employment-labor')} className="hover:text-[#87994B]">Severance Agreement Audits</button></li>
              <li><button onClick={() => onOpenPracticeArea('medical-malpractice')} className="hover:text-[#87994B]">Hospital Diagnostic Failure</button></li>
              <li><button onClick={() => onOpenPracticeArea('medical-malpractice')} className="hover:text-[#87994B]">Surgical Errors &amp; MICRA Reform</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-100 uppercase tracking-wider text-[11px]">
              Defense &amp; Private Wealth
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => onOpenPracticeArea('criminal-defense')} className="hover:text-[#87994B]">DOJ &amp; SEC Subpoena Defense</button></li>
              <li><button onClick={() => onOpenPracticeArea('criminal-defense')} className="hover:text-[#87994B]">White Collar Indictment Dismissal</button></li>
              <li><button onClick={() => onOpenPracticeArea('family-estate')} className="hover:text-[#87994B]">High-Asset Marital Dissolution</button></li>
              <li><button onClick={() => onOpenPracticeArea('family-estate')} className="hover:text-[#87994B]">Contested Trust Fiduciary Actions</button></li>
            </ul>
          </div>
        </div>

        {/* Section 7 Component: Legal Disclaimers & Regulatory Notices */}
        <div className="pt-8 space-y-4 text-[11px] text-slate-500 leading-relaxed">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#708238]" />
            <span className="font-bold text-slate-400">MANDATORY ATTORNEY ADVERTISING &amp; ETHICS DISCLOSURES</span>
          </div>

          <p>
            The information presented on this website is for general informational purposes only and does not constitute formal legal advice. Viewing this website, transmitting electronic inquiries, using the 24/7 AI chat widget, or scheduling a preliminary assessment does not establish an attorney-client relationship. An attorney-client relationship is formed solely upon the mutual execution of a formal, written Retainer and Engagement Agreement.
          </p>

          <p>
            Prior case results, settlements, verdicts, and testimonial quotes referenced on this website are illustrative and do not guarantee, warrant, or predict a similar outcome in any future legal matter. Every case involves unique facts, evidentiary standards, and jurisdiction-specific statutory factors. Personal injury and certain employment claims are handled on a contingency fee basis where client pays no legal fees unless a recovery is obtained; court filing fees and litigation costs may be advanced by the firm and reimbursed from recovery proceeds pursuant to California State Bar rules.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#5A4840]/80 text-xs text-slate-500">
            <p>
              (c) {new Date().getFullYear()} Vanguard &amp; Sterling Legal Group, LLP. All Rights Reserved. Principal Office: San Francisco, California.
            </p>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span>-</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span>-</span>
              <span className="hover:text-slate-300 cursor-pointer">Ethics &amp; Bar Admissions</span>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </section>
  );
};



