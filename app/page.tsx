import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Search, MapPin, Layers, ArrowUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 overflow-hidden relative">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg
            className="w-10 h-10"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 0L46.6506 12.5V37.5L25 50L3.34936 37.5V12.5L25 0Z"
              fill="#FF1493"
            />
            <path
              d="M25 0L46.6506 12.5V37.5L25 50L3.34936 37.5V12.5L25 0Z"
              fill="#00CED1"
              fillOpacity="0.5"
            />
          </svg>
          <span className="font-bold text-xl">EXHIBZ</span>
        </div>
        <nav className="hidden lg:flex space-x-6">
          {["HOME", "ABOUT", "SPEAKERS", "SCHEDULE", "EVENTS", "BLOG"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-gray-900 flex items-center"
              >
                {item} <ChevronDown className="ml-1 w-4 h-4" />
              </a>
            )
          )}
        </nav>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          LOGIN/REGISTER
        </Button>
      </header>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-20 pb-32 relative">
        {/* Left decorative shapes */}
        <div className="absolute left-0 top-1/4 -translate-x-1/2 w-96 h-[32rem] overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600 rounded-3xl transform -rotate-12"></div>
          <div className="absolute top-20 left-20 w-48 h-48 bg-yellow-400 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-3xl transform rotate-12"></div>
          <div className="absolute bottom-24 left-12 w-32 h-32 bg-green-400 rounded-full"></div>
        </div>

        {/* Right decorative shapes */}
        <div className="absolute right-0 top-1/4 translate-x-1/2 w-96 h-[32rem] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400 rounded-3xl transform -rotate-12"></div>
          <div className="absolute top-32 left-12 w-40 h-40 bg-orange-400 rounded-3xl transform rotate-45"></div>
        </div>

        <h2 className="text-yellow-500 text-3xl mb-4 text-center font-cursive">
          The Leading Platform for
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center text-gray-800 leading-tight">
          EVENTS, MEETUPS &<br />
          CONFERENCES
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          World&apos;s most influential media, entertainment & technology show
          inspirational speakers including game changing ideas.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-full shadow-lg p-2 max-w-4xl mx-auto flex flex-wrap justify-center">
          <div className="flex items-center px-4 flex-grow">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <Input
              className="border-0 focus:ring-0"
              placeholder="Search for event"
            />
          </div>
          <div className="flex items-center px-4 border-l border-gray-200">
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <Select>
              <SelectTrigger className="border-0 focus:ring-0">
                <SelectValue placeholder="Event Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
                <SelectItem value="paris">Paris</SelectItem>
                <SelectItem value="berlin">Berlin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center px-4 border-l border-gray-200">
            <Layers className="w-5 h-5 text-gray-400 mr-2" />
            <Select>
              <SelectTrigger className="border-0 focus:ring-0">
                <SelectValue placeholder="Event Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="expo">Expo</SelectItem>
                <SelectItem value="meetup">Meetup</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-8">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scroll to top button */}
      <Button className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3">
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  );
}
