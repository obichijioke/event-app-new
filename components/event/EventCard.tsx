import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";

export default function EventCard() {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <img
        src="https://generated.vusercontent.net/placeholder.svg"
        alt="Event cover image"
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <h2 className="text-2xl font-bold">Tech Conference 2023</h2>
        <p className="text-sm text-muted-foreground">Hosted by TechCorp</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <span>September 15, 2023</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <ClockIcon className="w-4 h-4 text-muted-foreground" />
          <span>9:00 AM - 5:00 PM</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <MapPinIcon className="w-4 h-4 text-muted-foreground" />
          <span>San Francisco Convention Center</span>
        </div>
        <p className="text-sm">
          Join us for a day of cutting-edge technology talks, workshops, and
          networking opportunities with industry leaders.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">RSVP Now</Button>
      </CardFooter>
    </Card>
  );
}
