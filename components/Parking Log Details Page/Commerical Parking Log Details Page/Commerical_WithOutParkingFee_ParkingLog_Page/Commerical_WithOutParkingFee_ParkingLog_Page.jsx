import { apiDataFormatterWithAmountOptionForTable } from "@/Utils/API Data Formatter/apiDataFormatterWithAmountOptionForTable"
import { DateAndTimeInHuman } from "@/Utils/Date and Time Formatter/DateAndTimeInHuman"
import LogTableLoading from "@/components/LogTableLoading"
import ParkingLogCarousel from "@/components/ParkingLogCarousel/ParkingLogCarousel"
import { ParkingLogTable } from "@/components/shadcn/ParkingLog Table With Pagination and Selection/ParkingLogTable"
import { columns } from "@/components/shadcn/ParkingLog Table With Pagination and Selection/columns"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Button, Card } from "@tremor/react"
import { Suspense } from "react"



const Commerical_WithOutParkingFee_ParkingLog_Page = ({data,imageUrls}) => {
    return (
        <div className='-mt-2 grid grid-cols-2 gap-2 p-2 w-full h-screen overflow-y-auto'>
          <Card>
          <div className=' w-full p-14 '>
          
         <ParkingLogCarousel imageUrls={imageUrls}/>
    
          </div>
          </Card>
     
    {/* Parking Log Details */}
    <Card className="flex flex-col justify-between">
          <div className='p-2'>
        {/* Title */}
        <div className='w-full flex flex-col'>
    
    <div className='text-3xl  font-bold'>{data?.vehicleNumber}
    </div>
    <div>
    
    <Badge variant="outline">{data?.vehicleType}</Badge>
    </div>
        
            
        
    
          </div>
    
    
    {/* Parking Log Details Starts Here */}
    
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[70px] '>Name: </div> 
    <div className='w-full text-xl'>{data?.name}
    </div>
         </div>


         <div className="flex  items-end">
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[110px] '>Entered at:</div> 
         
    <div className='w-full text-xl'> {DateAndTimeInHuman(data?.entryTimeStamp)}
    </div>
         </div>
         
         <div className=' mr-5 text-3xl font-extralight'>|</div>
        
    
          <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-[110px] text-lg '>Exited at: </div> 
    <div className='w-full text-xl'>{DateAndTimeInHuman(data?.exitTimeStamp)}
    </div>
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
         </Card>
    
    {/* History of Entries */}
    <Card className="col-span-2  "> 
    <Suspense fallback={<LogTableLoading/>}>
    <div className=" h-screen p-2 w-full ">

<h1 className="text-3xl text-tremor-content dark:text-dark-tremor-content">History</h1>
 
          <ParkingLogTable columns={columns( ["name","vehicle number", "visitor_for", "visitor_type", "entry_at", "exit_at" , "status","Decided By"])} data={apiDataFormatterWithAmountOptionForTable(data,"society") } />
  
      </div>
      </Suspense>
          
          </Card>
          </div>
      )
}

export default Commerical_WithOutParkingFee_ParkingLog_Page