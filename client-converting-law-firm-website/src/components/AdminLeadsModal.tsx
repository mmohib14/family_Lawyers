import React, { useState, useEffect } from 'react';
import { X, Shield, Clock, Phone, Mail, CheckCircle2, RefreshCw, AlertTriangle, Send } from 'lucide-react';
import { StoredLead } from '../types';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#241B17]/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 shadow-2xl">
        {/* Header */}
        <div className="bg-[#41342E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#708238]/20 text-[#87994B] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-lg text-slate-100">
                Client Intake &amp; Lead Management Console
              </h3>
              <p className="text-xs text-[#87994B]">
                Real-Time Express REST API Store - Webhook / Nodemailer Dispatch Telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              className="p-2 text-slate-400 hover:text-white hover:bg-[#41342E] rounded-lg transition-colors"
              title="Refresh intake queue"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-[#41342E] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-bar with notification pipeline explanation */}
        <div className="p-3.5 bg-[#F1F3E8] border-b border-[#D5DDBB] flex items-center justify-between text-xs text-[#46521F]">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#5F6F2F]" />
            <span>
              <strong>Automated Triage:</strong> Every intake form triggers a Nodemailer duty alert and CRM webhook event.
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#D5DDBB]/80 font-bold text-[11px]">
            {leads.length} Active Records
          </span>
        </div>

        {/* Lead Table / List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F7F3F1]">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No leads currently recorded. Submit a consultation form to test live capture.
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow transition-shadow space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-[#30251F]">{lead.fullName}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        lead.urgency === 'critical'
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : lead.urgency === 'high'
                          ? 'bg-[#E6EAD7] text-[#53632A] border border-[#D5DDBB]'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lead.urgency} Urgency
                    </span>
                    <span className="text-[11px] text-slate-400">ID: {lead.id}</span>
                  </div>

                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(lead.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#708238]" />
                    <a href={`tel:${lead.phone}`} className="font-semibold text-[#41342E] hover:underline">
                      {lead.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lead.email}</span>
                  </div>
                  <div className="capitalize font-medium text-[#41342E]">
                    Area: {lead.practiceArea.replace('-', ' ')}
                  </div>
                </div>

                <p className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-100">
                  <strong className="text-[#30251F]">Case Synopsis:</strong> {lead.caseSummary}
                </p>

                {lead.preferredDate && (
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#5F6F2F]" />
                    <span>
                      Requested: {lead.preferredDate} at {lead.preferredTime} ({lead.consultationType})
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#30251F] hover:bg-[#41342E] text-white text-xs font-semibold"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};



