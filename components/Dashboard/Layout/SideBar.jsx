"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ComboboxDemo } from "../../ui/ComboboxDemo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setQuery,
  switchView,
} from "@/lib/features/dashboard/dashboardOptionSlice";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAROPTIONSFORCOMPANY, SIDEBAROPTIONSFORSOCIETY } from "@/CONSTANT";

const SideBar = ({ rootview, companyid, societyid }) => {
  const router = usePathname();
  const nextRouter = useRouter();
  const [view,setView]=useState(useAppSelector((state) => state.dashboardOptionReducer.view) || rootview)



  const [companyID, setCompanyID] = useState(useAppSelector((state) => state.dashboardOptionReducer.companyID) || companyid);
  const [societyID, setSocietyID] = useState(useAppSelector((state) => state.dashboardOptionReducer.societyID) || societyid);

  const [updatedView, setUpdatedView] = useState(useAppSelector((state) => state.dashboardOptionReducer.view))

  // const [defaultView,setDefaultView] = useState()





 

  const urlQuery = router
    .split("/")
    .flatMap((pathName) => (pathName != "" ? pathName : []))
    .at(-1);
  const storeQuery = useAppSelector(
    (state) => state.dashboardOptionReducer.query
  );

  const dispatch = useAppDispatch();

  useEffect(() => {


//Handling Url Navigation For SideBar

setUpdatedView(router?.split("/")?.filter((url) => url === "company" || url === "society")
?.length > 0
? router
    .split("/")
    .filter(
      (pathName) =>
        pathName != "" &&
        (pathName === "company" || pathName === "society")
    )[0]
: typeof window !== "undefined" && localStorage.getItem("view")
? localStorage.getItem("view")
: updatedView || view)


// Handle LocalStorage Data For SideBar


if(!updatedView && typeof window !== "undefined" && localStorage.getItem("view")){
  setUpdatedView(localStorage.getItem("view"))
}

    if (router?.split("/")?.filter((url) => url === "company" || url === "society")
      ?.length === 0 && updatedView && typeof window !== "undefined") {

     






      if (
        updatedView === "company" && !companyID
        
      ) {
        
        setCompanyID(localStorage.getItem("companyID"));

      } else if (
        updatedView === "society" &&
        !societyID
      ) {
        setSocietyID(localStorage.getItem("societyID"));
      }
    }


  }, [view, updatedView, companyID, societyID, companyid, societyid,rootview]);

//   useEffect(()=>{
// if(rootview){
// setDefaultView(rootview)
// }
//   },[defaultView,rootview])

  return (
    <div className="w-72 h-screen border-r border-gray-300  ">
      {/* Logo Section */}

      <div className=" h-14 flex items-center justify-center  my-2 mb-14">
        {/* <Link href="/dashboard"> */}

        {updatedView &&  <Tabs
          defaultValue={updatedView || view }
          className="w-[200px] mt-[45px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="company"
              onClick={() => {
                dispatch(switchView({ view: "company" }));
                setUpdatedView("company");
                if (urlQuery && storeQuery && urlQuery === storeQuery) {
                  dispatch(setQuery(""));
                  nextRouter.push("/dashboard");
                } else {
                  const url = router
                    .split("/")
                    .map((urlPathName) => {
                      if (urlPathName === "society") {
                        return "company";
                      }
                      return urlPathName;
                    })
                    .join("/");
                  nextRouter.push(url);
                  dispatch(setQuery(""));
                }
              }}
            >
              Commercial
            </TabsTrigger>
            <TabsTrigger
              value="society"
              onClick={() => {
                dispatch(switchView({ view: "society" }));
                setUpdatedView("society");

                if (urlQuery && storeQuery && urlQuery === storeQuery) {
                  dispatch(setQuery(""));
                  nextRouter.push("/dashboard");
                } else {
                  const url = router
                    .split("/")
                    .map((urlPathName) => {
                      if (urlPathName === "company") {
                        return "society";
                      }
                      return urlPathName;
                    })
                    .join("/");
                  nextRouter.push(url);
                  dispatch(setQuery(""));
                }
              }}
            >
              Residential
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <ComboboxDemo option="company" />
          </TabsContent>
          <TabsContent value="society">
            <ComboboxDemo option="society" />
          </TabsContent>
        </Tabs>}
       
      </div>
      <div className="w-full h-screen flex flex-col justify-start border-t-[1px]  ">
        {!companyID && !societyID ? (
          <></>
        ) : (
          ((updatedView || view) === "company"
            ? SIDEBAROPTIONSFORCOMPANY
            : (updatedView || view) === "society"
            ? SIDEBAROPTIONSFORSOCIETY
            : []
          )?.map((option) => (
            <Link
              href={option.href}
              className={`group p-2 flex items-center justify-start gap-x-5 cursor-pointer w-[90%] mx-2 h-11 dark-hover:bg-dark-tremor-background-muted  mt-2 rounded-md `}
              key={option.href}
            >
              <div
                className={`cursor-pointer text-${option?.color}-900  group-hover:text-${option?.color}-500  transition-all ease-in-out`}
              >
                {option?.icon}
              </div>
              <label className="cursor-pointer text-tremor-content group-hover:text-tremor-content-emphasis ">
                {option?.title}
              </label>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SideBar;
