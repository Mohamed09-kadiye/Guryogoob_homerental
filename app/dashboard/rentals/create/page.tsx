// pages/dashboard/rentals/index.tsx
import Link from 'next/link';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import CreateRentalForm from '@/app/dashboard/rentals/create/create-form';

export default function CreateRentalPage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'rentals', href: '/dashboard/rentals' },
          {
            label: 'Create ',
            href: '/dashboard/rentals/create',
            active: true,
          },
        ]}
      />
      <CreateRentalForm />
    </main>
  );
}
