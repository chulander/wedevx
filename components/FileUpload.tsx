"use client";

import React from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
}

export default function FileUpload({
  file,
  onFileChange,
  error,
}: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    } else {
      onFileChange(null);
    }
  };

  return (
    <div className="mx-auto max-w-lg bg-white p-8">
      <div className="flex flex-col items-center">
        <Upload className="h-12 w-12 text-purple-400" />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Upload Your Resume/CV
        </h2>
      </div>
      <div className="mt-6">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-purple-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-100"
        />
        {file && (
          <p className="mt-2 text-gray-600">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}
        {error && (
          <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
