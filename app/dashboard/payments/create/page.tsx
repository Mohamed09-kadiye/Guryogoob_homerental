// pages/dashboard/payments/create/page.tsx

import PaymentCreateForm from '@/app/dashboard/payments/create/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

export default function PaymentCreatePage() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'payments', href: '/dashboard/payments' },
          {
            label: 'Create ',
            href: '/dashboard/payments/create',
            active: true,
          },
        ]}
      />
      <PaymentCreateForm />
    </main>
  );
}
