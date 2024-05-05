"use client"
import SuperAdminCompanyPage from "@/components/CompanyDetailPage/SUPERADMIN/SuperAdminCompanyPage";
import { switchView } from "@/lib/features/dashboard/dashboardOptionSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Pragati_Narrow } from "next/font/google";
import { useEffect, useState } from "react";



 const CompanyPage = ({params})=> {
  const [view,setView] = useState(params.view) 
  const [ID , setID] = useState(params.id)
  const dispatch = useAppDispatch()
useEffect(()=>{
  // console.log({view},{ID})
  dispatch(switchView({view}))
 
},[])


if (view != "company" && view != "society"){
  return(<div className="w-full h-[100vh] flex items-center justify-center text-5xl font-bold">Invalid Page Request<span className="text-red-500">!</span></div>)
}

return(<>
<SuperAdminCompanyPage />
</>)
}

export default CompanyPage;