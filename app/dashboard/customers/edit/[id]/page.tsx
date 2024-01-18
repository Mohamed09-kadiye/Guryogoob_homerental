// pages/dashboard/customers/edit/[id]/index.tsx
import { fetchCustomers } from '@/app/lib/data';
import EditForm from '@/app/dashboard/customers/edit/[id]/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

interface PageProps {
  params: {
    id: string;
  };
}

export default function EditCustomerPage({ params }: PageProps) {
  const customerId = params.id;

  return (
    <main>
       <Breadcrumbs
          breadcrumbs={[
            { label: 'customers', href: '/dashboard/customers' },
            {
              label: 'Edit customersers',
              href: '/dashboard/customers/edit',
              active: true,
            },
          ]}
        />
      {/* Your Breadcrumbs component or any other header components */}
      <EditForm customerId={customerId} />
    </main>
  );
}
