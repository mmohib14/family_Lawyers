import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Shield,
  CheckCircle2,
  Phone,
  Video,
  Building2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { ConsultationLeadPayload } from '../types';
import { FAMILY_PRACTICE_AREAS } from '../data/familyLawData';

interface ConsultationSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillPracticeArea?: string;
  onLeadSuccess?: (id: string, name: string) => void;
}

export const ConsultationSchedulerModal: React.FC<ConsultationSchedulerModalProps> = ({
  isOpen,
  onClose,
  prefillPracticeArea,
  onLeadSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form fields
  const [practiceArea, setPracticeArea] = useState('divorce-property');
  const [urgency, setUrgency] = useState<'critical' | 'high' | 'standard'>('high');
  const [caseSummary, setCaseSummary] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [consultationType, setConsultationType] = useState<'phone' | 'video' | 'in-person'>('phone');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedData, setConfirmedData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (prefillPracticeArea) {
      setPracticeArea(prefillPracticeArea);
    }
  }, [prefillPracticeArea]);

  // Set default appointment date to tomorrow if not set
  useEffect(() => {
    if (!selectedDate) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      const iso = d.toISOString().split('T')[0];
      setSelectedDate(iso);
    }
  }, [selectedDate]);

  if (!isOpen) return null;

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step === 4) setStep(3);
    else if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Full name and telephone number are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ConsultationLeadPayload = {
        fullName: fullName.trim(),
        email: email.trim() || 'not-provided@client.law',
        phone: phone.trim(),
        practiceArea,
        urgency,
        caseSummary: caseSummary.trim() || 'Direct consultation booking from website.',
        incidentDate: incidentDate || undefined,
        preferredDate: selectedDate,
        preferredTime: selectedTime,
        consultationType
      };

      const res = await fetch('/api/leads/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setConfirmedData(data);
        if (onLeadSuccess) {
          onLeadSuccess(data.confirmationId, fullName);
        }
      } else {
        setErrorMessage(data.error || 'Unable to schedule. Please call (800) 555-0199 directly.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error scheduling consultation. Please call (800) 555-0199.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:15 PM',
    '03:00 PM',
    '04:30 PM',
    '06:00 PM'
  ];

  return (
    <div className="consultation-modal fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#30251F]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-[#41342E] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#708238]/20 border border-[#708238]/40 flex items-center justify-center text-[#87994B]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-bold text-slate-50">
                Book Confidential Case Consultation
              </h3>
              <p className="text-xs text-[#87994B] font-medium">
                100% Free - No Obligation - Protected by Attorney-Client Privilege
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#41342E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker */}
        {!confirmedData && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#5F6F2F] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#E6EAD7] flex items-center justify-center text-xs">1</span>
              <span>Practice Area</span>
            </div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#5F6F2F] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#E6EAD7] flex items-center justify-center text-xs">2</span>
              <span>Case Facts</span>
            </div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#5F6F2F] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#E6EAD7] flex items-center justify-center text-xs">3</span>
              <span>Slot &amp; Format</span>
            </div>
            <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-[#5F6F2F] font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-[#E6EAD7] flex items-center justify-center text-xs">4</span>
              <span>Contact</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700">
          {confirmedData ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-[#E6EAD7] text-[#5F6F2F] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-[#E6EAD7] text-[#46521F] text-xs font-bold uppercase tracking-wider">
                  Confirmed Appointment #{confirmedData.confirmationId}
                </span>
                <h4 className="font-serif-display text-2xl font-bold text-[#30251F] mt-2">
                  Your Consultation Is Scheduled
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  A calendar invitation and secure confirmation link have been dispatched. A partner attorney will connect with you at your chosen time.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Client:</span>
                  <span className="font-bold text-[#30251F]">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date &amp; Time:</span>
                  <span className="font-bold text-[#30251F]">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultation Format:</span>
                  <span className="font-bold text-[#5F6F2F] capitalize">{consultationType} Consultation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Practice Lead:</span>
                  <span className="font-bold text-[#30251F]">Victoria Vanguard, Esq.</span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+18005550199"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#30251F] text-[#87994B] font-bold text-xs rounded-xl flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Emergency Duty Partner Now: (800) 555-0199</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <div>
              {errorMessage && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* STEP 1: Practice Area & Urgency */}
              {step === 1 && (
                <div key="step-1" className="apex-step-enter space-y-5">
                  <div>
                    <h4 className="font-serif-display text-lg font-bold text-[#30251F]">
                      Step 1: Select Practice Area &amp; Urgency
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      This routes your inquiry directly to the specialized partner.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {FAMILY_PRACTICE_AREAS.map((pa) => (
                      <button
                        key={pa.id}
                        type="button"
                        onClick={() => setPracticeArea(pa.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          practiceArea === pa.id
                            ? 'border-[#5F6F2F] bg-[#F1F3E8]/60 ring-1 ring-[#708238] shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <p className="font-bold text-xs text-[#30251F]">{pa.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{pa.recoveredTotal}</p>
                      </button>
                    ))}
                  </div>

                  {/* Urgency Level */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                      Case Urgency Level
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-medium">
                      {[
                        { id: 'critical', label: 'Critical / 24h', desc: 'Active arrest or imminent court deadline' },
                        { id: 'high', label: 'High Priority', desc: 'Incident occurred recently' },
                        { id: 'standard', label: 'Standard', desc: 'Planning legal representation' }
                      ].map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setUrgency(u.id as any)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            urgency === u.id
                              ? 'border-[#5F6F2F] bg-[#F1F3E8] text-[#46521F] font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <p className="font-bold text-xs">{u.label}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 hidden sm:block">{u.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-[#708238] hover:bg-[#5F6F2F] text-white font-bold text-sm rounded-xl flex items-center gap-2"
                    >
                      <span>Proceed to Case Facts</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Case Details */}
              {step === 2 && (
                <div key="step-2" className="apex-step-enter space-y-5">
                  <div>
                    <h4 className="font-serif-display text-lg font-bold text-[#30251F]">
                      Step 2: Case Summary &amp; Key Details
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      All communications are strictly protected by Attorney-Client Confidentiality.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Approximate Incident or Dispute Date
                    </label>
                    <input
                      type="date"
                      value={incidentDate}
                      onChange={(e) => setIncidentDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Brief Case Summary / Key Parties Involved
                    </label>
                    <textarea
                      rows={4}
                      value={caseSummary}
                      onChange={(e) => setCaseSummary(e.target.value)}
                      placeholder="Please summarize what occurred, any injuries sustained, or adverse corporate/insurance actions..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-[#708238] hover:bg-[#5F6F2F] text-white font-bold text-sm rounded-xl flex items-center gap-2"
                    >
                      <span>Choose Time &amp; Format</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Consultation Format & Slot Selection */}
              {step === 3 && (
                <div key="step-3" className="apex-step-enter space-y-5">
                  <div>
                    <h4 className="font-serif-display text-lg font-bold text-[#30251F]">
                      Step 3: Consultation Format &amp; Appointment Time
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select how and when you would prefer to consult with our partners.
                    </p>
                  </div>

                  {/* Format Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'phone', label: 'Telephone Call', icon: Phone },
                      { id: 'video', label: 'Secure Zoom', icon: Video },
                      { id: 'in-person', label: 'In-Person Office', icon: Building2 }
                    ].map((fmt) => {
                      const Icon = fmt.icon;
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setConsultationType(fmt.id as any)}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                            consultationType === fmt.id
                              ? 'border-[#5F6F2F] bg-[#F1F3E8] text-[#46521F] font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-[#708238]" />
                          <span className="text-xs">{fmt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Date Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none"
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      Available Time Windows
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
                      {timeSlots.map((ts) => (
                        <button
                          key={ts}
                          type="button"
                          onClick={() => setSelectedTime(ts)}
                          className={`py-2 px-1 rounded-lg border text-center transition-colors ${
                            selectedTime === ts
                              ? 'border-[#5F6F2F] bg-[#708238] text-white font-bold'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {ts}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-[#708238] hover:bg-[#5F6F2F] text-white font-bold text-sm rounded-xl flex items-center gap-2"
                    >
                      <span>Final Step: Contact Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Contact & Final Submit */}
              {step === 4 && (
                <form key="step-4" onSubmit={handleSubmit} className="apex-step-enter space-y-5">
                  <div>
                    <h4 className="font-serif-display text-lg font-bold text-[#30251F]">
                      Step 4: Who Is Booking This Case Review?
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      We will contact you promptly at this telephone number.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Full Legal Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Jonathan Mercer"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Telephone Number <span className="text-rose-500">*</span>
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

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">
                        Email Address (For Zoom / Calendar Invite)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-[#708238] focus:border-[#708238] outline-none"
                      />
                    </div>
                  </div>

                  {/* Summary preview */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between font-semibold text-[#41342E]">
                      <span>Appointment Request:</span>
                      <span className="capitalize">{practiceArea.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scheduled Window:</span>
                      <span>{selectedDate} at {selectedTime} ({consultationType})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Protected by strict California Attorney Work Product and Confidentiality rules.</span>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
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
                          <span>Confirming Booking...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Confirm Consultation Booking</span>
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
    </div>
  );
};



