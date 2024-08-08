"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import useErrorHandler from "@/hooks/useErrorHandler";

const eventTypes = ["Conference", "Workshop", "Seminar", "Webinar", "Other"];

const EventSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Event type is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  startTime: Yup.date().required("Start time is required"),
  endTime: Yup.date()
    .required("End time is required")
    .min(Yup.ref("startTime"), "End time must be after start time"),
});

export default function CreateEventComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleError = useErrorHandler();
  const formik = useFormik({
    initialValues: {
      title: "",
      type: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      coverImage: null,
    },
    validationSchema: EventSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        // TODO: Implement the API call to create the event
        console.log("Event data:", values);
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
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <Input
                id="location"
                name="location"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.location}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>
              <Input
                id="startTime"
                name="startTime"
                type="datetime-local"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startTime}
              />
              {formik.touched.startTime && formik.errors.startTime && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.startTime}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="endTime"
                className="block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <Input
                id="endTime"
                name="endTime"
                type="datetime-local"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endTime}
              />
              {formik.touched.endTime && formik.errors.endTime && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.endTime}
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
              <Input
                id="coverImage"
                name="coverImage"
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) {
                    formik.setFieldValue("coverImage", file);
                  }
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.coverImage && formik.errors.coverImage && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.coverImage}
                </div>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
