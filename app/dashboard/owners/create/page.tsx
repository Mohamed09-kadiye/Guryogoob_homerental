import Form from '@/app/dashboard/owners/create/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'owners', href: '/dashboard/owners' },
          {
            label: 'Create ',
            href: '/dashboard/owners/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}