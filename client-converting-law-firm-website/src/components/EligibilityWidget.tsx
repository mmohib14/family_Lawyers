import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Lock,
  Sparkles,
  Phone,
  AlertCircle
} from 'lucide-react';
import { ConsultationLeadPayload } from '../types';

interface EligibilityWidgetProps {
  onLeadSubmitted: (leadId: string, name: string) => void;
}

export const EligibilityWidget: React.FC<EligibilityWidgetProps> = ({
  onLeadSubmitted
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [practiceArea, setPracticeArea] = useState('personal-injury');
  const [incidentTimeline, setIncidentTimeline] = useState('within-30-days');
  const [hasSevereImpact, setHasSevereImpact] = useState<string>('yes');
  const [insuranceContacted, setInsuranceContacted] = useState<string>('yes');
  const [formalNoticesReceived, setFormalNoticesReceived] = useState<string>('no');

  // Contact Info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    setErrorMessage('');
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (currentStep === 3) setCurrentStep(2);
    else if (currentStep === 2) setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Please provide your name and phone number for priority triage.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ConsultationLeadPayload = {
        fullName: fullName.trim(),
        email: email.trim() || 'unspecified@triage.lead',
        phone: phone.trim(),
        practiceArea,
        urgency: 'critical',
        caseSummary: `[60s ELIGIBILITY CHECK] Timeline: ${incidentTimeline} | Severe Impact: ${hasSevereImpact} | Insurance Contacted: ${insuranceContacted} | Formal Notice: ${formalNoticesReceived}. Details: ${notes || 'Immediate priority assessment requested.'}`,
        consultationType: 'phone'
      };

      const res = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setSubmissionSuccess(data);
        onLeadSubmitted(data.confirmationId, fullName);
      } else {
        setErrorMessage(data.error || 'Failed to submit intake. Please call our 24/7 hotline directly.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error submitting your evaluation. Please call (800) 555-0199 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="case-eligibility" className="py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EAD7] text-[#46521F] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#708238]" />
            <span>Confidential Legal Triage</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#41342E]">
            Interactive Case Eligibility Check
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Discover whether your claim meets the statutory criteria for substantial recovery or immediate defense intervention in 60 seconds.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xl">
          {!submissionSuccess && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className={currentStep >= 1 ? 'text-[#5F6F2F] font-extrabold' : ''}>
                  Step 1: Category &amp; Timeline
                </span>
                <span className={currentStep >= 2 ? 'text-[#5F6F2F] font-extrabold' : ''}>
                  Step 2: Case Impact &amp; Notice
                </span>
                <span className={currentStep >= 3 ? 'text-[#5F6F2F] font-extrabold' : ''}>
                  Step 3: Instant Evaluation &amp; Contact
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className={`h-full bg-[#708238] transition-all duration-300 ${
                    currentStep === 1 ? 'w-1/3' : currentStep === 2 ? 'w-2/3' : 'w-full'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Success Screen */}
          {submissionSuccess ? (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#E6EAD7] text-[#5F6F2F] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#F1F3E8] border border-[#D5DDBB] text-[#5F6F2F] text-xs font-bold uppercase tracking-wider">
                  Case File #{submissionSuccess.confirmationId} Created
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#30251F]">
                  Your Case File Is Under Priority Attorney Review
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
                  Thank you, <span className="font-semibold text-[#30251F]">{fullName}</span>. Based on your inputs, your claim represents a viable candidate for trial representation.
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Assigned Senior Duty Partner:</span>
                  <span className="font-bold text-[#30251F]">Victoria Vanguard, Esq.</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Estimated Direct Response:</span>
                  <span className="font-bold text-[#5F6F2F]">Within 10-15 Minutes</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Callback Number:</span>
                  <span className="font-bold text-[#30251F]">{phone}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+18005550199"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#30251F] text-[#87994B] font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Duty Attorney Immediately: (800) 555-0199</span>
                </a>
                <button
                  onClick={() => {
                    setSubmissionSuccess(null);
                    setCurrentStep(1);
                    setFullName('');
                    setPhone('');
                    setEmail('');
                    setNotes('');
                  }}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
                >
                  Start Another Evaluation
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* STEP 1 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-[#30251F]">
                      1. Select the Legal Matter &amp; Incident Date
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Choose the category that best aligns with your potential case.
                    </p>
                  </div>

                  {/* Practice Area Choice */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'personal-injury', label: 'Personal Injury / Accident / Crash', desc: 'Vehicular collision, trucking accident, slip & fall', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=160&q=80' },
                      { id: 'commercial-litigation', label: 'Commercial & Business Dispute', desc: 'Breach of contract, partner freezeout, trade secrets', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=160&q=80' },
                      { id: 'employment-labor', label: 'Wrongful Termination / Retaliation', desc: 'Fired illegally, whistleblower, unpaid compensation', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=160&q=80' },
                      { id: 'medical-malpractice', label: 'Medical Malpractice / Surgical Error', desc: 'Failure to diagnose, hospital harm, birth injury', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=160&q=80' },
                      { id: 'family-estate', label: 'High-Asset Divorce / Trust Contest', desc: 'Significant assets, trustee dispute, inheritance', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=160&q=80' },
                      { id: 'criminal-defense', label: 'Federal / Regulatory / Criminal Defense', desc: 'Target letter, DOJ/SEC inquiry, arrest, subpoena', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=160&q=80' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPracticeArea(item.id)}
                        className={`flex min-h-[92px] items-center gap-4 text-left p-4 rounded-xl border transition-all ${
                          practiceArea === item.id
                            ? 'border-[#5F6F2F] bg-[#F1F3E8]/50 shadow-sm ring-1 ring-[#708238]'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <img src={item.image} alt="" aria-hidden="true" className="h-14 w-14 shrink-0 rounded-xl object-cover shadow-sm" />
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-[#30251F]">{item.label}</p>
                          <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Timeline Choice */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      When did the injury, dispute, or incident happen?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
                      {[
                        { id: 'within-30-days', label: 'Within last 30 days' },
                        { id: '1-6-months', label: '1 to 6 months ago' },
                        { id: '6-12-months', label: '6 to 12 months ago' },
                        { id: 'over-1-year', label: 'Over 1 year ago' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setIncidentTimeline(t.id)}
                          className={`p-3 rounded-lg border text-center transition-colors ${
                            incidentTimeline === t.id
                              ? 'border-[#5F6F2F] bg-[#F1F3E8] text-[#46521F] font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-[#708238] hover:bg-[#5F6F2F] text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                    >
                      <span>Continue to Step 2</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-[#30251F]">
                      2. Assess Severity &amp; Adversary Actions
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      These 3 factors dictate legal urgency and settlement leverage.
                    </p>
                  </div>

                  {/* Question 1 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <p className="font-semibold text-sm text-[#41342E]">
                      1. Did you suffer medical treatment, hospitalization, or financial damages exceeding $25,000?
                    </p>
                    <div className="flex gap-4 text-xs font-bold">
                      {['yes', 'no'].map((val) => (
                        <label
                          key={val}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer ${
                            hasSevereImpact === val
                              ? 'bg-[#708238] text-white border-[#5F6F2F]'
                              : 'bg-white text-slate-700 border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="severeImpact"
                            value={val}
                            checked={hasSevereImpact === val}
                            onChange={() => setHasSevereImpact(val)}
                            className="hidden"
                          />
                          <span className="capitalize">{val === 'yes' ? 'Yes, substantial impact' : 'No / Minor'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <p className="font-semibold text-sm text-[#41342E]">
                      2. Has an insurance company, opposing attorney, or employer attempted to settle or solicit a statement?
                    </p>
                    <div className="flex gap-4 text-xs font-bold">
                      {['yes', 'no'].map((val) => (
                        <label
                          key={val}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer ${
                            insuranceContacted === val
                              ? 'bg-[#708238] text-white border-[#5F6F2F]'
                              : 'bg-white text-slate-700 border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="insuranceContact"
                            value={val}
                            checked={insuranceContacted === val}
                            onChange={() => setInsuranceContacted(val)}
                            className="hidden"
                          />
                          <span className="capitalize">{val === 'yes' ? 'Yes, contacted me' : 'Not yet'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <p className="font-semibold text-sm text-[#41342E]">
                      3. Have any formal legal notices, termination letters, or court summonses been issued?
                    </p>
                    <div className="flex gap-4 text-xs font-bold">
                      {['yes', 'no'].map((val) => (
                        <label
                          key={val}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer ${
                            formalNoticesReceived === val
                              ? 'bg-[#708238] text-white border-[#5F6F2F]'
                              : 'bg-white text-slate-700 border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="formalNotice"
                            value={val}
                            checked={formalNoticesReceived === val}
                            onChange={() => setFormalNoticesReceived(val)}
                            className="hidden"
                          />
                          <span className="capitalize">{val === 'yes' ? 'Yes, formal notice served' : 'No formal notice'}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-[#708238] hover:bg-[#5F6F2F] text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                    >
                      <span>View My Case Assessment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Immediate Assessment Summary Banner */}
                  <div className="p-5 rounded-xl bg-[#F1F3E8] border border-[#D5DDBB] space-y-2">
                    <div className="flex items-center gap-2 text-[#46521F] font-bold text-base">
                      <CheckCircle2 className="w-5 h-5 text-[#5F6F2F]" />
                      <span>Assessment Result: Strong Viable Claim Identified</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#46521F] leading-relaxed">
                      Your responses indicate an actionable legal scenario with potential high recovery liability. Due to statute of limitations deadlines, prompt evidentiary preservation is recommended.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-[#30251F]">
                      3. Where should our duty partner send the confidential assessment?
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Our attorneys review intakes 24/7. Never shared with adverse parties.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Phone Number (For Priority Call) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(415) 555-0199"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Email Address (Optional for file copy)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      Brief Case Synopsis / Adverse Party (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Trucking collision on I-80; insurance offered lowball settlement..."
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Protected by California Attorney-Client Work Product Privilege doctrine.</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3.5 bg-[#708238] hover:bg-[#5F6F2F] text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-[#41342E]/20 disabled:opacity-50 transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Transmitting Priority File...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>Submit For Immediate Partner Review</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};



