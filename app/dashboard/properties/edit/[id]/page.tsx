// edit/[id]/page.tsx
import EditPropertyForm from '@/app/dashboard/properties/edit/[id]/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

interface PageProps {
  params: {
    id: string; // Adjust the type of id based on your requirements
  };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;

  try {
    const res = await fetch(`http://localhost:9092/api/properties/${id}`);
    if (!res.ok) {
      console.log("Failed to fetch property details");
      return <div>Error fetching property details</div>;
    }

    const detail = await res.json();

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Properties', href: '/dashboard/properties' },
            {
              label: 'Edit Property',
              href: `/dashboard/properties/edit/${id}`,
              active: true,
            },
          ]}
        />

        <EditPropertyForm detail={detail} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching property details:", error);
    return <div>Error fetching property details</div>;
  }
}
