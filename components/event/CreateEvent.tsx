"use client";
import { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { storage, databases } from "@/appwrite";
import { useDropzone } from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import useErrorHandler from "@/hooks/useErrorHandler";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { MapPinIcon } from "lucide-react";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const eventTypes = ["venue", "online"];
const eventCategories = ["Conference", "Workshop", "Webinar", "Meetup"];

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  event_date: Yup.date().required("Event date is required"),
  event_time: Yup.string().required("Event time is required"),
  duration: Yup.string().required("Duration is required"),
  description: Yup.string().required("Description is required"),
  venue: Yup.string().required("Venue is required"),
  address1: Yup.string().required("Address line 1 is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string().required("Zip code is required"),
  bannerImage: Yup.mixed().nullable(),
});

export default function CreateEventComponent() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const handleError = useErrorHandler();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setBannerImage(acceptedFiles[0]);
      formik.setFieldValue("bannerImage", acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    maxFiles: 1,
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      event_date: "",
      event_time: "",
      duration: "",
      description: "",
      venue: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      zip: "",
      bannerImage: null,
    },
    validationSchema: EventSchema,
    onSubmit: async (values) => {
      console.log("Form submitted", values);
      setIsSubmitting(true);
      try {
        let bannerImageId = null;
        if (values.bannerImage) {
          const file = await storage.createFile(
            process.env.NEXT_PUBLIC_STORAGE_ID!,
            "unique()",
            values.bannerImage
          );
          bannerImageId = file.$id;
        }

        const eventData = {
          ...values,
          bannerImage: bannerImageId,
          event_date: new Date(values.event_date).toISOString(),
          event_time: values.event_time,
          user: user.$id,
        };

        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID!,
          process.env.NEXT_PUBLIC_API_EVENT_COLLECTION_ID!,
          "unique()",
          eventData
        );

        console.log("Event created:", response);
        toast.success("Event created successfully");
        formik.resetForm();
      } catch (error) {
        handleError(error);
        console.error("Error creating event:", error);
        if (error instanceof Error) {
          toast.error(`Failed to create event: ${error.message}`);
        } else {
          toast.error("An unknown error occurred");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleEditorChange = (content: string) => {
    formik.setFieldValue("description", content);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Give your event a name.*
              </label>
              <p className="text-sm text-gray-500">
                See how your name appears on the event page and a list of all
                places where your event name will be used.{" "}
                <a href="#" className="text-blue-500">
                  Learn more
                </a>
              </p>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter event name here"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.title}
                </div>
              )}
            </div>

            {/* Event Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Choose a category for your event.*
              </label>
              <p className="text-sm text-gray-500">
                Select a category that best describes your event. This will help
                attendees find your event more easily.
              </p>
              <Select
                name="category"
                onValueChange={(value) =>
                  formik.setFieldValue("category", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.category}
                </div>
              )}
            </div>

            {/* Event Date, Time, and Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                When is your event?*
              </label>
              <p className="text-sm text-gray-500">
                Tell your attendees when your event starts so they can get ready
                to attend.
              </p>
              <div className="flex gap-4 mt-2">
                <Input
                  id="event_date"
                  name="event_date"
                  type="date"
                  placeholder="MM/DD/YYYY"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.event_date}
                />
                <Input
                  id="event_time"
                  name="event_time"
                  type="time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.event_time}
                />
                <Select
                  name="duration"
                  onValueChange={(value) =>
                    formik.setFieldValue("duration", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {["30m", "1h", "1h 30m", "2h", "2h 30m", "3h"].map(
                      (duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              {formik.touched.event_date && formik.errors.event_date && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.event_date}
                </div>
              )}
              {formik.touched.event_time && formik.errors.event_time && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.event_time}
                </div>
              )}
              {formik.touched.duration && formik.errors.duration && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.duration}
                </div>
              )}
            </div>

            {/* Banner Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Add a few images to your event banner.
              </label>
              <p className="text-sm text-gray-500">
                Upload images that represent your event. These images will be
                displayed on the event page.
              </p>
              <div
                {...getRootProps()}
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                  isDragActive ? "bg-gray-100" : ""
                }`}
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <input {...getInputProps()} />
                    <p className="pl-1">
                      {bannerImage
                        ? bannerImage.name
                        : "Drag and drop an image, or click to select"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {formik.touched.bannerImage && formik.errors.bannerImage && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.bannerImage}
                </div>
              )}
            </div>

            {/* Event Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Please describe your event.
              </label>
              <p className="text-sm text-gray-500">
                Write a few words below to describe your event and provide any
                extra information such as schedules, itinerary or any special
                instructions required to attend your event.
              </p>
              <ReactQuill
                value={formik.values.description}
                onChange={(content) =>
                  formik.setFieldValue("description", content)
                }
                className="mt-2"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              )}
            </div>

            {/* Venue Details */}
            <div>
              <label
                htmlFor="venue"
                className="block text-sm font-medium text-gray-700"
              >
                Where is your event taking place?*
              </label>
              <p className="text-sm text-gray-500">
                Add a venue to your event to tell your attendees where to join
                the event.
              </p>
              <div className="mt-2">
                <Map />
              </div>
              <Input
                id="venue"
                name="venue"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.venue}
                placeholder="Venue"
                className="mt-2"
              />
              {formik.touched.venue && formik.errors.venue && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.venue}
                </div>
              )}
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="address1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address line 1*
                </label>
                <Input
                  id="address1"
                  name="address1"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address1}
                />
                {formik.touched.address1 && formik.errors.address1 && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.address1}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="address2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address line 2
                </label>
                <Input
                  id="address2"
                  name="address2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address2}
                />
              </div>
            </div>

            {/* Country, State, City, Zip */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country*
                </label>
                <Input
                  id="country"
                  name="country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.country}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State*
                </label>
                <Input
                  id="state"
                  name="state"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.state}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City/Suburb*
                </label>
                <Input
                  id="city"
                  name="city"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.city}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip/Post Code*
                </label>
                <Input
                  id="zip"
                  name="zip"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip}
                />
                {formik.touched.zip && formik.errors.zip && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.zip}
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !formik.isValid}
            >
              {isSubmitting ? "Creating..." : "Next"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
