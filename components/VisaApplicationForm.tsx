"use client";

import React, { useState } from "react";
import VisaAssessmentForm from "@/components/VisaApplication";
import VisaCategories from "@/components/VisaCategories";
import VisaDetails from "@/components/AdditionalInfo";
import FileUpload from "@/components/FileUpload";

export interface VisaApplicationFormProps {
  countries: Array<{ id: string; name: string }>;
  categories: Array<{ id: number; name: string; description: string }>;
}

// Define the shape of our overall form data
interface FormData {
  // From VisaAssessmentForm
  firstName: string;
  lastName: string;
  email: string;
  countryId: string;
  website: string;
  // From VisaCategories (multi-select)
  selectedCategories: number[];
  // From VisaDetails (freeform text)
  details: string;
  // From FileUpload (File or null)
  file: File | null;
}

export default function VisaApplicationForm({
  countries,
  categories,
}: VisaApplicationFormProps) {
  // Centralized form data & errors
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    countryId: "",
    website: "",
    selectedCategories: [],
    details: "",
    file: null,
  });
  const [error, setError] = useState<string | null>(null);

  // Child components will call these handlers to update the parent state
  const handleAssessmentChange = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCategoriesChange = (selected: number[]) => {
    setFormData((prev) => ({ ...prev, selectedCategories: selected }));
  };

  const handleDetailsChange = (value: string) => {
    setFormData((prev) => ({ ...prev, details: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, file }));
  };

  // Basic validation & submission
  const handleSubmit = () => {
    // Simple validation: check if required fields are filled
    const { firstName, lastName, email, countryId } = formData;
    if (!firstName || !lastName || !email || !countryId) {
      setError("Please fill out all required fields before submitting.");
      return;
    }

    // Clear any previous error
    setError(null);

    // TODO: Add logic to send data to your backend (e.g., fetch POST to /api/submit)
    console.log("Submitting form data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Render child components, passing callbacks & state as needed */}
      <VisaAssessmentForm
        countries={countries}
        formData={formData}
        onChange={handleAssessmentChange}
      />
      <VisaCategories
        categories={categories}
        selected={formData.selectedCategories}
        onChange={handleCategoriesChange}
      />
      <VisaDetails value={formData.details} onChange={handleDetailsChange} />
      <FileUpload file={formData.file} onFileChange={handleFileChange} />

      {/* Error message (if any) */}
      {error && <p className="font-semibold text-red-600">{error}</p>}

      {/* Black Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full rounded-md bg-black py-3 font-semibold text-white hover:bg-gray-900"
      >
        Submit
      </button>
    </div>
  );
}
