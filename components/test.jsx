"use client";
import { useEffect, useRef, useState } from "react";
import { fetchData } from "@/Utils/API Call/fetchData.js";
import { useAppSelector, useAppStore } from "@/lib/hooks";
import { Button } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from '@tanstack/react-query'
import axios from "axios";




export default function Test(props) {
  const [passedData, setData] = useState(props.data);
  const [fetchCount, setFetchCount] = useState(0);
  const companyID = useAppSelector(
    (state) => state.dashboardOptionReducer.companyID
  );
  const societyID = useAppSelector(
    (state) => state.dashboardOptionReducer.societyID
  );
  const view = useAppSelector(
    (state) => state.dashboardOptionReducer.view
  );
 
  if(view === "company"){
  const {data,isError,isFetched,isLoading,error} = useQuery({
    queryKey: ['parkingLogs',companyID],
    queryFn: async () => { 
      const data = await fetchData("get",`parkinglog/get-parkinglogs/${companyID}`)
      
             setData(JSON.stringify(data))
             setFetchCount((fetchCount) => fetchCount + 1)
     return (data)},
    initialData: props.data,
      staleTime: 1000,
      refetchInterval:5000
  })
  if(isLoading) return(<div className="w-full h-screen flex justify-center items-center">Loading...</div>)
if(isError) return(<div className="w-full h-screen flex justify-center items-center">{error}</div>)
  }
  if(view === "society"){
  const {data,isError,isFetched,isLoading,error} = useQuery({
    queryKey: ['parkingLogs',societyID],
    queryFn: async () => { 
      const data = await fetchData("get",`parkinglog/get-parkinglogs/${societyID}`)
      
             setData(JSON.stringify(data))
             setFetchCount((fetchCount) => fetchCount + 1)
     return (data)},
    initialData: props.data,
      staleTime: 1000,
      refetchInterval:5000
  })
  if(isLoading) return(<div className="w-full h-screen flex justify-center items-center">Loading...</div>)
if(isError) return(<div className="w-full h-screen flex justify-center items-center">{error}</div>)
  }
  useEffect(() => {

  }, [passedData,fetchCount,companyID,view]);


{

  

}



  return (passedData ? (
    <div className="text-black flex items-center justify-center ">
      <p className="w-[500px] h-fit mr-20 ">{passedData}</p>
      <div className="m-10 cursor-pointer">{fetchCount}</div>
      <button
        className="bg-indigo-700 text-white w-20 h-10 rounded-xl ml-10 cursor-pointer hover:bg-indigo-400"
    onClick={()=>{
      
    }}
      >
        Fetch
      </button>
      
    </div>
  ) : (
    <div className="h-screen text-blac flex items-center justify-center">
      <p className="text-6xl">
        No Data<span className="text-red-600">!</span>
      </p>
    </div>
  ));
}
