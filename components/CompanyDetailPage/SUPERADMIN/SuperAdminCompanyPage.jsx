"use client"
import { fetchData } from "@/Utils/API Call/fetchData";
import AddressCard from "@/components/AddressCard";
import CompanyProfilePictureCarousel from "@/components/CompanyProfilePictureCarousel/CompanyProfilePictureCarousel";
import EditCompanyDetailPage from "@/components/EditCompanyDetailPage/EditCompanyDetailPage";
import ParkingLogCarousel from "@/components/ParkingLogCarousel/ParkingLogCarousel";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@tremor/react";
import { Suspense, useState } from "react";



 const SuperAdminCompanyPage = ()=> {
  const [isEditable , setIsEditable] = useState(false)
  const companyID = useAppSelector((state)=>(state.dashboardOptionReducer.companyID))
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["companyDetails", companyID],
    queryFn: async () => {
      const data = await fetchData(
        "get",
        `company/${companyID}`
      );

      return data;
    },
    staleTime: 1000,
    refetchInterval: 5000,
  });


 return(<div className="-mt-2 grid grid-cols-2 gap-2 p-2 w-full h-screen overflow-y-auto">
  <Card className="shadow-md">
          <div className=' w-full p-14 '>
          
         <CompanyProfilePictureCarousel imageUrls={data?.companyProfilePictures}/>
    
          </div>
          </Card>
   {/* Parking Log Details */}
   <section className="flex flex-col justify-between">
          <div className='p-2'>
        {/* Title */}
        <div className="w-full flex items-center">

        <div className='w-full flex flex-col'>
    
    <div className='text-3xl  font-bold'>{data?.companyName}
    </div>
    <div>
    
    <Badge variant="outline">{data?.companyID}</Badge>
    </div>
        </div>
        
           <div>

            <EditCompanyDetailPage/>
           </div>
           
        
    
          </div>
    
    
    {/* Parking Log Details Starts Here */}
    
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[150px] '>Building Name: </div> 
    <div className='w-full text-xl'>{data?.buildingName} {JSON.stringify(isEditable)}
    </div>
         </div>


        
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         
         
    <div className='text-xl'> <AddressCard address ={data?.companyAddress}  /> </div>
         </div>
         
         
         
        
    
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[110px] text-lg '>Exited at: </div> 
    <div className='w-full text-xl'>{}
    </div>
         </div>
         
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[110px] text-lg '>Duration: </div> 
    <div className='w-full text-xl'>{data?.duration}
    </div>
         </div>
    
         <div className="flex  items-end">
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[150px]  '>Approved By:</div> 
         
    <div className='w-full text-xl ml-1'> {data?.isApproved}
    </div>
         </div>
         
         <div className=' mr-5 text-3xl font-extralight'>|</div>
        
    
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[140px]  '>Decliend By: </div> 
    <div className='w-full text-xl ml-1'>{data?.decliendBy ? data?.decliendBy : "-"}
    </div>
         </div>
         </div>
    
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[140px] text-lg '>Visitor For: </div> 
    <div className='w-full text-xl'>{data?.visitorFor}
    </div>
         </div>


          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[140px] text-lg '>Visitor Type: </div> 
    <div className='w-full text-xl'>{data?.visitorType}
    </div>
         </div>
    
        
          
          </div>
          <div className={cn(" mt-12 h-11 rounded-md flex items-center justify-center w-full  text-tremor-brand-inverted text-2xl shadow-md",`${data?.isApproved ? "bg-emerald-500" : (data?.decliendBy ? "bg-red-500" : "bg-indigo-500")}`)}>
{data?.isApproved ? "Approved" : (data?.decliendBy ? "Decliend" : "Pending")} 
        </div>
         </section>
    
    {/* History of Entries */}
    <section className="col-span-2  "> 
    <Suspense fallback={""}>
    <div className=" h-screen p-2 w-full ">

<h1 className="text-3xl text-tremor-content dark:text-dark-tremor-content">History</h1>
 
        
      </div>
      </Suspense>
          
          </section>
 
  </div>)
 
  }

export default SuperAdminCompanyPage;