'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/ui/button";
import { KeyIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent } from "react";

export default function CreateProperty() {
  const router = useRouter();
  const [propertyName, setPropertyName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [location, setLocation] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [available, setavailable] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);


  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const jsonData = {
        propertyName,
        type,
        description,
        price: parseFloat(price), // Convert to number
        roomCount: parseInt(roomCount), // Convert to number
        location,
        ownerId: parseInt(ownerId), // Convert to number
        available:  parseInt(available),
        dateCreated: new Date().toISOString(),
        imageUrl: imageFile ? imageFile.name : '',
      };
  
      console.log("Form Data before fetch:", jsonData);
  
      const res = await fetch("http://localhost:9092/api/properties", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        const responseBody = await res.text();
        throw new Error(`Failed to create property. Server returned status ${res.status}. Response body: ${responseBody}`);
      }
  
      // If successful, refresh and navigate
      router.refresh();
      router.push("/dashboard/properties");
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };
  

  

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(file.name); // Show the file name as a placeholder
    } else {
      // Reset the imageFile state when no file is selected
      setImageFile(null);
      setImageUrl(''); // Reset imageUrl to an empty string or null, depending on your use case
    }
  };

  
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
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
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
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
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
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Property Price"
            />
          </div>
        

          {/* Room Count */}
          <div className="mb-4">
            <label htmlFor="roomCount" className="block text-sm font-medium">
              Enter Room Count
            </label>
            <input
              type="text"
              id="roomCount"
              name="roomCount"
              value={roomCount}
              onChange={(e) => setRoomCount(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
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
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Location"
            />
          </div>
            {/* Property owner */}
            <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">
              Enter Property ownerId
            </label>
            <input
              type="number"
              id="owner"
              name="owner"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Property owner"
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
              value={available || ''}
              onChange={(e) => setavailable(e.target.value)}
              className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="" disabled>Select Availability</option>
              <option value="1">Available</option>
              <option value="0">Not Available</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">
              Choose Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
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
            <Button type="submit">Create Property</Button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
}




