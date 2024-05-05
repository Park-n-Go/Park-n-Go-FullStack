"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "../ui/badge";

import {
  X,
  CheckIcon,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { removeNullValueFromAnObject } from "@/Utils/removeNullValueFromAnObject";
import { fetchData } from "@/Utils/API Call/fetchData";
import { toast } from "sonner";
import ArrayInputAndDisplayWithAddButton from "../Form/ArrayInputAndDisplayWithAddButton";
import { cn } from "@/lib/utils";

function EditCompanyDetailPage({ data, refetch,isLoading,sendDataBack }) {
  const [companyID, setCompanyID] = useState(data?.companyID);
  const [companyName, setCompanyName] = useState(data?.companyName);
  const [buildingName, setBuildingName] = useState(data?.buildingName);
  const [companyAddress, setCompanyAddress] = useState(data?.companyAddress);
  const [companyGSTNumber, setCompanyGSTNumber] = useState(
    data?.companyGSTNumber
  );
  const [companyPANNumber, setCompanyPANNumber] = useState(
    data?.companyPANNumber
  );


  const [dataIsLoading,setDataIsLoading] = useState(isLoading)

  const [officePhoneNumberList, setOfficePhoneNumberList] = useState(
    data?.officePhoneNumbers
  );
  const [officeEmailList, setofficeEmailList] = useState(
    data?.companyOfficeEmail
  );

  const [insideListUpdated,setInsideListUpdated]= useState(false)

  const officePhoneNumberListFromChild = (phoneNumbers) => {

    setInsideListUpdated(true)
    setOfficePhoneNumberList(phoneNumbers);
  };
  const officeEmailListFromChild = (officeEmails) => {
    
    setInsideListUpdated(true)
    setofficeEmailList(officeEmails);
   
  };

  useEffect(() => {
  if(!insideListUpdated){
  
    setOfficePhoneNumberList(data?.officePhoneNumbers);
    setofficeEmailList( data?.companyOfficeEmail);
  }

  }, [data ]);

  const formSchema = z.object({
    companyName: z.string(),
    buildingName: z.string(),
    companyGSTNumber: z.string(),
    companyPANNumber: z.string(),
    addresslineOne: z.string(),
    addresslineTwo: z.string().optional(),
    landMark: z.string().optional(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pinCode: z
      .string()
      .min(6, { message: "Pincode must be at least 6 characters long" })
      .max(6, { message: "Pincode cannot be longer than 6 characters" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName,
      buildingName,
      addresslineOne: companyAddress?.addresslineOne,
      addresslineTwo: companyAddress?.addresslineTwo,
      landMark: companyAddress?.landMark,
      city: companyAddress?.city,
      state: companyAddress?.state,
      country: companyAddress?.country,
      pinCode: companyAddress?.pinCode?.toString(),
      companyGSTNumber,
      companyPANNumber,
    },
  });

  function onSubmit(values) {
    setDataIsLoading(true)
try {

  values["officePhoneNumbers"] = officePhoneNumberList;
  values["companyOfficeEmail"] = officeEmailList;

  const payload = removeNullValueFromAnObject({
    companyID,
    companyName: values.companyName,
    buildingName: values?.buildingName,
    companyGSTNumber: values?.companyGSTNumber,
    companyPANNumber: values?.companyPANNumber,
    companyAddress: {
      addresslineOne: values?.addresslineOne,
      addresslineTwo: values?.addresslineTwo,
      landMark: values?.landMark,
      city: values?.city,
      state: values?.state,
      country: values?.country,
      pinCode: Number(values?.pinCode),
    },
    officePhoneNumbers: values?.officePhoneNumbers,
    companyOfficeEmail: values?.companyOfficeEmail,
  });



  fetchData(
    "patch",
    "api/modification/company",
    "http://localhost:3000/",
    payload
  )
    .then((res) => {
      
      toast(
        <div className="flex space-x-5 justify-center items-center">
          Company Profile Updated
          <CheckIcon className="text-emerald-700 mx-2" />
        </div>
      );
      sendDataBack(res?.updatedCompanyData);
      
      refetch();

    })
    .catch((err) => {
      console.error({ error_message: err });

      toast(
        <div className="flex space-x-5 justify-center items-center">
          Company Profile Is Not Updated
          <X className="text-red-700 mx-2" />
        </div>
      );
     
    });
   
  
} catch (error) {
  console.error({error_message:error})
}

   
      setDataIsLoading(false)
      
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <button disabled={dataIsLoading} ><Badge className={cn ("cursor-pointer",dataIsLoading && "cursor-not-allowed")}>Edit</Badge></button>
      </DialogTrigger>
      <DialogContent className="w-[425px] md:w-full ">
        <DialogHeader>
          <DialogTitle>Edit Company Profile</DialogTitle>
          <DialogDescription className="text-indigo-400">
            Make changes to your company profile here. Click update when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ScrollArea className="h-[75vh] w-full pr-5">
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Company Name
                          </Label>
                          <Input
                            name="companyName"
                            defaultValue={companyName}
                            className="col-span-3 focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="buildingName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Building Name
                          </Label>
                          <Input
                            name="buildingName"
                            defaultValue={buildingName}
                            className="col-span-3 focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ArrayInputAndDisplayWithAddButton
                  list={officePhoneNumberList}
                  title="Company Office Phone Number"
                  sendDataBack={officePhoneNumberListFromChild}
                  type="NUMBER"
                />
                <ArrayInputAndDisplayWithAddButton
                  list={officeEmailList}
                  title="Company Office Email"
                  sendDataBack={officeEmailListFromChild}
                  type="EMAIL"
                />

                <div className="space-y-4">
                  <Label htmlFor="username">Company Address</Label>
                  <div className="border-[1px] border-indigo-300 p-2 rounded-xl space-y-4">
                    <FormField
                      control={form.control}
                      name="addresslineOne"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4 ">
                              <Label htmlFor="username" className="text-right">
                                Address Line One
                              </Label>
                              <Input
                                {...field}
                                name="addresslineOne"
                                defaultValue={companyAddress?.addresslineOne}
                                className="col-span-3 focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addresslineTwo"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Address Line Two
                              </Label>
                              <Input
                                {...field}
                                name="addresslineTwo"
                                defaultValue={companyAddress?.addresslineTwo}
                                className="col-span-3 focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="landMark"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="username" className="text-right">
                                Landmark
                              </Label>
                              <Input
                                {...field}
                                name="landMark"
                                defaultValue={companyAddress?.landMark}
                                className="col-span-3 focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        City
                      </Label>

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                name="city"
                                defaultValue={companyAddress?.city}
                                className="focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Label htmlFor="username" className="text-right">
                        State
                      </Label>

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                name="state"
                                defaultValue={companyAddress?.state}
                                className="focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Country
                      </Label>

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                name="country"
                                defaultValue={companyAddress?.country}
                                className="focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Label htmlFor="username" className="text-right">
                        Pin-Code
                      </Label>

                      <FormField
                        control={form.control}
                        name="pinCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                name="pinCode"
                                defaultValue={companyAddress?.pinCode?.toString()}
                                className="focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="companyGSTNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Company GST Number
                          </Label>
                          <Input
                            {...field}
                            name="companyGSTNumber"
                            defaultValue={companyGSTNumber}
                            className="col-span-3 focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyPANNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Company PAN Number
                          </Label>
                          <Input
                            {...field}
                            name="companyPANNumber"
                            defaultValue={companyPANNumber}
                            className="col-span-3 focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="transition ease-in-out delay-150  duration-300 bg-indigo-400 hover:bg-indigo-800 dark:text-white"
                >
                 <button onClick={()=>{
                  setInsideListUpdated(false)
                 }}> Update</button>
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCompanyDetailPage;
