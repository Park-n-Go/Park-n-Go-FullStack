"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { fetchData } from "@/Utils/API Call/fetchData.js"
import { useDispatch } from "react-redux"
import { setCompanyID,  setQuery,  setSocietyID, setUserName } from "@/lib/features/dashboard/dashboardOptionSlice.js"
import { useAppDispatch, useAppSelector } from "@/lib/hooks.js"
import { useUser } from "@clerk/clerk-react";
import { usePathname, useRouter } from "next/navigation"







export function ComboboxDemo(props) {
  const {  user  } = useUser();
const [userName,setUserName] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(props.option === "company" ? useAppSelector((store)=> (store.dashboardOptionReducer.companyID)) : useAppSelector ((store)=> (store.dashboardOptionReducer.societyID)))

  const [companies,setCompanies] = React.useState(null)
  const [socities,setSocities] = React.useState(null)  

  const router = usePathname();
  const nextRouter = useRouter();
  
  const urlQuery = router.split("/").flatMap((pathName)=>(pathName != "" ? pathName : [])).at(-1)
  const storeQuery = useAppSelector((state)=>(state.dashboardOptionReducer.query))
  
  const dispatch = useAppDispatch()

  React.useEffect(()=>{
    if(urlQuery && storeQuery && urlQuery === storeQuery){
      dispatch(setQuery(""))
      nextRouter.push("/dashboard")
    }
    if(props.option === "company"){
     fetchData("get",`user/${user?.username}/companies?select=companyName,companyID`).then((res)=>{
      const companyList = res.companies?.map((company)=>{

        return({label:company.companyName,value:company.companyID})
      })

      setCompanies(companyList)
      if(value === ''){
        dispatch(setCompanyID(companyList[0].value))
        setValue(companyList[0].value)
      }
      

     
      
     })
     
    }else if(props.option === "society"){
      fetchData("get",`user/${user?.username}/societies?select=societyName,societyID`).then((res)=>{
        const societyList = res.societies.map((society)=>{
  
          return({label:society.societyName,value:society.societyID})
        })
        setSocities(societyList)
        if(value === ''){
          dispatch(setSocietyID(societyList[0].value))
          setValue(societyList[0].value)
          }
      
      
       })
    }

  },[user,value])

  if(socities){
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            { value 
              ? socities.find((Society) => Society.value === value)?.label.slice(0,21)
              : "Select Society..." }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Society..." />
            <CommandEmpty>{`No Society found.`}</CommandEmpty>
            <CommandGroup>
              {socities?.map((Society) => (
                <CommandItem
                  key={Society.value}
                  value={Society.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    dispatch(setSocietyID(currentValue))
                    setOpen(false)
                    
                  }}

                 
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === Society.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {Society.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }

  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          { value
            ? companies?.find((company) => company.value === value)?.label.slice(0,21)
            : (companies ? "Select Company..." : socities ? "Select Society..." : "Select Other...")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={companies ? "Search Company..." : socities ? "Search Society..." : "Search Other..."} />
          <CommandEmpty>{`No ${companies ? "Company" : socities ? "Society" : "Other"} found.`}</CommandEmpty>
          <CommandGroup>
            {companies?.map((company) => (
              <CommandItem
                key={company.value}
                value={company.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  dispatch(setCompanyID(currentValue))
                  setOpen(false)
                }}
               
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === company.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {company.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
