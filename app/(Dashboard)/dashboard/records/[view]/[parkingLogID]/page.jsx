"use client"
import { fetchData } from '@/Utils/API Call/fetchData';
import {Commerical_Parking_Log_Details_Page} from '@/components/Parking Log Details Page/Commerical_Parking_Log_Details_Page';
import { setQuery } from '@/lib/features/dashboard/dashboardOptionSlice';
import { useAppDispatch } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query';
import React, {  useMemo, useState } from 'react'

const LogDetailsPage = ({params}) => {
  const [parkingLogID,setParkingLogID] = useState(params.parkingLogID) 
  const dispatch = useAppDispatch(params);
  dispatch(setQuery(parkingLogID))

  const {data,isError,isLoading,error} = useQuery({
    queryKey: ['parkingLog',parkingLogID],
    queryFn: async () => {

         const data = await fetchData("get",`parkinglog/${parkingLogID}`)
      
return (data)},
      staleTime: 1000,
  })


  const imageUrls = useMemo(()=>{return([{url:data?.img,source:"Front Gate"}])},[data])

  return(<div className='w-full h-screen'>
  <Commerical_Parking_Log_Details_Page data={data} imageUrls={imageUrls} />
  </div>)
}

export default LogDetailsPage