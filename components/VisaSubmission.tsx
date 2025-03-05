"use client";

import React, { useState } from "react";

interface VisaSubmissionProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  additional_details: string;
  status_id: string;
  countryName: string;
  created_at: string;
}

export default function VisaSubmission({
  id,
  first_name,
  last_name,
  email,
  additional_details,
  status_id: initialStatus,
  countryName,
  created_at,
}: VisaSubmissionProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusUpdate = async () => {
    if (status === "REACHED_OUT") return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/visa-applications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "Failed to update status.");
      } else {
        const result = await res.json();
        console.log("result", result);
        setStatus("REACHED_OUT");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Error updating status. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Visa Application Submission:</h1>
      <div className="space-y-1">
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Name:</strong> {first_name} {last_name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Citizenship:</strong> {countryName || "Unknown"}
        </p>
        <p>
          <strong>Submitted:</strong> {new Date(created_at).toLocaleString()}
        </p>
        <div>
          <strong>Additional Details:</strong>
          <p className="mt-1">{additional_details}</p>
        </div>
      </div>
      {error && <p className="mt-4 font-semibold text-red-600">{error}</p>}
      {status !== "REACHED_OUT" && (
        <button
          onClick={handleStatusUpdate}
          disabled={loading}
          className="mt-4 w-full rounded-md bg-black py-3 font-semibold text-white hover:bg-gray-900"
        >
          {loading ? "Updating..." : "Mark as Reached Out"}
        </button>
      )}
    </div>
  );
}
