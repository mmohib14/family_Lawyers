import React from 'react';
import { ContactAndFooter } from '../components/ContactAndFooter';

interface ContactPageProps {
  onOpenScheduler: (prefillPracticeArea?: string) => void;
  onOpenPracticeArea: (id: string) => void;
  onLeadSuccess?: (id: string, name: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenScheduler,
  onOpenPracticeArea,
  onLeadSuccess
}) => (
  <ContactAndFooter
    onOpenScheduler={onOpenScheduler}
    onOpenPracticeArea={onOpenPracticeArea}
    onLeadSuccess={onLeadSuccess}
  />
);
