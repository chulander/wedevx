"use client";

import React from "react";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="mx-auto max-w-md px-4 py-8 text-center">
      <FileText className="mx-auto h-12 w-12 text-purple-400" />
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Thank You</h2>
      <p className="mt-2 text-gray-600">
        Your information was submitted to our team of immigration attorneys.
        Expect an email from{" "}
        <span className="font-medium">hello@tryalma.ai</span>.
      </p>

      <Link href="/">
        <button className="mt-6 rounded-md bg-black px-4 py-2 font-semibold text-white hover:bg-gray-900">
          Go Back to Homepage
        </button>
      </Link>
    </div>
  );
}
