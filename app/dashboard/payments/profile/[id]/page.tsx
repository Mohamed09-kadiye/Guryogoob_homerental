// pages/payments/profile/[id]/page.tsx

import React from 'react';
import PaymentsProfile from '@/app/dashboard/payments/profile/[id]/profile';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;

  try {
    const res = await fetch(`http://localhost:9092/api/payments/${id}`);
    if (!res.ok) {
      console.log('Failed to fetch payment details');
      return <div>Error fetching payment details</div>;
    }

    const detail = await res.json();

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Payments', href: '/dashboard/payments' },
            {
              label: 'statement',
              href: `/dashboard/payments/profile/${id}`,
              active: true,
            },
          ]}
        />

        <PaymentsProfile detail={detail} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return <div>Error fetching payment details</div>;
  }
}
