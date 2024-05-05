import { fetchData } from '@/Utils/API Call/fetchData.js'
import { currentUser } from '@clerk/nextjs';
import ViewDashboard from '@/components/Dashboard/ViewDashboard'
import { useAppSelector } from '@/lib/hooks';
import { ScrollArea } from '@/components/ui/scroll-area';
import NoPropertiesWithUsPage from '@/components/Dashboard/Scene/NoPropertiesWithUsPage';






 const Dashboard = async ()=> {
  
  const {username} = await currentUser();
  const company =  (await fetchData("get",`user/${username}/companies?select=companyID`)).companies ? ((await fetchData("get",`user/${username}/companies`))?.companies[0]) : null
  const society =  (await fetchData("get",`user/${username}/societies?select=societyID`)).societies ? ((await fetchData("get",`user/${username}/societies`))?.societies[0]) : null
  const companyID = company?.companyID || null
  const societyID = society?.societyID || null
   const data = await ( fetchData("get",`parkinglog/${companyID ? "company" : "society" }/get-parkinglogs/${companyID ? companyID : societyID }`))

   const view = (company ? "company" : (society ? "society" : null))
   if(!view){
return (
 <NoPropertiesWithUsPage/>

)

   }

  return(
      <ScrollArea className="h-screen scroll-smooth">
    <div className=" pt-5  ">
     
      <ViewDashboard companyData={company} parkingLogData = {data ? data : []} societyData = {society} companyID={companyID} societyID={societyID} view={view}/>
      
      </div>
      </ScrollArea>
      
      )}

export default Dashboard;