"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/" className="flex items-center py-4 px-2">
                <span className="font-semibold text-gray-500 text-lg">
                  EventBrite Clone
                </span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className="py-4 px-2 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/events"
                className="py-4 px-2 text-gray-500 hover:text-gray-900"
              >
                Events
              </Link>
              <Link
                href="/create-event"
                className="py-4 px-2 text-gray-500 hover:text-gray-900"
              >
                Create Event
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <Image
                      src={user.imageUrl}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="font-medium text-gray-700">
                      {user.name}
                    </span>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-gray-100"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="py-2 px-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-400"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-gray-900"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu md:hidden">
          <Link href="/" className="block py-2 px-4 text-sm hover:bg-gray-200">
            Home
          </Link>
          <Link
            href="/events"
            className="block py-2 px-4 text-sm hover:bg-gray-200"
          >
            Events
          </Link>
          <Link
            href="/create"
            className="block py-2 px-4 text-sm hover:bg-gray-200"
          >
            Create Event
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="block py-2 px-4 text-sm hover:bg-gray-200"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block py-2 px-4 text-sm hover:bg-gray-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-200"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block py-2 px-4 text-sm hover:bg-gray-200"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="block py-2 px-4 text-sm hover:bg-gray-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
