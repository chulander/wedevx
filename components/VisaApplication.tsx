"use client";

import React, { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";

interface Country {
  id: string; // e.g. "US"
  name: string; // e.g. "United States"
}

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
    countryId: "",
    website: "",
  });

  // Track whether the custom dropdown is open
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

  // Generic input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle the dropdown open/closed
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Select a country
  const handleSelectCountry = (id: string) => {
    setFormData((prev) => ({ ...prev, countryId: id }));
    setIsOpen(false);
  };

  // Submit the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
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
      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md space-y-4">
        {/* First Name */}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />

        {/* Custom Full-Width Select */}
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

        {/* LinkedIn / Personal Website */}
        <input
          type="url"
          name="website"
          placeholder="LinkedIn / Personal Website URL"
          value={formData.website}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-purple-500 py-2 font-semibold text-white transition-colors hover:bg-purple-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
