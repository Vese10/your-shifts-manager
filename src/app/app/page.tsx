import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SelectCompanyPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const memberships = await prisma.companyMember.findMany({
    where: { userId, status: 'ACTIVE' },
    include: { company: true },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Select Company
        </h1>

        {memberships.length === 0 ? (
          <p className="text-center text-gray-500">
            You are not a member of any company yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {memberships.map((m) => (
              <li key={m.id}>
                <Link
                  href={`/app/${m.company.slug}`}
                  className="block rounded-xl border p-4 transition-colors hover:border-blue-500 hover:bg-gray-50"
                >
                  <span className="text-lg font-semibold">
                    {m.company.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
