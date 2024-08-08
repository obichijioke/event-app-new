"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { account, avatar, databases } from "../appwrite";
import { useRouter } from "next/navigation";
import useErrorHandler from "../hooks/useErrorHandler";
import { ID, Query } from "appwrite";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const handleError = useErrorHandler();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const session = await account.get();
      const userDocument = await databases.getDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
        session.$id
      );
      setUser(userDocument);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkUser();
      router.push("/dashboard");
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      router.push("/login");
    } catch (error) {
      handleError(error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const user = await account.create("unique()", email, password, name);
      await account.createEmailPasswordSession(email, password);
      await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID!,
        user.$id,
        {
          imageUrl: avatar.getInitials(user.name),
          name: user.name,
          email: user.email,
        }
      );
      await checkUser();
      router.push("/dashboard");
    } catch (error) {
      handleError(error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
