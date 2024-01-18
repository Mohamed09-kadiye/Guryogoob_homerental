import Profile from '@/app/dashboard/owners/profile/[id]/profile';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

interface PageProps {
  params: {
    id: string; // Adjust the type of id based on your requirements
  };
}

export default async function Page({ params }: PageProps) {
  const id = params.id;

  try {
    const res = await fetch(`http://localhost:9092/api/owners/${id}`);
    if (!res.ok) {
      console.log("Failed to fetch owner details");
      return <div>Error fetching owner details</div>;
    }

    const detail = await res.json();

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Owners', href: '/dashboard/owners/' },
            {
              label: 'profile',
              href: `/dashboard/owners/profile/${id}`,
              active: true,
            },
          ]}
        />

        <Profile detail={detail} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching owner details:", error);
    return <div>Error fetching owner details</div>;
  }
}
