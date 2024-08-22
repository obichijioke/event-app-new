"use client";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    website: user?.website || "",
  });

  if (!user) return <div>Loading...</div>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/3 p-6 bg-gray-100">
          <div className="flex flex-col items-center">
            <Image
              src={user.imageUrl || "https://via.placeholder.com/150"}
              alt="User avatar"
              width={150}
              height={150}
              className="rounded-full border-4 border-white"
            />
            <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 mt-2">
              {user.bio || "No bio provided"}
            </p>
            <div className="mt-4">
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-green-500">
                Facebook
              </a>
              <a href="#" className="text-green-500">
                Instagram
              </a>
              <a href="#" className="text-green-500">
                Twitter
              </a>
              <a href="#" className="text-green-500">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
              />
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />
              <Input
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Website"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          ) : (
            <div>
              <h2 className="text-xl font-semibold">About</h2>
              <p className="text-gray-600 mt-2">
                {user.bio || "No bio provided"}
              </p>
              <h2 className="text-xl font-semibold mt-4">Location</h2>
              <p className="text-gray-600">
                {user.location || "No location provided"}
              </p>
              <h2 className="text-xl font-semibold mt-4">Website</h2>
              <p className="text-gray-600">
                {user.website ? (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website provided"
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
