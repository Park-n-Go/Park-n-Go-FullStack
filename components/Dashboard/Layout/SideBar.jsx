"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ComboboxDemo } from "../../ui/ComboboxDemo";
import { fetchData } from "@/Utils/API Call/fetchData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setQuery,
  switchView,
} from "@/lib/features/dashboard/dashboardOptionSlice";
import {
  Book,
  BookAIcon,
  BookDashed,
  BookDashedIcon,
  BookOpen,
  List,
  ListCollapseIcon,
} from "lucide-react";
import { Card } from "@tremor/react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SIDEBAROPTIONSFORCOMPANY, SIDEBAROPTIONSFORSOCIETY } from "@/CONSTANT";



const SideBar = ({ view }) => {
  const router = usePathname();
  const nextRouter = useRouter();
  
const companyID = useAppSelector((state)=>(state.dashboardOptionReducer.companyID))
const societyID = useAppSelector((state)=>(state.dashboardOptionReducer.societyID))

  const updatedView =
    useAppSelector((state) => state.dashboardOptionReducer.view) ||
    (typeof window !== "undefined"
      ? localStorage.getItem("view")
      : "Not Found") ||
    (router.split("/").flatMap((pathName) => (pathName != "" ? pathName : []))
      .length > 2
      ? router
          .split("/")
          .flatMap((pathName) => (pathName != "" ? pathName : []))
          .at(-2)
      : view );

  const urlQuery = router
    .split("/")
    .flatMap((pathName) => (pathName != "" ? pathName : []))
    .at(-1);
  const storeQuery = useAppSelector(
    (state) => state.dashboardOptionReducer.query
  );

  const dispatch = useAppDispatch();

  dispatch(switchView({ view: updatedView || view || "company"}));

 

  return (
    <div className="w-72 h-screen border-r border-gray-300  ">
      {/* Logo Section */}

      <div className=" h-14 flex items-center justify-center  my-2 mb-14">
        {/* <Link href="/dashboard"> */}

        <Tabs
          defaultValue={updatedView || view }
          className="w-[200px] mt-[45px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="company"
              onClick={() => {
                dispatch(switchView({ view: "company" }));
                if (urlQuery && storeQuery && urlQuery === storeQuery) {
                  dispatch(setQuery(""));
                  nextRouter.push("/dashboard");
                }
              }}
            >
              Commercial
            </TabsTrigger>
            <TabsTrigger
              value="society"
              onClick={() => {
                dispatch(switchView({ view: "society" }));

                if (urlQuery && storeQuery && urlQuery === storeQuery) {
                  dispatch(setQuery(""));
                  nextRouter.push("/dashboard");
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
        </Tabs>

        {/* <Image
            src="/LogoWithOutBG.svg"
            width={100}
            height={100}
            alt='Park "n" Go'
          /> */}

        {/* </Link> */}
      </div>
      <div className="w-full h-screen flex flex-col justify-start border-t-[1px]  ">
        
        {!companyID && !societyID ? <></> :  ((updatedView || view) === "company"
          ? SIDEBAROPTIONSFORCOMPANY
          : (updatedView || view) === "society"
          ? SIDEBAROPTIONSFORSOCIETY
          : []
        ).map((option) => (
          <Link
            href={option.href}
            className={`group p-2 flex items-center justify-start gap-x-5 cursor-pointer w-[90%] mx-2 h-11 dark-hover:bg-dark-tremor-background-muted  mt-2 rounded-md `}
            key={option.href}
          >
            <div
              className={`cursor-pointer text-${option.color}-900  group-hover:text-${option.color}-500  transition-all ease-in-out`}
            >
              {option.icon}
            </div>
            <label className="cursor-pointer text-tremor-content group-hover:text-tremor-content-emphasis ">
              {option.title}
            </label>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
