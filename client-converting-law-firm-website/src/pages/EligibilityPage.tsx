import React from 'react';
import { EligibilityWidget } from '../components/EligibilityWidget';

interface EligibilityPageProps {
  onLeadSubmitted: (leadId: string, name: string) => void;
}

export const EligibilityPage: React.FC<EligibilityPageProps> = ({ onLeadSubmitted }) => (
  <div className="py-8 sm:py-12">
    <EligibilityWidget onLeadSubmitted={onLeadSubmitted} />
  </div>
);
