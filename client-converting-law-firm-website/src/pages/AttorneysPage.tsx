import React from 'react';
import { AttorneyProfiles } from '../components/AttorneyProfiles';

interface AttorneysPageProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

export const AttorneysPage: React.FC<AttorneysPageProps> = ({ onOpenScheduler }) => (
  <div className="py-8 sm:py-12">
    <AttorneyProfiles onOpenScheduler={onOpenScheduler} />
  </div>
);
