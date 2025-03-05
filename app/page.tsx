"use client";
import Image from "next/image";

import React, { useState } from "react";
import { FileText } from "lucide-react";

interface AssessmentFormProps {
  onSubmitSuccess: () => void;
}

export default function AssessmentForm({
  onSubmitSuccess,
}: AssessmentFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedIn: "",
    visaCategories: [] as string[],
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multi-select for visa categories
  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setFormData((prev) => ({ ...prev, visaCategories: options }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd post this data to your backend
    console.log("Form submitted:", formData);

    // Trigger a callback to switch to the "Thank You" page
    onSubmitSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full h-72 bg-lime-100 overflow-hidden flex items-center justify-center">
        {/* Decorative Circles (layered) */}
        <div className="absolute top-[-3rem] left-[-3rem] w-60 h-60 bg-lime-300 rounded-full z-0"></div>
        <div className="absolute top-[-2rem] left-[2rem] w-40 h-40 bg-lime-400 rounded-full z-0"></div>
        <div className="absolute top-[2rem] left-[6rem] w-28 h-28 bg-lime-500 rounded-full z-0"></div>

        <h1 className="relative text-3xl font-bold text-gray-800 z-10 text-center px-4">
          Get An Assessment
          <br />
          Of Your Immigration Case
        </h1>
      </div>

      {/* Form Card */}
      <div className="-mt-16 max-w-xl mx-auto w-full bg-white p-8 shadow-md rounded-md z-10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Want to understand your visa options?
          </h2>
          <p className="text-gray-500 text-sm">
            Fill out the form below to help us better understand your needs.
            We’ll follow up with you to provide a detailed analysis of your
            immigration status or path.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-400 focus:border-lime-400"
            />
          </div>
          {/* Last Name */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-400 focus:border-lime-400"
            />
          </div>
          {/* Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-400 focus:border-lime-400"
            />
          </div>
          {/* LinkedIn Profile */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="linkedIn"
            >
              LinkedIn Profile
            </label>
            <input
              id="linkedIn"
              name="linkedIn"
              type="url"
              value={formData.linkedIn}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-400 focus:border-lime-400"
            />
          </div>
          {/* Visa Categories of Interest */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="visaCategories"
            >
              Visa categories of interest
            </label>
            <select
              id="visaCategories"
              name="visaCategories"
              multiple
              onChange={handleMultiSelect}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-400 focus:border-lime-400"
            >
              <option value="O-1">O-1</option>
              <option value="EB-1A">EB-1A</option>
              <option value="EB-2 NIW">EB-2 NIW</option>
              <option value="UNKNOWN">UNKNOWN</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Hold <code>Ctrl</code> (Windows) or <code>Cmd</code> (Mac) to
              select multiple.
            </p>
          </div>
          {/* Additional Information */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="additionalInfo"
            >
              How can we help you?
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-lime-400 focus:border-lime-400"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <FileText size={18} />
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
