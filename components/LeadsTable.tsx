"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

interface LeadRow {
  id: string;
  name: string;
  submitted: string;
  status: string;
  country: string;
}

interface LeadsTableProps {
  data: LeadRow[];
  total: number;
  page: number;
  totalPages: number;
  search: string;
  status: string;
  pageSize: number;
}

export default function LeadsTable({
  data,
  total,
  page,
  totalPages,
  search,
  status,
  pageSize,
}: LeadsTableProps) {
  console.log("what is status", status);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Whenever searchParams changes, we want to re-fetch the data (i.e., re-run the server component).
  // However, Next.js 13 should automatically re-run the server component if we do a router.push
  // to a new URL. But if needed, we can force a refresh:
  useEffect(() => {
    router.refresh();
  }, [searchParams, router]);

  // Helper to set query param
  function setParam(key: string, value: string) {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Reset page to 1 if search or status changes
    if (key === "search" || key === "status") {
      newParams.delete("page");
    }
    router.push(`?${newParams.toString()}`);
  }

  // Debounce search input changes
  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setParam("search", value);
  }, 500);

  // Row click -> detail page
  function handleRowClick(id: string) {
    router.push(`/dashboard/${id}`);
  }

  return (
    <div className="rounded-md bg-white p-4 text-black">
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          defaultValue={search}
          onChange={(e) => debouncedSetSearch(e.target.value)}
          className="rounded-md border px-3 py-2"
        />

        {/* Status dropdown */}
        <select
          className="rounded-md border px-3 py-2"
          value={status}
          onChange={(e) => setParam("status", e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="REACHED_OUT">Reached Out</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b">
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Submitted</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Country</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-b hover:bg-gray-50"
                onClick={() => handleRowClick(row.id)}
              >
                <td className="px-3 py-2">{row.name}</td>
                <td className="px-3 py-2">{row.submitted}</td>
                <td className="px-3 py-2">{row.status}</td>
                <td className="px-3 py-2">{row.country}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setParam("page", String(page - 1))}
            disabled={page <= 1}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setParam("page", String(p))}
              className={`rounded border px-3 py-1 ${
                p === page ? "bg-gray-200 font-bold" : ""
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setParam("page", String(page + 1))}
            disabled={page >= totalPages}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
