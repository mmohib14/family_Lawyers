import React from 'react';
import { CaseResultsSection } from '../components/CaseResultsSection';

interface CaseResultsPageProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

export const CaseResultsPage: React.FC<CaseResultsPageProps> = ({ onOpenScheduler }) => (
  <div className="py-8 sm:py-12">
    <CaseResultsSection onOpenScheduler={onOpenScheduler} />
  </div>
);
