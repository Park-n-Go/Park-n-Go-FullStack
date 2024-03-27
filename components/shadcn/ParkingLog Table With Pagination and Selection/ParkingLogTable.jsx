"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DataTablePagination } from "./PaginationControls";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAppSelector } from "@/lib/hooks";


export function ParkingLogTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] =  React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const view = useAppSelector((state)=>(state.dashboardOptionReducer.view))
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,      
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
{/* Filter Input Text Box */}
<div className="flex items-center  py-4">
        <Input
          placeholder={view === "company" ? "Vehicle Number..." : "Name..."}
          value={view ==="company" ? ((table.getColumn("vehicle_number")?.getFilterValue()) ?? "") : ((table.getColumn("name")?.getFilterValue()) ?? "")}
          onChange={(event) =>
           view === "company" ? (table.getColumn("vehicle_number")?.setFilterValue(event.target.value)) : (table.getColumn("name")?.setFilterValue(event.target.value))
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="relative">
            <ScrollArea className="h-[620px] w-full rounded-md p-4">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="pt-10">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
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
                  className="h-[500px] w-full text-center rounded-md p-4"
                  >
                  No results.
                </TableCell>
              </TableRow>
            )}

          </TableBody>
            </ScrollArea>
        </Table>
      </div>
      <div className="w-full flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>
      {/* Pagination Control */}
      <DataTablePagination table={table} />
      </div>
    </div>
  );
}
