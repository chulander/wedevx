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

// Define an error type for each field
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  website?: string;
  countryId?: string;
  selectedCategories?: string;
  details?: string;
  file?: string;
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
  const [errors, setErrors] = useState<FormErrors>({});

  // Handlers for child components
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

  // Validation function: returns errors based on the current formData
  const validateForm = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!data.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = "Please provide a valid email address.";
      }
    }
    if (!data.website.trim()) {
      newErrors.website = "Website is required.";
    } else {
      try {
        new URL(data.website);
      } catch {
        newErrors.website = "Please provide a valid URL.";
      }
    }
    if (!data.countryId) {
      newErrors.countryId = "Country of Citizenship is required.";
    }
    if (!data.selectedCategories || data.selectedCategories.length === 0) {
      newErrors.selectedCategories =
        "At least one visa category must be selected.";
    }
    if (!data.details.trim() || data.details.trim().length < 3) {
      newErrors.details =
        "Please provide more details (at least 3 characters).";
    }
    if (!data.file) {
      newErrors.file = "Please upload your resume/CV.";
    }

    return newErrors;
  };

  // Submission handler
  const handleSubmit = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    console.log("Submitting form data:", formData);
    alert("Form submitted successfully!");
    // Here you would typically send formData to your API endpoint
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {/* Pass errors to each child component as needed */}
      <VisaAssessmentForm
        countries={countries}
        formData={formData}
        onChange={handleAssessmentChange}
        errors={{
          firstName: errors.firstName,
          lastName: errors.lastName,
          email: errors.email,
          website: errors.website,
          countryId: errors.countryId,
        }}
      />
      <VisaCategories
        categories={categories}
        selected={formData.selectedCategories}
        onChange={handleCategoriesChange}
        error={errors.selectedCategories}
      />
      <VisaDetails
        value={formData.details}
        onChange={handleDetailsChange}
        error={errors.details}
      />
      <FileUpload
        file={formData.file}
        onFileChange={handleFileChange}
        error={errors.file}
      />

      {/* Display a summary error message if needed */}
      {Object.keys(errors).length > 0 && (
        <div className="rounded-md bg-red-100 p-4">
          <p className="font-semibold text-red-600">
            Please fix the errors above before submitting.
          </p>
        </div>
      )}

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
