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

const eventTypes = ["venue", "online"];

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Event type is required"),
  description: Yup.string().required("Description is required"),
  start_time: Yup.date().required("Start time is required"),
  end_time: Yup.date()
    .required("End time is required")
    .min(Yup.ref("start_time"), "End time must be after start time"),
});

export default function CreateEventComponent() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const handleError = useErrorHandler();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setCoverImage(acceptedFiles[0]);
      formik.setFieldValue("coverImage", acceptedFiles[0]);
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
      type: "",
      description: "",
      start_time: "",
      end_time: "",
      coverImage: null,
    },
    validationSchema: EventSchema,
    onSubmit: async (values) => {
      //console.log("button clicked");
      setIsSubmitting(true);
      try {
        let coverImageId = null;
        if (values.coverImage) {
          const file = await storage.createFile(
            process.env.NEXT_PUBLIC_STORAGE_ID!,
            "unique()",
            values.coverImage
          );
          coverImageId = file.$id;
        }

        const eventData = {
          ...values,
          coverImage: coverImageId,
          start_time: new Date(values.start_time).toISOString(),
          end_time: new Date(values.end_time).toISOString(),
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
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Input
                id="title"
                name="title"
                type="text"
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

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Event Type
              </label>
              <Select
                name="type"
                onValueChange={(value) => formik.setFieldValue("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.type && formik.errors.type && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.type}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.description}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="start_time"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>
              <Input
                id="start_time"
                name="start_time"
                type="datetime-local"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.start_time}
              />
              {formik.touched.start_time && formik.errors.start_time && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.start_time}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="end_time"
                className="block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <Input
                id="end_time"
                name="end_time"
                type="datetime-local"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.end_time}
              />
              {formik.touched.end_time && formik.errors.end_time && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.end_time}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700"
              >
                Cover Image
              </label>
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
                      {coverImage
                        ? coverImage.name
                        : "Drag and drop an image, or click to select"}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {formik.touched.coverImage && formik.errors.coverImage && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.coverImage}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              onClick={() =>
                console.log("Form state:", {
                  isSubmitting,
                  isValid: formik.isValid,
                  errors: formik.errors,
                  touched: formik.touched,
                  values: formik.values,
                })
              }
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
