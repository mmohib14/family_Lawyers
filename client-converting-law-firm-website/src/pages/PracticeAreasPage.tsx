import React from 'react';
import { PracticeAreasGrid } from '../components/PracticeAreasGrid';

interface PracticeAreasPageProps {
  onOpenPracticeArea: (id: string) => void;
  onOpenScheduler: (prefillPracticeArea?: string) => void;
}

export const PracticeAreasPage: React.FC<PracticeAreasPageProps> = ({
  onOpenPracticeArea,
  onOpenScheduler
}) => (
  <div className="py-8 sm:py-12">
    <PracticeAreasGrid
      onOpenPracticeArea={onOpenPracticeArea}
      onOpenScheduler={onOpenScheduler}
    />
  </div>
);
