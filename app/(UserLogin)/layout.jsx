import Image from "next/image"

export const metadata = {
  title: "Park 'n' Go | Login Page",
  description: 'User Login Page',
}

export default function LoginPageLayout({ children }) {
  return (
<div className="h-screen relative flex items-center justify-center ">
 <div className="flex w-full h-screen items-center justify-center ">
 <div className="flex w-full h-screen items-center justify-start ml-[200px] z-1"> 
   <Image 
  alt="Logo"
  src="/logo/logoParkWhite.svg"
  width={154}
  height={56}
  className="scale-[300%] "
  /> 
  </div>
 <div className="flex w-full items-center justify-center z-10">
  <div className="w-[200px] h-[350px] md:w-[300px] md:h-[300px]
  absolute bg-white rounded-full flex -top-[200px] -left-[300px] logoglow scale-[3] opacity-20">

  </div>
  {children}
 </div>
 <div className="flex w-full justify-end mr-[200px] z-1">

   <Image 
  alt="Logo"
  src="/logo/logoGoWhite.svg"
  width={154}
  height={56}
  className="scale-[200%]"
  /> 
  
  </div>
  
        </div>
        </div>
    
    
  )
}
