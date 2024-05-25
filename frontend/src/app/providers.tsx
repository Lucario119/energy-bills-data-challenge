'use client';

import BillsDataProvider from '@/contexts/BillsDataContext';
import { ReactNode } from 'react';

interface ProviderProps{
  children: ReactNode
}

export function Providers({children}: ProviderProps) {
  return (
   <BillsDataProvider>
    {children}
   </BillsDataProvider>
  );
}