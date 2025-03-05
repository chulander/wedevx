"use client";

import React, { useState, useRef, useEffect } from "react";

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
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-4">
      {/* Icon */}
      <svg
        className="text-purple-400 w-12 h-12"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>

      {/* Headline */}
      <h2 className="text-2xl font-semibold mt-4 text-gray-800 text-center">
        Want to understand your visa options?
      </h2>
      <p className="text-center text-gray-600 mt-2 max-w-md">
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

        {/* Custom Full-Width Select */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={toggleDropdown}
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-left
                       text-gray-700 flex items-center justify-between focus:outline-none
                       focus:ring-2 focus:ring-purple-200"
          >
            <span className={countryName ? "text-gray-700" : "text-gray-400"}>
              {countryName || "Country of Citizenship"}
            </span>
            {/* Flip arrow if open */}
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${
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
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-auto">
              {countries.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelectCountry(c.id)}
                  className="px-3 py-2 text-gray-700 hover:bg-purple-50 cursor-pointer"
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
