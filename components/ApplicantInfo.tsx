"use client";

import React, { useRef, useEffect, useState } from "react";
import { Info } from "lucide-react";

// Define the shape of a Country
interface Country {
  id: string; // e.g. "US"
  name: string; // e.g. "United States"
}

// Define the shape of the form data for this component
export interface ApplicantInfoData {
  firstName: string;
  lastName: string;
  email: string;
  countryId: string;
  website: string;
}

// Define the shape for the error messages that may be passed in
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  website?: string;
  countryId?: string;
}

// Props that the parent passes in
interface ApplicantInfoProps {
  countries: Country[];
  formData: ApplicantInfoData;
  onChange: (field: keyof ApplicantInfoData, value: string) => void;
  errors: FormErrors;
}

export default function ApplicantInfo({
  countries,
  formData,
  onChange,
  errors,
}: ApplicantInfoProps) {
  // Local UI state for the custom dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if user clicks outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle standard text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof ApplicantInfoData, value);
  };

  // Toggle the dropdown open/closed
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // When user selects a country from the dropdown
  const handleSelectCountry = (id: string) => {
    onChange("countryId", id);
    setIsOpen(false);
  };

  // Determine the selected country's display name
  const selectedCountry = countries.find((c) => c.id === formData.countryId);
  const countryName = selectedCountry ? selectedCountry.name : "";

  return (
    <div className="flex flex-col items-center bg-white px-4 py-8">
      {/* Icon */}
      <Info className="mx-auto h-12 w-12 text-purple-400" />

      {/* Headline */}
      <h2 className="mt-4 text-center text-2xl font-semibold text-gray-800">
        Want to understand your visa options?
      </h2>
      <p className="mt-2 max-w-md text-center text-gray-600">
        Submit the form below and our team of experienced attorneys will review
        your information and send a preliminary assessment of your case based on
        your goals.
      </p>

      {/* Form */}
      <div className="mt-8 w-full max-w-md space-y-4">
        {/* First Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
        {errors.firstName && (
          <p className="text-sm text-red-600">{errors.firstName}</p>
        )}

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
        {errors.lastName && (
          <p className="text-sm text-red-600">{errors.lastName}</p>
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

        {/* Custom Full-Width Select for Country */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-left text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
          >
            <span className={countryName ? "text-gray-700" : "text-gray-400"}>
              {countryName || "Country of Citizenship"}
            </span>
            {/* Flip arrow if open */}
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {isOpen && (
            <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-md">
              {countries.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelectCountry(c.id)}
                  className="cursor-pointer px-3 py-2 text-gray-700 hover:bg-purple-50"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {errors.countryId && (
          <p className="text-sm text-red-600">{errors.countryId}</p>
        )}

        {/* LinkedIn / Personal Website */}
        <input
          type="url"
          name="website"
          placeholder="LinkedIn / Personal Website URL"
          value={formData.website}
          onChange={handleInputChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />
        {errors.website && (
          <p className="text-sm text-red-600">{errors.website}</p>
        )}
      </div>
    </div>
  );
}
