"use client";
import { useState } from "react";
import { account } from "../appwrite";
import useErrorHandler from "../hooks/useErrorHandler";

interface EditProfileFormProps {
  user: any;
  onUpdate: () => void;
}

export default function EditProfileForm({
  user,
  onUpdate,
}: EditProfileFormProps) {
  const [name, setName] = useState(user.name);
  const [isLoading, setIsLoading] = useState(false);
  const handleError = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await account.updateName(name);
      onUpdate();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isLoading ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
