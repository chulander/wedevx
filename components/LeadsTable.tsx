"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

// Example data shape
interface LeadRow {
  id: string;
  name: string;
  submitted: string;
  status: string;
  country: string;
}

interface LeadsTableProps {
  data: LeadRow[];
}

const columnHelper = createColumnHelper<LeadRow>();

export default function LeadsTable({ data }: LeadsTableProps) {
  const router = useRouter();

  // Sorting, pagination, global filter states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [globalFilter, setGlobalFilter] = useState("");

  // External filter for status
  const [statusFilter, setStatusFilter] = useState("");

  // 1) Filter the data by status
  const filteredData = useMemo(() => {
    if (!statusFilter) return data;
    return data.filter((row) => row.status === statusFilter);
  }, [data, statusFilter]);

  // Define columns (enable sorting by setting enableSorting: true)
  const columns = useMemo<ColumnDef<LeadRow, any>[]>(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("submitted", {
        header: "Submitted",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("country", {
        header: "Country",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
    ],
    [],
  );

  // Create the table instance
  const table = useReactTable<LeadRow>({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      // The updater might be a function or an object. We'll handle object for simplicity.
      if (typeof updater !== "function") {
        if (typeof updater.pageIndex === "number")
          setPageIndex(updater.pageIndex);
        if (typeof updater.pageSize === "number") setPageSize(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Basic global filter: we do a manual approach below.
  // We filter the rows after they've been paginated, or before.
  // In this example, let's do it before pagination, so the search affects total row count.

  // We'll create a derived array of sorted rows and filter them by globalFilter
  const sortedRows = table.getRowModel().rows;
  const searchedRows = useMemo(() => {
    if (!globalFilter) return sortedRows;
    const lowerSearch = globalFilter.toLowerCase();
    return sortedRows.filter((row) => {
      return row
        .getVisibleCells()
        .some((cell) =>
          String(cell.getValue()).toLowerCase().includes(lowerSearch),
        );
    });
  }, [sortedRows, globalFilter]);

  // Now we handle pagination on the searchedRows. We slice the data ourselves:
  const totalRows = searchedRows.length;
  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const pageRows = searchedRows.slice(startIndex, endIndex);

  // Handle row click
  const handleRowClick = (row: LeadRow) => {
    router.push(`/app/(admin)/dashboard/${row.id}`);
  };

  return (
    <div className="rounded-md bg-white p-4 text-black">
      <h1 className="mb-4 text-2xl font-bold">Leads</h1>

      {/* Toolbar: search and status filter */}
      <div className="mb-4 flex items-center gap-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="rounded-md border px-3 py-2"
        />

        {/* Status dropdown */}
        <select
          className="rounded-md border px-3 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Reached Out">Reached Out</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => {
                // For sorting, we can make the header text clickable
                const canSort = header.column.getCanSort();
                const sortDirection = header.column.getIsSorted();
                if (header.isPlaceholder) {
                  return <th key={header.id} />;
                }
                return (
                  <th
                    key={header.id}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={`px-3 py-2 ${
                      canSort ? "cursor-pointer select-none" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {sortDirection === "asc" && <span>↑</span>}
                      {sortDirection === "desc" && <span>↓</span>}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {pageRows.map((row) => (
            <tr
              key={row.id}
              className="cursor-pointer border-b hover:bg-gray-50"
              onClick={() => handleRowClick(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {pageRows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center">
                No leads found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setPageIndex((prev) =>
                prev < Math.ceil(totalRows / pageSize) - 1 ? prev + 1 : prev,
              )
            }
            disabled={pageIndex >= Math.ceil(totalRows / pageSize) - 1}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <span>
          Page {pageIndex + 1} of {Math.max(Math.ceil(totalRows / pageSize), 1)}
        </span>
      </div>
    </div>
  );
}
