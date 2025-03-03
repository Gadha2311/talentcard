"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Job = {
  id: string;
  companyName: string;
  companyProfile: string;
  createdAt: number;
  description: string;
  jobTitle: string;
  location: string;
  type: string;
};

export const columns = (
  router: ReturnType<typeof useRouter>
): ColumnDef<Job>[] => [
  {
    accessorKey: "companyName",
    header: "Company",
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return value?.toLowerCase().includes(filterValue.toLowerCase());
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-6">
        <img
          src={row.original.companyProfile}
          alt="Company Logo"
          className="w-12 h-12 rounded-full border shadow-md"
        />
        <span className="font-medium">{row.original.companyName}</span>
      </div>
    ),
  },

  {
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting()}
        className="flex items-center gap-2"
      >
        Job Title <ArrowUpDown className="w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("jobTitle")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "type",
    header: "Job Type",
    cell: ({ row }) => (
      <div className="font-medium text-blue-600">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Posted On",
    cell: ({ row }) => {
      const timestamp = row.getValue("createdAt") as number;
      return (
        <div className="text-gray-600">
          {new Date(timestamp * 1000).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="truncate w-56 text-gray-700">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const job = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-zinc-300">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(job.id)}
            >
              Copy Job ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push(`/${job.id}`)}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo({ data }: { data: Job[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const router = useRouter();
  const table = useReactTable({
    data,
    columns: columns(router),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: { sorting, columnVisibility, globalFilter },
    initialState: { pagination: { pageSize: 5 } },
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  });

  return (
    <div className="w-full p-4 bg-blue-200  rounded-4xl shadow-2xl border">
      {/* Search & Column Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
        <Input
          placeholder="Search jobs..."
          className="max-w-sm border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="mt-2 md:mt-0">
              Columns <ChevronDown className="ml-2 w-4 h-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white shadow-md border rounded-md"
          >
            {table.getAllColumns().map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize px-7 py-3 hover:bg-gray-200"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border shadow-lg overflow-x-auto bg-white">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-left font-semibold border-b"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer transition-all duration-200  hover:bg-blue-100 hover:shadow-md hover:scale-[1.01] odd:bg-white even:bg-white"
                  onClick={() => router.push(`/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3 border-b">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
          className="hover:bg-blue-100 transition"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={table.nextPage}
          disabled={!table.getCanNextPage()}
          className="hover:bg-blue-100 transition"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
