import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-lime-100 sm:h-[400px]">
      {/* Top-Right Link */}
      <div className="absolute top-4 right-4 z-20">
        <Link
          href="/dashboard/leads"
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Decorative Circles (for larger screens) */}
      <div className="relative z-0 hidden sm:block">
        <div className="absolute top-[-3rem] left-[-3rem] z-0 h-60 w-60 rounded-full bg-lime-300" />
        <div className="absolute top-[1rem] left-[1rem] z-0 h-40 w-40 rounded-full bg-lime-400" />
        <div className="absolute top-[6rem] left-[4rem] z-0 h-24 w-24 rounded-full bg-lime-500" />
      </div>

      {/* Centered Container */}
      <div className="z-10 container mx-auto flex h-full items-center justify-center px-4">
        {/* Narrower text block, left-aligned */}
        <div className="mt-4 max-w-3xl sm:mt-0">
          <div className="mb-2 text-xl font-bold text-gray-800">almă</div>
          <h1 className="py-4 text-3xl leading-tight font-bold text-gray-800 sm:text-5xl">
            Get An Assessment
            <br />
            Of Your Immigration Case
          </h1>
        </div>
      </div>
    </section>
  );
}
