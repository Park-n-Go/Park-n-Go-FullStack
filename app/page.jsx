
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {




  return (
    <div className="h-screen w-full flex flex-col  text-5xl font-bold items-center justify-center">
     Home Page
     <Link href="/sign-in" className="mt-5 bg-indigo-400 p-2 rounded-md text-white">Sign In</Link>
    </div>
  )
}
