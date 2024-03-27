"use client";
import { useEffect, useMemo, useState } from "react";
import { fetchData } from "@/Utils/API Call/fetchData.js";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";
import AdminDashboard from "./Admin Dashboard/AdminDashboard";

const SocietyDashboard = ({societyParkingLogData,societyData,societyID}) => {

    // const [passedData, setData] = useState(props.data);
    // const [fetchCount, setFetchCount] = useState(0);
     societyID = useAppSelector(
      (state) => state.dashboardOptionReducer.societyID
    )
  
   
  
  //   const {data,isError,isFetched,isLoading,error} = useQuery({
  //     queryKey: ['societyEntryLog',societyID],
  //     queryFn: async () => { 
  //       const data = await fetchData("get",`parkinglog/get-parkinglogs/${societyID}`)
        
  //              setData(JSON.stringify(data))
  //              setFetchCount((fetchCount) => fetchCount + 1)
  //      return (data)},
  //     initialData: props.data,
  //       staleTime: 1000,
  //       refetchInterval:5000
  //   })

  //   if(isLoading) return(<div className="w-full h-screen flex justify-center items-center">Loading...</div>)
  // if(isError) return(<div className="w-full h-screen flex justify-center items-center">Unexpected Error!</div>)
   





  return (
    <div className="">

   <AdminDashboard societyParkingLogData={societyParkingLogData}societyData={societyData}societyID={societyID}/>
    </div>
  )
}

export default SocietyDashboard