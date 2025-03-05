"use client";

import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Heart } from "lucide-react";

export default function AdditionalInfo() {
  // The debounced value we store in state
  const [details, setDetails] = useState("");

  // A debounced callback that updates the `details` state after 500ms
  const debouncedUpdate = useDebouncedCallback((value: string) => {
    setDetails(value);
  }, 50);

  // onChange handler for the textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Instead of setting state immediately, call the debounced function
    debouncedUpdate(e.target.value);
  };

  return (
    <div className="mx-auto max-w-md">
      {/* Lucide React Icon */}
      <Heart className="mx-auto h-12 w-12 text-purple-400" />

      {/* Heading */}
      <h2 className="mt-4 text-center text-2xl font-semibold text-gray-800">
        How can we help you?
      </h2>

      {/* Textarea with debounced onChange */}
      <textarea
        value={details}
        onChange={handleChange}
        rows={6}
        placeholder={`What is your current status and when does it expire?
What is your past immigration history? Are you looking for long-term permanent residency 
or short-term employment visa or both? Are there any timeline considerations?`}
        className="mt-6 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-purple-200 focus:outline-none"
      />
    </div>
  );
}
