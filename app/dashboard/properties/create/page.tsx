import Form from '@/app/dashboard/properties/create/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'properties', href: '/dashboard/properties' },
          {
            label: 'Create ',
            href: '/dashboard/properties/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}