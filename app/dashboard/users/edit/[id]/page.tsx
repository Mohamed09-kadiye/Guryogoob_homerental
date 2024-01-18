import Form from '@/app/dashboard/users/edit/[id]/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import EditForm from '@/app/dashboard/users/edit/[id]/edit-form';

interface PageProps {
  params: {
    id: string; // Adjust the type of id based on your requirements
  };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;
  try {
    const res = await fetch(`http://localhost:9092/api/users/${id}`);
    if (!res.ok) {
      console.log("Failed to fetch user details");
      return <div>Error fetching user details</div>;
    }

    const detail = await res.json();

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Users', href: '/dashboard/users' },
            {
              label: 'Edit Users',
              href: '/dashboard/Users/edit',
              active: true,
            },
          ]}
        />

        <EditForm detail={detail}/>
      </main>
    );
  } catch (error) {
    console.error("Error fetching user details:", error);
    return <div>Error fetching user details</div>;
  }
}
