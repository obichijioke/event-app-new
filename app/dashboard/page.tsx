"use client";

import { useEffect, useState } from "react";
import { account } from "../../appwrite";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const session = await account.get();
        setUser(session);
      } catch (error) {
        console.error("Not logged in:", error);
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Log Out
      </button>
    </div>
  );
}
