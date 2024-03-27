import { DateAndTimeInHuman } from "../Date and Time Formatter/DateAndTimeInHuman"

export const apiDataFormatterWithAmountOptionForTable = (array,isIncludeAmount)=>{
    const parkingLogData = array?.parkingLogs?.map((parkingLog)=>(isIncludeAmount ? {
          parkingLogID: parkingLog?.parkingLogID ? parkingLog?.parkingLogID : "-",
          vehicle_number: parkingLog?.vehicleNumber ? parkingLog?.vehicleNumber : "-",
          vehicle_type: parkingLog?.vehicleType ? parkingLog?.vehicleType : "-",          
          entry_at:parkingLog?.entryTimeStamp ? DateAndTimeInHuman(parkingLog?.entryTimeStamp) : "-",
          exit_at:parkingLog?.exitTimeStamp ? DateAndTimeInHuman(parkingLog?.exitTimeStamp) : "-",
        duration: parkingLog?.duration ? parkingLog?.duration : "-",
        amount:parkingLog?.payment?.totalAmount?.amount ? parkingLog?.payment?.totalAmount?.amount : "-"
        } : {
          
          parkingLogID: parkingLog?.parkingLogID ? parkingLog?.parkingLogID : "-",
            name: parkingLog?.name ? parkingLog?.name : "-",
            visitor_for: parkingLog?.visitorFor ? parkingLog?.visitorFor : "-",
            visitor_type: parkingLog?.visitorType ? parkingLog?.visitorType : "-",
            is_approved: parkingLog?.isApproved ? parkingLog?.isApproved : "-",
            vehicle_number: parkingLog?.vehicleNumber ? parkingLog?.vehicleNumber : "-",
            vehicle_type: parkingLog?.vehicleType ? parkingLog?.vehicleType : "-",
            entry_at:parkingLog?.entryTimeStamp ? DateAndTimeInHuman(parkingLog?.entryTimeStamp) : "-",
            exit_at:parkingLog?.exitTimeStamp ? DateAndTimeInHuman(parkingLog?.exitTimeStamp) : "-",
          duration: parkingLog?.duration ? parkingLog?.duration : "-"
          }))
        return(parkingLogData || [])
  }