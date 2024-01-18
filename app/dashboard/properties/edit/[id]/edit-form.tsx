// edit/[id]/edit-form.tsx

'use client';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface PropertyDetails {
  id: number;
  propertyName: string;
  type: string;
  description: string;
  price: number;
  roomCount: number;
  location: string;
  ownerId: number;
  available: number;
  imageUrl: string;
}

const EditPropertyForm: React.FC<{ detail: PropertyDetails | undefined }> = ({ detail }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [propertyName, setPropertyName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [location, setLocation] = useState('');
  const [ownerId, setOwnerId] = useState(0);
  const [available, setAvailable] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        if (!detail) {
          console.error('Property details are undefined.');
          return;
        }

        const res = await fetch(`http://localhost:9092/api/properties/${detail.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch property details');
        }

        const propertyData: PropertyDetails = await res.json();
        setPropertyName(propertyData.propertyName);
        setType(propertyData.type);
        setDescription(propertyData.description);
        setPrice(propertyData.price);
        setRoomCount(propertyData.roomCount);
        setLocation(propertyData.location);
        setOwnerId(propertyData.ownerId);
        setAvailable(propertyData.available);
        setImageUrl(propertyData.imageUrl);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchPropertyDetails();
  }, [detail]);

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!detail) {
        console.error('Property details are undefined.');
        return;
      }

      const res = await fetch(`http://localhost:9092/api/properties/${detail.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyName,
          type,
          description,
          price,
          roomCount,
          location,
          ownerId,
          available,
          imageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update property');
      }

      // If successful, navigate to the properties page
      router.replace('/dashboard/properties');
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="">
        <form onSubmit={sendForm}>
          {/* Property Name */}
          <div className="mb-4">
            <label htmlFor="propertyName" className="block text-sm font-medium">
              Enter Property Name
            </label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Property Name"
            />
          </div>


          {/* Property Type */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium">
              Enter Property Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Property Type"
            />
          </div>

          {/* Property Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Enter Property Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Property Description"
            />
          </div>

          {/* Property Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">
              Enter Property Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Property Price"
            />
          </div>

          {/* Room Count */}
          <div className="mb-4">
            <label htmlFor="roomCount" className="block text-sm font-medium">
              Enter Room Count
            </label>
            <input
              type="number"
              id="roomCount"
              name="roomCount"
              value={roomCount}
              onChange={(e) => setRoomCount(parseInt(e.target.value, 10))}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Room Count"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium">
              Enter Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Location"
            />
          </div>

          {/* Property owner */}
          <div className="mb-4">
            <label htmlFor="owner" className="block text-sm font-medium">
              Enter Property Owner ID
            </label>
            <input
              type="number"
              id="owner"
              name="owner"
              value={ownerId}
              onChange={(e) => setOwnerId(parseInt(e.target.value, 10))}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Property Owner ID"
            />
          </div>

          {/* Availability */}
          <div className="mb-4">
            <label htmlFor="availability" className="block text-sm font-medium">
              Select Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={available}
              onChange={(e) => setAvailable(parseInt(e.target.value, 10))}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>Select Availability</option>
              <option value={1}>Available</option>
              <option value={2}>Not Available</option>
            </select>
          </div>

          {/* Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">
              Choose Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              // onChange={handleImageChange}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/properties"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Update Property</Button>
          </div>
          </form>
          </div>
          </div>
          );
          };


                    
          export default EditPropertyForm;
