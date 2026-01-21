'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Define types compatible with Prisma result, but kept simple for the Context
export interface CompanyContextState {
  company: {
    id: string;
    name: string;
    // Add other company fields as needed
  } | null;
  member: {
    id: string;
    userId: string;
    status: 'ACTIVE' | 'SUSPENDED' | 'LEFT';
    // assignments needed for RBAC
    assignments: import('@/lib/rbac').RbacAssignment[];
  } | null;
  isLoading: boolean;
}

const CompanyContext = createContext<CompanyContextState | undefined>(
  undefined
);

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}

interface CompanyProviderProps {
  children: ReactNode;
  company: CompanyContextState['company'];
  member: CompanyContextState['member'];
}

export function CompanyProvider({
  children,
  company,
  member,
}: CompanyProviderProps) {
  // We can add client-side logic here if needed, or effects.
  // For now, it simply passes down the server-fetched data.

  const value = {
    company,
    member,
    isLoading: false, // Since we are feeding it from Server Component, it's ready.
  };

  return (
    <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>
  );
}
