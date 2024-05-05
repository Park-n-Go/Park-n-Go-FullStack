"use client";
import { fetchData } from "@/Utils/API Call/fetchData";
import NavBar from "@/components/Dashboard/Layout/NavBar";
import NotificationSide from "@/components/Dashboard/Layout/NotificationSide";
import SideBar from "@/components/Dashboard/Layout/SideBar";
import {
  setCompanyID,
  setSocietyID,
} from "@/lib/features/dashboard/dashboardOptionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const { user } = useUser();

  const [company, setCompany] = useState();
  const [society, setSociety] = useState();
  const [companyid, setCompanyid] = useState();
  const [societyid, setSocietyid] = useState();
  const [view, setView] = useState();

const [isLocalStorageLoaded,setIsLocalStorageLoaded] = useState(typeof window !== "undefined")

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.username) {
      if (typeof window !== "undefined"  && !view && localStorage.getItem("view")) {
        setView(localStorage.getItem("view"));
      }

      if (typeof window !== "undefined" && localStorage.getItem("companyID") && !company && view) {
        fetchData(
          "get",
          `company/${localStorage.getItem("companyID")}`,
          "http://localhost:3000/api/"
        ).then((Company) => {
          setCompany(Company);
          dispatch(setCompanyID(Company?.companyID));
          setCompanyid(Company?.companyID);
          if( Company && !view){

            // localStorage.setItem("view", "company");
            setView("company");
          }
        });
      } else if ( !company) {
        fetchData("get", "companies", "http://localhost:3000/api/").then(
          ({ companies }) => {
            setCompany(companies[0]);
            dispatch(setCompanyID(companies[0]?.companyID));
            setCompanyid(companies[0]?.companyID);
           
            if(companies && !view && typeof window !== "undefined"){

              // localStorage.setItem("view", "company");
              
            localStorage.setItem("companyID", companies[0]?.companyID);
            setView("company");
            }
          }
        );
      }

      if (typeof window !== "undefined"  && localStorage.getItem("societyID") && !society  && view) {
        fetchData(
          "get",
          `society/${localStorage.getItem("societyID")}`,
          "http://localhost:3000/api/"
        ).then((Society) => {
          setSociety(Society);
          dispatch(setSocietyID(Society?.societyID));
          setSocietyid(Society?.societyID);
          if(Society && !view){

            // localStorage.setItem("view", "society");
            
            setView("society");
            }
        });
      } else if (!society) {
        fetchData("get", "societies", "http://localhost:3000/api/").then(
          ({ societies }) => {
            setSociety(societies[0]);
            dispatch(setSocietyID(societies[0]?.societyID));
            setSocietyid(societies[0]?.societyID);
           
            if(societies && !view && typeof window !== "undefined"){

            // localStorage.setItem("view", "society");
            localStorage.setItem("societyID", societies[0]?.societyID);
            setView("society");
            }
          }
        );
      }





      if(typeof window !== "undefined" && view ){
localStorage.setItem("view",view)

      }









    }




 
  }, [user,view,companyid,societyid]);

  return (
    <html lang="en" className="dark:bg-slate-950 antialiased">
      <body className="relative no-scrollbar">
        <div className=" flex fixed w-full ">
          <SideBar
            rootview={view}
            companyid={companyid || company?.companyID}
            societyid={societyid || society?.societyID}
          />
          <div className="flex flex-col w-full">
            <div className="pb-1">
              <NavBar />
            </div>
            <div className="">{children}</div>
          </div>
          <NotificationSide />
        </div>
      </body>
    </html>
  );
}
