import PropertyProfile from '@/app/dashboard/properties/profile/[id]/profile';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

interface ProfilePageProps {
  params: {
    id: string; // Adjust the type of id based on your requirements
  };
}

export default async function Page({ params }: ProfilePageProps) {
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
            { label: 'Properties', href: '/dashboard/properties/' },
            {
              label: 'Profile',
              href: `/dashboard/properties/profile/${id}`,
              active: true,
            },
          ]}
        />

        <PropertyProfile detail={detail} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching property details:", error);
    return <div>Error fetching property details</div>;
  }
}
