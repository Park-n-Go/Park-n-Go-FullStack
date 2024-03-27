"use client"
import React from "react";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DarkMode } from "../DarkMode";
import { usePathname } from "next/navigation";
import { titleize } from "@/Utils/titlelize";
import { useAppSelector } from "@/lib/hooks";
import { navBarOptions } from "@/CONSTANT";





const NavBar = () => {


  const router = usePathname();
  const navBarTitles = router.split("/").flatMap((pathName)=>(pathName != "" ? pathName : []))
  const view = useAppSelector((state)=>(state.dashboardOptionReducer.view))
 







  // return (<div className="w-full"></div>)
  return (
    <div className="w-full p-5 h-[60px] flex items-center border-b border-gray-300 ">
      <div className="flex items-center justify-between w-full">
        <div className="flex h-5 items-center">
        
        
{navBarTitles.map((navBarTitle,index)=>(
  <Link href={`/${navBarTitles.slice(0,index+1).join("/")}`} key={navBarTitle}>
         
         <div className="group text-tremor-default flex items-center gap-2 cursor-pointer transition ease-in-out  duration-300 p-1 ">
           {navBarTitle === "dashboard" ?  <LayoutDashboard /> : <>{"/"}</>}
           <h1 className="text-tremor-default group-hover:underline group-hover:underline-offset-2">{titleize((navBarTitle === "records" ? (view === "company" ? "Parking Logs" : "Entries") : navBarTitle))}           
           </h1>
         </div>
       </Link>

))}

        



        
        
        
        </div>



        <div className="flex items-center px-3 gap-3">
          <div className="flex items-center gap-5">
            {navBarOptions.map((navBarOption) => (
              <div
                key={navBarOption.url}
                className={cn(
                  "flex text-black items-center justify-center cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300  p-1 rounded-xl  ",
                  ""
                )}
              >
                <div>
                  <Link href={navBarOption.url}>
                    <div className="flex items-center justify-center">
                      <navBarOption.icon
                        className={cn(
                          "text-2xl font-bold text-gray-500",
                          `${navBarOption.iconColor}`
                        )}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
            <div className="flex  items-center justify-center cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  p-1 rounded-xl ">
            <DarkMode/>
          </div>
          <div className="flex text-black items-center justify-center cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  p-1 rounded-xl ">
            <UserButton afterSignOutUrl="/" />
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default NavBar;
