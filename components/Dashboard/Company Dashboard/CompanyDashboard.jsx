"use client";
import OwnerDashboard from "./Owner Dashboard/OwnerDashboard";

const CompanyDashboard = ({companyData,societyData,companyID,societyID,companyParkingLogData}) => {

     return (<div className="">

<OwnerDashboard companyParkingLogData={companyParkingLogData} companyData={companyData} companyID={companyID} />
  </div>

  )
}

export default CompanyDashboard