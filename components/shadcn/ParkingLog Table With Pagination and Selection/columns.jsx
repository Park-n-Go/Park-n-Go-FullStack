"use client"

 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./ColumnHeader"
import { titleize } from "@/Utils/titlelize"

import { useRouter } from 'next/navigation'
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useMemo } from "react"
import uniqueKey from "@/Utils/uniqueKey"
import { setQuery } from "@/lib/features/dashboard/dashboardOptionSlice"


export const columns = (columnNames)=>{
  const router = useRouter();
  const dispatch = useAppDispatch()
  if(!columnNames) return []
  let columnNameList = [{
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }]
columnNames.forEach((columnName)=>{


columnNameList.push({
  accessorKey: columnName.replace(" ","_").replace("-","_").toLowerCase(),
  header: ({ column }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {titleize(columnName.replace("_"," ").replace("-"," "))}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )
  },
})


})


columnNameList.push({
  id: "actions",
  cell: ({ row }) => {
    const {parkingLogID} = row.original

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer"
            
          >
            {/* <div className="w-full"> */}
          <Link href={`/dashboard/records/${localStorage.getItem("view")}/${parkingLogID}`}  className="w-full" onClick={()=>{
dispatch(setQuery(parkingLogID))
          }}>

            Open
            </Link>
            {/* </div> */}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
})


return(columnNameList)
}







