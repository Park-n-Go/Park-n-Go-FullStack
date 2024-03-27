'use client'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

import React, { useEffect } from 'react'
import CompanyDashboard from './Company Dashboard/CompanyDashboard'
import SocietyDashboard from './Society Dashboard/SocietyDashboard'
import { switchView } from '@/lib/features/dashboard/dashboardOptionSlice'
import { Skeleton } from '../ui/skeleton'

const ViewDashboard = ({companyData,societyData,companyID,societyID,parkingLogData,view}) => {

     view = useAppSelector((state)=> state.dashboardOptionReducer.view) || view

useAppDispatch(switchView({view}))
   

     
if(view === "company"){
    return(<div className="">
    <CompanyDashboard companyParkingLogData={parkingLogData} companyData={companyData} companyID={companyID}/></div>)

}else if(view === "society"){
    return(<div className="">
    <SocietyDashboard societyParkingLogData={parkingLogData} societyData={societyData} societyID={societyID}/></div>)

}else{
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

   
}

export default ViewDashboard