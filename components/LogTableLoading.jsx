import React from 'react'
import { Skeleton } from './ui/skeleton'

const LogTableLoading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'> <div className="flex flex-col space-y-3">
    <div className="space-y-2">
     
     <Skeleton className="h-10 w-[400px]" />
   </div>
    <Skeleton className="h-[700px] w-[1000px] rounded-xl" />
    
  </div>
  </div>
  )
}

export default LogTableLoading