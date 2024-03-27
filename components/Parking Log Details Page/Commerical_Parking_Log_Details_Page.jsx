import Commerical_ParkingFee_ParkingLog_Page from "./Commerical Parking Log Details Page/Commerical_ParkingFee_ParkingLog_Page/Commerical_ParkingFee_ParkingLog_Page.jsx"
import  Commerical_WithOutParkingFee_ParkingLog_Page  from "./Commerical Parking Log Details Page/Commerical_WithOutParkingFee_ParkingLog_Page/Commerical_WithOutParkingFee_ParkingLog_Page.jsx"





export const Commerical_Parking_Log_Details_Page = ({data,imageUrls}) => {
 
if(!data){
return(<div>No Data!</div>)
}


     if(data?.payment){
         return(<><Commerical_ParkingFee_ParkingLog_Page data={data} imageUrls={imageUrls} /></>)
}else{
         return(<div className="w-full h-screen"><Commerical_WithOutParkingFee_ParkingLog_Page data={data} imageUrls={imageUrls}  /></div>)
    }
}

