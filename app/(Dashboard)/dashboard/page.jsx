
import { fetchData } from '@/Utils/API Call/fetchData.js'
import Test from '@/components/test'
import { useAppSelector } from '@/lib/hooks'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs';





 const Dashboard = async ()=> {
  const {username} = await currentUser();
  const {companyID} = (await fetchData("get",`user/${username}/companies?select=companyID`)).companies ? ((await fetchData("get",`user/${username}/companies?select=companyID`)).companies[0]) : {companyID:false}
   const data = await ( fetchData("get",`parkinglog/get-parkinglogs/${companyID}`))
  
  return (
<div className=" h-screen">
  
  <Test data = {companyID ? JSON.stringify(data.parkingLogs) : companyID} companyID={companyID}/>
</div>

  )
}

export default Dashboard;