import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import { CompanyProvider } from '@/context/CompanyContext';
import React from 'react';
import { prisma } from '@/lib/prisma';

interface CompanyLayoutProps {
  children: React.ReactNode;
  params: {
    companySlug: string;
  };
}

export default async function CompanyLayout({
  children,
  params,
}: CompanyLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // Next.js 15 params are async, but usually 14 are not.
  // We'll treat as sync for now, if error, we'll await it (User can correct).
  // Safely handling params
  const { companySlug } = await params;

  const company = await prisma.company.findUnique({
    where: {
      slug: companySlug,
    },
  });

  if (!company) {
    notFound();
  }

  // Check Membership
  const membership = await prisma.companyMember.findUnique({
    where: {
      companyId_userId: {
        companyId: company.id,
        userId: userId,
      },
    },
    include: {
      user: {
        include: {
          assignments: {
            where: { companyId: company.id, isActive: true },
            include: {
              role: {
                include: {
                  permissions: {
                    include: { permission: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!membership || membership.status !== 'ACTIVE') {
    // Determine what to do. For now, redirect or show error.
    // Spec doesn't strictly say, but usually 403.
    // We'll redirect to /app (selection) if not a member.
    // Or render a "Not Authorized" component.
    // For simplicity:
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p>You are not an active member of this company.</p>
        </div>
      </div>
    );
  }

  return (
    <CompanyProvider
      company={{ id: company.id, name: company.name }}
      member={{
        id: membership.id,
        userId: membership.userId,
        status: membership.status,
        assignments: membership.user.assignments.map((a) => ({
          scopeType: a.scopeType,
          scopeId: a.scopeId,
          role: {
            key: a.role.key,
            permissions: a.role.permissions.map((rp) => ({
              key: rp.permission.key,
            })),
          },
        })),
      }}
    >
      {children}
    </CompanyProvider>
  );
}
