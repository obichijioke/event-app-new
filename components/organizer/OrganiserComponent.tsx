import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  PlusCircleIcon,
  BarChart3Icon,
  UsersIcon,
  DollarSignIcon,
} from "lucide-react";

export default function Component() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="@johndoe"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John</h1>
            <p className="text-muted-foreground">Event Organizer</p>
          </div>
        </div>
        <Button>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Create New Event
        </Button>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Attendees
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sales</CardTitle>
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              You have 3 events in the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                {
                  name: "Tech Conference 2023",
                  date: "Sep 15",
                  attendees: 500,
                },
                { name: "Product Launch", date: "Sep 18", attendees: 200 },
                { name: "Networking Mixer", date: "Sep 20", attendees: 100 },
              ].map((event, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                  <Badge>{event.attendees} attendees</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                {
                  action: "New ticket sold",
                  event: "Tech Conference 2023",
                  time: "2 minutes ago",
                },
                {
                  action: "Updated event details",
                  event: "Product Launch",
                  time: "1 hour ago",
                },
                {
                  action: "New speaker confirmed",
                  event: "Tech Conference 2023",
                  time: "3 hours ago",
                },
                {
                  action: "Sent invitations",
                  event: "Networking Mixer",
                  time: "5 hours ago",
                },
              ].map((activity, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CalendarIcon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.event}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
