"use client";

import React, { useState } from "react";
import ApplicantInfo from "@/components/ApplicantInfo";
import VisaCategories from "@/components/VisaCategories";
import AboutApplication from "@/components/AboutApplication";
import FileUpload from "@/components/FileUpload";
import { useRouter } from "next/navigation";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

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
  general?: string;
}

export default function VisaApplicationForm({
  countries,
  categories,
}: VisaApplicationFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
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
    // TODO: Country is optional; otherwise uncomment this:
    // if (!data.countryId) {
    //   newErrors.countryId = "Country of Citizenship is required.";
    // }

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

  // Submission handler: validate, then send a POST request to your API endpoint
  const handleSubmit = async () => {
    setIsLoading(true);
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }
    setErrors({});

    // Convert file to base64 if a file is provided
    let base64File = "";
    if (formData.file) {
      try {
        base64File = await fileToBase64(formData.file);
      } catch (error) {
        console.error("Error converting file:", error);
        setErrors({ general: "Error processing the file. Please try again." });
        return;
      }
    }

    // Prepare the payload for the API.
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      additional_details: formData.details,
      status_id: "PENDING", // default status for new applications
      citizenship_id: formData.countryId,
      resume_blob: base64File, // file converted to base64 string
      resume_file_type: formData.file ? formData.file.type : "",
      resume_file_name: formData.file ? formData.file.name : "",
      categories: formData.selectedCategories,
      website: formData.website,
    };

    try {
      const res = await fetch("/api/visa-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors({ general: errorData.error || "Submission failed." });
        return;
      }

      router.push("/visa-applications/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ general: "Submission failed. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="mx-auto mb-8 max-w-3xl space-y-8 px-4 py-8">
      {/* Pass errors to each child component as needed */}
      <ApplicantInfo
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
      <AboutApplication
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
      {errors.general && (
        <div className="rounded-md bg-red-100 p-4">
          <p className="font-semibold text-red-600">{errors.general}</p>
        </div>
      )}

      {/* Black Submit Button */}
      <div className="flex justify-center">
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className={`w-full max-w-md rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-900 ${isLoading ? "cursor-not-allowed opacity-50" : "hover:cursor-pointer"}`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
