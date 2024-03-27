"use client";
import { fetchData } from "@/Utils/API Call/fetchData.js";
import { currentUser } from "@clerk/nextjs";
import ViewDashboard from "@/components/Dashboard/ViewDashboard";
import { ParkingLogTable } from "@/components/shadcn/ParkingLog Table With Pagination and Selection/ParkingLogTable";
import { columns } from "@/components/shadcn/ParkingLog Table With Pagination and Selection/columns";
import { useAppSelector } from "@/lib/hooks";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  apiDataFormatterWithAmountOption,
  apiDataFormatterWithAmountOptionForTable,
} from "@/Utils/API Data Formatter/apiDataFormatterWithAmountOptionForTable.js";
import LogTableLoading from "@/components/LogTableLoading";
import { Suspense } from "react";
import NoPropertiesWithUsPage from "@/components/Dashboard/Scene/NoPropertiesWithUsPage";

const Logs = () => {
  const companyID = useAppSelector(
    (state) => state.dashboardOptionReducer.companyID
  );
  const societyID = useAppSelector(
    (state) => state.dashboardOptionReducer.societyID
  );
  const view = useAppSelector((state) => state.dashboardOptionReducer.view);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["parkingLogs", companyID, societyID, view],
    queryFn: async () => {
      const data = await fetchData(
        "get",
        `parkinglog/${view}/get-parkinglogs/${
          view.toLowerCase() === "company" ? companyID : societyID
        }?sortby=createdAt&order=des`
      );

      return data;
    },
    staleTime: 1000,
    refetchInterval: 5000,
  });


  if (isLoading)
    return (
      <div className="w-full h-screen flex flex-col gap-5 items-start justify-start p-5">
        <Skeleton className="h-14 w-[400px]" />

        <Skeleton className="h-[700px] w-full rounded-xl" />
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {error}
      </div>
    );

  if (!companyID && !societyID && !data) {
    return <NoPropertiesWithUsPage />;
  }
  return (
    <Suspense fallback={<LogTableLoading />}>
      <div className=" h-screen p-2 w-full ">
        <h1 className="text-3xl text-tremor-content dark:text-dark-tremor-content">
          {view.toLowerCase() === "company" ? "Parking" : "Entry"} Logs
        </h1>

        {view.toLowerCase() === "company" ? (
          <ParkingLogTable
            columns={columns(
              data?.parkingLogs?.filter((obj)=>(obj?.payment)).length > 0 
                ? 
                
                [
                  "vehicle number",
                  "vehicle type",
                  "entry at",
                  "exit at",
                  "duration",
                  "amount",
                ] : [
                  "name",
                  "vehicle number",
                  "visitor_for",
                  "visitor_type",
                  "entry_at",
                  "exit_at",
                  "is_approved",
                ] 
            )}
            data={apiDataFormatterWithAmountOptionForTable(
              data,
              data?.parkingLogs?.filter((obj)=>(obj?.payment)).length > 0 
            )}
          />
        ) : (
          <ParkingLogTable
            columns={columns(
              [
                    "name",
                    "vehicle number",
                    "visitor_for",
                    "visitor_type",
                    "entry_at",
                    "exit_at",
                    "is_approved",
                  ]
            )}
            data={apiDataFormatterWithAmountOptionForTable(
              data,
              view.toLowerCase() === "company"
            )}
          />
        )}
      </div>
    </Suspense>
  );
};

export default Logs;
