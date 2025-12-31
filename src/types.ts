
// Add React import to support React.ReactNode type reference
import React from 'react';

export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export interface ContactInfo {
  name: string;
  phone: string;
}
