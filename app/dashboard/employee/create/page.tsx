import Form from '@/app/dashboard/employee/create/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Employee', href: '/dashboard/employee' },
          {
            label: 'Create Employee',
            href: '/dashboard/employee/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}