"use client";

import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { FileText } from "lucide-react";

// Type for the country from the database
interface Country {
  id: string; // e.g. "US"
  name: string; // e.g. "United States"
}

// Props passed from the server page
interface VisaAssessmentFormProps {
  countries: Country[];
}

export default function VisaAssessmentForm({
  countries,
}: VisaAssessmentFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryId: "", // We'll store the country 'id' here
    website: "",
  });

  // Generic input change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Radix Select change handler for the country
  const handleCountryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, countryId: value }));
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you'd send formData to your backend
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      {/* Icon */}
      <FileText className="text-purple-400" size={48} />

      {/* Headline */}
      <h2 className="text-xl font-semibold mt-4 text-gray-800">
        Want to understand your visa options?
      </h2>
      <p className="text-center text-gray-600 max-w-md mt-2">
        Submit the form below and our team of experienced attorneys will review
        your information and send a preliminary assessment of your case based on
        your goals.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm space-y-4">
        {/* First Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-purple-200"
        />

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-purple-200"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-purple-200"
        />

        {/* Country (Radix Select) */}
        <Select.Root
          value={formData.countryId}
          onValueChange={handleCountryChange}
        >
          <Select.Trigger
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700
                       flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-purple-200"
            aria-label="Country of Citizenship"
          >
            <Select.Value placeholder="Country of Citizenship" />
            <Select.Icon>
              <ChevronDownIcon />
            </Select.Icon>
          </Select.Trigger>
          <Select.Content className="bg-white border border-gray-200 rounded-md shadow-md">
            <Select.Viewport>
              {countries.map((c) => (
                <Select.Item
                  key={c.id}
                  value={c.id} // The selected value is the country's ID
                  className="cursor-pointer px-3 py-2 text-sm text-gray-700 
                             hover:bg-purple-50 focus:bg-purple-100 flex items-center justify-between"
                >
                  <Select.ItemText>{c.name}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon className="h-4 w-4 text-purple-500" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Root>

        {/* LinkedIn / Personal Website */}
        <input
          type="url"
          name="website"
          placeholder="LinkedIn / Personal Website URL"
          value={formData.website}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-purple-200"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md 
                     font-semibold transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
