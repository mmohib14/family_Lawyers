import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { PracticeAreaModal } from './components/PracticeAreaModal';
import { ConsultationSchedulerModal } from './components/ConsultationSchedulerModal';
import { ChatWidget } from './components/ChatWidget';
import { StickyMobileBar } from './components/StickyMobileBar';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { PRACTICE_AREAS } from './data/legalData';
import { CheckCircle2, X } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { PracticeAreasPage } from './pages/PracticeAreasPage';
import { PracticeAreaDetailPage } from './pages/PracticeAreaDetailPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { CaseResultsPage } from './pages/CaseResultsPage';
import { AttorneysPage } from './pages/AttorneysPage';
import { ContactPage } from './pages/ContactPage';
import { SiteFooter } from './components/SiteFooter';

export default function App() {
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [prefilledPracticeArea, setPrefilledPracticeArea] = useState<string | undefined>(undefined);
  const [selectedPracticeAreaId, setSelectedPracticeAreaId] = useState<string | null>(null);
  const [adminLeadsOpen, setAdminLeadsOpen] = useState(false);
  const [toastNotification, setToastNotification] = useState<{ id: string; name: string } | null>(null);

  const handleOpenScheduler = (practiceAreaId?: string) => {
    setPrefilledPracticeArea(practiceAreaId);
    setSchedulerOpen(true);
  };

  const handleLeadSubmitted = (id: string, name: string) => {
    setToastNotification({ id, name });
    setTimeout(() => {
      setToastNotification(null);
    }, 8000);
  };

  const handleScrollToEligibility = () => {
    window.location.assign('/eligibility');
  };

  const selectedPracticeArea = PRACTICE_AREAS.find((pa) => pa.id === selectedPracticeAreaId) || null;

  return (
    <div className="min-h-screen bg-[#F7F3F1] text-[#334155] flex flex-col selection:bg-[#E6EAD7] selection:text-[#46521F] font-body">
      {toastNotification && (
        <div className="fixed top-14 right-4 z-50 bg-[#41342E] border border-[#708238]/60 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-md">
          <div className="w-8 h-8 rounded-full bg-[#708238] text-[#241B17] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-[#87994B]">Intake Dispatched to Duty Attorney</p>
            <p className="text-slate-300">
              Case #{toastNotification.id} logged for {toastNotification.name}. Response team notified.
            </p>
          </div>
          <button
            onClick={() => setToastNotification(null)}
            className="text-slate-400 hover:text-white ml-1 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <Header
        onOpenScheduler={handleOpenScheduler}
        onOpenPracticeArea={(id) => {
          setSelectedPracticeAreaId(id);
        }}
        onOpenAdminLeads={() => setAdminLeadsOpen(true)}
      />

      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenScheduler={() => handleOpenScheduler()} onScrollToEligibility={handleScrollToEligibility} />}
          />
          <Route
            path="/practice-areas"
            element={<PracticeAreasPage onOpenPracticeArea={(id) => setSelectedPracticeAreaId(id)} onOpenScheduler={handleOpenScheduler} />}
          />
          <Route
            path="/practice-areas/:practiceAreaId"
            element={<PracticeAreaDetailPage onOpenScheduler={handleOpenScheduler} />}
          />
          <Route
            path="/eligibility"
            element={<EligibilityPage onLeadSubmitted={handleLeadSubmitted} />}
          />
          <Route path="/case-results" element={<CaseResultsPage onOpenScheduler={handleOpenScheduler} />} />
          <Route path="/attorneys" element={<AttorneysPage onOpenScheduler={handleOpenScheduler} />} />
          <Route
            path="/contact"
            element={<ContactPage onOpenScheduler={handleOpenScheduler} onOpenPracticeArea={(id) => setSelectedPracticeAreaId(id)} onLeadSuccess={handleLeadSubmitted} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <SiteFooter onOpenScheduler={() => handleOpenScheduler()} />

      <ChatWidget onOpenScheduler={handleOpenScheduler} />
      <StickyMobileBar onOpenScheduler={() => handleOpenScheduler()} />

      <ConsultationSchedulerModal
        isOpen={schedulerOpen}
        onClose={() => setSchedulerOpen(false)}
        prefillPracticeArea={prefilledPracticeArea}
        onLeadSuccess={handleLeadSubmitted}
      />

      <PracticeAreaModal
        practiceArea={selectedPracticeArea}
        onClose={() => setSelectedPracticeAreaId(null)}
        onOpenScheduler={handleOpenScheduler}
      />

      <AdminLeadsModal
        isOpen={adminLeadsOpen}
        onClose={() => setAdminLeadsOpen(false)}
      />
    </div>
  );
}

