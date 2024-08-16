"use client";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Image
            src={user.imageUrl || "https://via.placeholder.com/100"}
            alt="User avatar"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* Add more user details as needed */}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Account Information</h3>
            <p>
              <strong>Account ID:</strong> {user.$id}
            </p>
            <p>
              <strong>Registration Date:</strong>{" "}
              {new Date(user.$createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
