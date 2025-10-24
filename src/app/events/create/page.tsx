"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const createEventSchema = z.object({
  name: z.string().min(3, "Event name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Select a category"),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  location: z.string().min(3, "Location is required"),
  banner: z.any().optional(),
});

type CreateEventForm = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventForm>({
    resolver: zodResolver(createEventSchema),
  });

  const onSubmit = (data: CreateEventForm) => {
    console.log("Form Submitted:", data);
    // Later: Send data to your backend API or directly to S3
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-[#150304] px-6 lg:px-20 py-14 text-white font-urbanist">
      <h1 className="text-3xl font-fraunces mb-10">
        <span className="text-[#FF6825]">Create</span> New Event
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT SIDE FORM INPUTS */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Event Name</label>
            <input
              {...register("name")}
              className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-[#FF6825] outline-none"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-2">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-[#FF6825] outline-none"
            ></textarea>
            {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-2">Category</label>
            <select
              {...register("category")}
              className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-[#FF6825] outline-none"
            >
              <option value="">Select category</option>
              <option value="conference">Conference</option>
              <option value="birthday">Birthday</option>
              <option value="wedding">Wedding</option>
            </select>
            {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-[#FF6825] outline-none"
              />
              {errors.date && <p className="text-red-400 text-sm">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm mb-2">Time</label>
              <input
                type="time"
                {...register("time")}
                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-[#FF6825] outline-none"
              />
              {errors.time && <p className="text-red-400 text-sm">{errors.time.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Location</label>
            <input
              {...register("location")}
              className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-md focus:border-[#FF6825] outline-none"
            />
            {errors.location && <p className="text-red-400 text-sm">{errors.location.message}</p>}
          </div>
        </div>

        {/* RIGHT SIDE BANNER UPLOAD */}
        <div className="space-y-4">
          <label className="block text-sm">Event Banner</label>

          <div className="border border-white/20 rounded-md p-4 h-[280px] flex items-center justify-center relative">
            {preview ? (
              <Image
                src={preview}
                alt="Banner preview"
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <span className="text-white/50">Upload an image</span>
            )}
          </div>

          <input type="file" accept="image/*" {...register("banner")} onChange={handleBannerUpload} />
        </div>
      </form>

      {/* ACTION BUTTONS */}
      <div className="mt-10 flex gap-6">
        <button type="submit" onClick={handleSubmit(onSubmit)} className="bg-[#FF6825] hover:bg-[#d75a1d] px-6 py-3 rounded-md font-medium">
          Publish Event
        </button>
        <button className="border border-white/30 hover:border-white px-6 py-3 rounded-md font-medium">
          Save Draft
        </button>
      </div>
    </div>
  );
}
