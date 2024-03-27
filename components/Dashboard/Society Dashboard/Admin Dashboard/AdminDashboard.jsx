"use client";

import { useAppSelector, useAppStore } from "@/lib/hooks";
import {
  Card,
  DonutChart,
  LineChart,
  DateRangePicker,
  ProgressBar,
} from "@tremor/react";
import { titleize } from "@/Utils/titlelize.js";
import { cn } from "@/lib/utils.js";
import { returnOccupiedParkingSpace } from "@/Utils/returnOccupiedParkingSpace";
import { calculatePercentage } from "@/Utils/calculatePercentage";
import PakringLogViewTable from "@/components/shadcn/PakringLog Simple Data-Table/PakringLogViewTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "@/components/shadcn/ParkingLog Table With Pagination and Selection/columns";
import { ParkingLogTable } from "@/components/shadcn/ParkingLog Table With Pagination and Selection/ParkingLogTable";
import { apiDataFormatterWithAmountOption, apiDataFormatterWithAmountOptionForTable } from "@/Utils/API Data Formatter/apiDataFormatterWithAmountOptionForTable.js";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/Utils/API Call/fetchData";
import { Skeleton } from "@/components/ui/skeleton";



const AdminDashboard = () => {
  
 
  const societyID = useAppSelector(
    (state) => state.dashboardOptionReducer.societyID
  );

const {data,isError,isLoading,error} = useQuery({
    queryKey: ['entries',societyID],
    queryFn: async () => {
    const data = await fetchData("get",`parkinglog/society/get-parkinglogs/${societyID}`)
      
return (data)},
      staleTime: 1000,
      refetchInterval:5000
  })

  if(isLoading){
    return( <div className="flex flex-col w-full h-screen p-2 -mt-5">
    <div className="grid grid-cols-4 gap-5">
     
     <Skeleton className="h-28 w-full" />
     <Skeleton className="h-28 w-full" />
     <Skeleton className="h-28 w-full" />
     <Skeleton className="h-28 w-full" />
     </div>
     <div className='w-full h-[700px] py-3 grid grid-cols-2 gap-5'>

    <Skeleton className="w-full rounded-xl" />
    <Skeleton className="w-full rounded-xl" />
     </div>
    
  </div>)
  }
  if(isError){
    return(<div>{JSON.stringify(error || "no Error")}</div>)
  }










  return (
    <div className="w-full mb-20">
      {/* Overview */}
      <section className="  grid grid-cols-4 mx-10 -mt-2 gap-5">
        {/* Revenue */}
        <Card
          className="mx-auto max-w-xs"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Total Approved Entry 
          </p>
          <div className=" flex w-full justify-between items-center">
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              34,743
            </p>
            <span className="rounded text-neutral-500 px-2 py-1 text-tremor-default font-normal">
              For Today
            </span>
          </div>
        </Card>

        <Card
          className="mx-auto max-w-xs"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Total Declined Entry 
          </p>
          <div className=" flex w-full justify-between items-center">
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              34,743
            </p>
            <span className="rounded text-neutral-500 px-2 py-1 text-tremor-default font-normal">
              For Today
            </span>
          </div>
        </Card>

        <Card
          className="mx-auto max-w-xs"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Last Entry
          </p>
          <div className=" flex w-full justify-between items-center">
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $34,743
            </p>
            <span className="rounded text-neutral-500 px-2 py-1 text-tremor-default font-normal">
              For Today
            </span>
          </div>
        </Card>

        <Card
          className="mx-auto max-w-xs"
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Revenue
          </p>
          <div className=" flex w-full justify-between items-center">
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $34,743
            </p>
            <span className="rounded text-neutral-500 px-2 py-1 text-tremor-default font-normal">
              For Today
            </span>
          </div>
        </Card>
      </section>
     




      {/* 5 Latest Parking Logs */}
      <section className="mx-10 mt-10">
      
       <Card className="">
       

<Link href="/dashboard/records">
        <h1 className="w-32 cursor-pointer text-2xl hover:font-semibold text-muted-foreground">Entry Logs</h1>
</Link>
       
      
        <ParkingLogTable columns={columns(["name","vehicle number", "visitor_for", "visitor_type", "entry_at", "exit_at" , "is_approved"])} data={apiDataFormatterWithAmountOptionForTable(data,false)} for="society" /> 

       </Card>
      </section>
    </div>
  );
}

export default AdminDashboard