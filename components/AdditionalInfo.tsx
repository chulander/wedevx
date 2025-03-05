"use client";

import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Heart } from "lucide-react";

interface AdditionalInfoProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function AdditionalInfo({
  value,
  onChange,
  error,
}: AdditionalInfoProps) {
  // Local state to reflect immediate input changes
  const [localValue, setLocalValue] = useState(value);

  // Create a debounced callback that calls the parent's onChange after 500ms
  const debouncedOnChange = useDebouncedCallback((val: string) => {
    onChange(val);
  }, 500);

  // Update local state if parent value changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    debouncedOnChange(newVal);
  };

  return (
    <div className="mx-auto max-w-md">
      {/* Icon */}
      <Heart className="mx-auto h-12 w-12 text-purple-400" />

      {/* Heading */}
      <h2 className="mt-4 text-center text-2xl font-semibold text-gray-800">
        How can we help you?
      </h2>

      {/* Textarea with debounced onChange */}
      <textarea
        value={localValue}
        onChange={handleChange}
        rows={6}
        placeholder={`What is your current status and when does it expire?
What is your past immigration history? Are you looking for long-term permanent residency 
or short-term employment visa or both? Are there any timeline considerations?`}
        className="mt-6 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
      />

      {/* Display error if provided */}
      {error && (
        <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>
      )}
    </div>
  );
}
