'use client'
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { ComboboxDemo } from "../ui/ComboboxDemo";
import { fetchData } from "@/Utils/API Call/fetchData";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAppDispatch } from "@/lib/hooks";
import { switchView } from "@/lib/features/dashboard/dashboardOptionSlice";



const SideBar = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="w-72 h-screen border-r border-gray-300 bg-white">
      {/* Logo Section */}

      <div className=" h-14 flex items-center justify-center  my-2">
        {/* <Link href="/dashboard"> */}
          
          <Tabs defaultValue="company" className="w-[200px] mt-[45px]">
        <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="company" onClick={()=>{
          dispatch(switchView({view:"company"}))
        }}>Company</TabsTrigger>
        <TabsTrigger value="society" onClick={()=>{
          dispatch(switchView({view:"society"}))
        }}>Society</TabsTrigger>
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

      <div></div>
    </div>
  );
};

export default SideBar;
