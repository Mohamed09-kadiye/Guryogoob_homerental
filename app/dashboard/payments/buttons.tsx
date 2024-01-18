import { EyeIcon, IdentificationIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreatePayment() {
  return (
    <Link
      href="/dashboard/payments/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create payments</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePayment({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/payments/edit/${id}`} // Update the path with your actual edit route
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
import Swal from 'sweetalert2';

interface DeleteUsersProps {
  id: string;
}

export function DeletePayment({ id }: DeleteUsersProps) {
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
        const res = await fetch(`http://localhost:9092/api/payments/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to delete payments');
        }

        // Optionally, you can update the UI by removing the deleted owner from the state
        // or triggering a re-fetch of the owner list.

        console.log('payments deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting payments:', error);
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



export function ProfilePayment({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/payments/profile/${id}`} // Update the path with your actual edit route
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <IdentificationIcon className="w-5" />
    </Link>
  );
}