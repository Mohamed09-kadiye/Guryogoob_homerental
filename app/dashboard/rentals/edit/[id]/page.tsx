// pages/dashboard/rentals/edit/[id]/index.tsx
import EditRentalForm from '@/app/dashboard/rentals/edit/[id]/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

interface PageProps {
  params: {
    id: string; // Adjust the type of id based on your requirements
  };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;

  try {
    const res = await fetch(`http://localhost:9092/api/rentals/${id}`);
    if (!res.ok) {
      console.log("Failed to fetch rental details");
      return <div>Error fetching rental details</div>;
    }

    const detail = await res.json();

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Rentals', href: '/dashboard/rentals' },
            {
              label: 'Edit Rental',
              href: `/dashboard/rentals/edit/${id}`,
              active: true,
            },
          ]}
        />

        <EditRentalForm detail={detail} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching rental details:", error);
    return <div>Error fetching rental details</div>;
  }
}
