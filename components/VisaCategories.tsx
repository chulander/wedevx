"use client";

import React, { useState } from "react";
import { Dice3 } from "lucide-react";

interface VisaCategory {
  id: number; // e.g. 1, 2, 3, ...
  name: string; // e.g. "O-1", "EB-1A", "UNKNOWN"
  description: string;
}

interface VisaCategoryMultiSelectProps {
  categories: VisaCategory[];
}

export default function VisaCategoryMultiSelect({
  categories,
}: VisaCategoryMultiSelectProps) {
  // Store selected category IDs
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCheckboxChange = (categoryId: number) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // remove if already selected
          : [...prev, categoryId], // add if not selected
    );
  };

  return (
    <div className="mx-auto max-w-md">
      {/* Lucide React Icon */}
      <Dice3 className="mx-auto h-12 w-12 text-purple-400" />

      <h2 className="mt-4 text-center text-2xl font-semibold text-gray-800">
        Visa categories of interest?
      </h2>
      <p className="mx-auto mt-2 max-w-md text-center text-gray-600">
        Select all that apply
      </p>

      <div className="mt-6 space-y-4">
        {categories.map((category) => {
          const isChecked = selectedCategories.includes(category.id);

          // If the category name is "UNKNOWN", display label as "I don't know"
          const label =
            category.name === "UNKNOWN" ? "I don't know" : category.name;

          return (
            <label
              key={category.id}
              className="flex cursor-pointer items-center space-x-2"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(category.id)}
                className="form-checkbox h-5 w-5 text-purple-500"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
