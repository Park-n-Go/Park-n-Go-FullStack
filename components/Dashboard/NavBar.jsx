import React from "react";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, LucideDollarSign, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DarkMode } from "./DarkMode";

const navBarOptions = [
  {
    label: "Analytics",
    icon: PieChart,
    iconColor: "transition ease-in-out hover:text-pink-600 duration-300",
    url: "/dashboard/analytic",
  },
  {
    label: "Payment",
    icon: LucideDollarSign,
    iconColor: "transition ease-in-out hover:text-emerald-600 duration-300",
    url: "/dashboard/payment",
  },
];

const NavBar = () => {
  // return (<div className="w-full"></div>)
  return (
    <div className="w-full p-5 h-[60px] flex items-center bg-white border-b border-gray-300">
      <div className="flex items-center justify-between w-full">
        <Link href="/dashboard">
          <div className="text-gray-700 flex gap-2 cursor-pointer transition ease-in-out delay-150  duration-300  p-2  rounded-xl">
            <LayoutDashboard />
            Dashboard
          </div>
        </Link>
        {/* <div className="w-full flex justify-center items-center">
        <Tabs defaultValue="company" className="w-[200px]">
        <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="company">Company</TabsTrigger>
        <TabsTrigger value="society">Society</TabsTrigger>
      </TabsList>
      </Tabs>
        </div> */}
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
            <div className="flex text-black items-center justify-center cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300  p-1 rounded-xl ">
            <DarkMode/>
          </div>
          <div className="flex text-black items-center justify-center cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300  p-1 rounded-xl ">
            <UserButton afterSignOutUrl="/" />
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default NavBar;
