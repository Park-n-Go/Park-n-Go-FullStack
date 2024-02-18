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
 
  const result = useQuery({
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



// const fetch=(companyID)=>{
//   const { isPending, isError, data, error } = useQuery({
//     queryKey: ['parkingLogs',companyID],
//     queryFn:async ()=>{ 
//      const data = await fetchData("get",`/parkinglog/get-parkinglogs/${companyID}`)
     
//             setData(JSON.stringify(data))
//             setFetchCount((fetchCount) => fetchCount + 1)
//     return (data)}
//   })
  
// }
  



  // const res = 
  

    
  
  
   
  //   // We can assume by this point that `isSuccess === true`
    
  // }



  // useEffect(() => {

  // }, [passedData,fetchCount]);

  return (passedData ? (
    <div className="text-black flex items-center justify-center ">
      <p className="w-[500px] h-fit mr-20 ">{passedData}</p>
      <div className="m-10 cursor-pointer">{fetchCount}</div>
      <button
        className="bg-indigo-700 text-white w-20 h-10 rounded-xl ml-10 cursor-pointer hover:bg-indigo-400"
    onClick={(companyID)=>{
      
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
