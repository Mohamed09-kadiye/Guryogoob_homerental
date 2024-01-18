import { EyeIcon, IdentificationIcon, MapIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateProperty() {
  return (
    <Link
      href="/dashboard/properties/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create properties</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProperty({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/properties/edit/${id}`} // Update the path with your actual edit route
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
import Swal from 'sweetalert2';

interface DeletePropertyProps {
  id: string;
}

export function DeleteProperty({ id }: DeletePropertyProps) {
  const handleDelete = async () => {
    // Show a confirmation dialog before proceeding with the deletion
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:9092/api/properties/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to delete owner');
        }

        // Optionally, you can update the UI by removing the deleted owner from the state
        // or triggering a re-fetch of the owner list.

        console.log('Owner deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting owner:', error);
      }
    }
  };

  return (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={handleDelete}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}



export function ProfileProperty({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/properties/profile/${id}`} // Update the path with your actual edit route
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}