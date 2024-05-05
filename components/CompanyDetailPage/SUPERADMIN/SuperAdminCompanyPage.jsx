"use client";
import { fetchData } from "@/Utils/API Call/fetchData";
import { removeNullValueFromAnObject } from "@/Utils/removeNullValueFromAnObject";
import AddressCard from "@/components/AddressCard";
import CompanyProfilePictureCarousel from "@/components/CompanyProfilePictureCarousel/CompanyProfilePictureCarousel";
import EditCompanyDetailPage from "@/components/EditCompanyDetailPage/EditCompanyDetailPage";
import ArrayInputAndDisplay from "@/components/Form/ArrayInputAndDisplay";
import ArrayInputAndDisplayWithAddButton from "@/components/Form/ArrayInputAndDisplayWithAddButton";
import ParkingLogCarousel from "@/components/ParkingLogCarousel/ParkingLogCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@tremor/react";
import { CheckIcon, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SuperAdminCompanyPage = () => {
  const [officePhoneNumberList, setOfficePhoneNumberList] = useState();
  const [officeEmailList, setofficeEmailList] = useState();

  const companyID = useAppSelector(
    (state) => state.dashboardOptionReducer.companyID
  );
  const societyID = useAppSelector(
    (state) => state.dashboardOptionReducer.societyID
  );
  const view= useAppSelector((state) => state.dashboardOptionReducer.view)
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["companyDetails", companyID, societyID, view],
    queryFn: async () => {
      const data = await fetchData(
        "get",
        `${view}/${view === "company" ? companyID : societyID}`,
        "http://localhost:3000/api/"
      );
      setOfficePhoneNumberList(data?.officePhoneNumbers);

      setofficeEmailList(data?.companyOfficeEmail);

      return data;
    },
    staleTime: 1000,
    refetchInterval: 5000,
  });

  useEffect(() => {}, [
    data,
    officePhoneNumberList,
    officeEmailList,
    view,
    companyID,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  const officePhoneNumberListFromChild = (phoneNumbers) => {
    setOfficePhoneNumberList(phoneNumbers);
    updateCompanyProfileArrayData({ officePhoneNumbers: phoneNumbers });
  };
  const officeEmailListFromChild = (officeEmails) => {
    setofficeEmailList(officeEmails);
    updateCompanyProfileArrayData({ companyOfficeEmail: officeEmails });
  };

  const dataUpdateFromEditPage = (updatedCompanyData) => {
    setOfficePhoneNumberList(updatedCompanyData?.officePhoneNumbers);

    setofficeEmailList(updatedCompanyData?.companyOfficeEmail);
  };

  const updateCompanyProfileArrayData = ({
    officePhoneNumbers,
    companyOfficeEmail,
  }) => {
    const payload = removeNullValueFromAnObject({
      companyID,
      officePhoneNumbers,
      companyOfficeEmail,
    });
    fetchData(
      "patch",
      "api/modification/company",
      "http://localhost:3000/",
      payload
    )
      .then((res) => {
        refetch();
        toast(
          <div className="flex space-x-5 justify-center items-center">
            Company Profile Updated
            <CheckIcon className="text-emerald-700 mx-2" />
          </div>
        );
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
  };

  return (
    <div className="grid grid-cols-2 gap-2 p-5 w-full -mt-2">
      <Card className="shadow-md h-screen">
        <div className=" w-full px-14 ">
          <CompanyProfilePictureCarousel
            imageUrls={
              view === "society"
                ? data?.societyProfilePictures
                : data?.companyProfilePictures
            }
          />
        </div>
      </Card>
      {/* Parking Log Details */}

      <section className="flex flex-col h-screen justify-between">
        <ScrollArea className="h-[100vh] ">
          <div className="p-2">
            {/* Title */}
            <div className="w-full flex items-center">
              <div className="w-full flex flex-col">
                <div className="text-3xl  font-bold">
                  {view === "society" ? data?.societyName : data?.companyName}
                </div>
                <div>
                  <Badge variant="outline">
                    {view === "society" ? data?.societyID : data?.companyID}
                  </Badge>
                </div>
              </div>

              <div>
                <EditCompanyDetailPage
                  data={data}
                  refetch={refetch}
                  isLoading={isLoading}
                  sendDataBack={dataUpdateFromEditPage}
                />
              </div>
            </div>

            {/* Parking Log Details Starts Here */}

            {view === "company" ? (
              <div className="w-full  flex items-end justify-start space-y-2 space-x-2 mt-10">
                <div className="w-[150px] ">Building Name: </div>
                <div className="w-full text-xl">{data?.buildingName}</div>
              </div>
            ) : (
              <div className="w-full  flex items-end justify-start space-y-2 space-x-2 mt-5">
                <div className="w-[150px] text-lg">Builder Name:</div>
                <div className="w-full text-xl">{data?.builderName}</div>
              </div>
            )}

            {view === "society" ? (
              <>
                <div className="w-full  flex items-start justify-start space-y-2 space-x-2  mt-10">
                  <div className="w-[150px] text-lg">Society Address:</div>
                  <div className="w-full grid gap-2 gap-y-5 grid-cols-4">
                    <div className="text-left">Address Line One:</div>
                    <div className="col-span-3 text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.societyAddress?.addresslineOne}
                    </div>
                    <div className="text-left">Address Line Two:</div>
                    <div
                      className={cn(
                        "col-span-3 text-left ",
                        data?.societyAddress?.addresslineTwo
                          ? "text-xl dark:bg-foreground/10 px-2 rounded-md"
                          : ""
                      )}
                    >
                      {data?.societyAddress?.addresslineTwo}
                    </div>
                    <div className="text-left">Landmark:</div>
                    <div
                      className={cn(
                        "col-span-3 text-left ",
                        data?.societyAddress?.landMark
                          ? "text-xl dark:bg-foreground/10 px-2 rounded-md"
                          : ""
                      )}
                    >
                      {data?.societyAddress?.landMark}
                    </div>
                    <div className="text-left">City:</div>
                    <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.societyAddress?.city}
                    </div>
                    <div className="text-left">State:</div>
                    <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.societyAddress?.state}
                    </div>
                    <div className="text-left">Country:</div>
                    <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.societyAddress?.country}
                    </div>
                    <div className="text-left bg-">Pin-Code:</div>
                    <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.societyAddress?.pinCode}
                    </div>
                  </div>
                </div>

                <div className="w-full  flex items-start justify-start space-y-2 space-x-2  mt-10">
                  <div className="w-[150px] text-lg">
                    Builder - OfficeAddress:
                  </div>
                  <div className="w-full grid gap-2 gap-y-5 grid-cols-4">
                    <div className="text-left">Address Line One:</div>
                    <div className="col-span-3 text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.builderOfficeAddress?.addresslineOne}
                    </div>
                    <div className="text-left">Address Line Two:</div>
                    <div
                      className={cn(
                        "col-span-3 text-left ",
                        data?.builderOfficeAddress?.addresslineTwo
                          ? "text-xl dark:bg-foreground/10 px-2 rounded-md"
                          : ""
                      )}
                    >
                      {data?.builderOfficeAddress?.addresslineTwo}
                    </div>
                    <div className="text-left">Landmark:</div>
                    <div
                      className={cn(
                        "col-span-3 text-left ",
                        data?.builderOfficeAddress?.landMark
                          ? "text-xl dark:bg-foreground/10 px-2 rounded-md"
                          : ""
                      )}
                    >
                      {data?.builderOfficeAddress?.landMark}
                    </div>
                    <div className="text-left">City:</div>
                    <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.builderOfficeAddress?.city}
                    </div>
                    <div className="text-left">State:</div>
                    <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.builderOfficeAddress?.state}
                    </div>
                    <div className="text-left">Country:</div>
                    <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.builderOfficeAddress?.country}
                    </div>
                    <div className="text-left bg-">Pin-Code:</div>
                    <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                      {data?.builderOfficeAddress?.pinCode}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full  flex items-end justify-start space-y-2  mt-10">
                <div className="w-full grid gap-2 gap-y-5 grid-cols-4">
                  <div className="text-left">Address Line One:</div>
                  <div className="col-span-3 text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                    {data?.companyAddress?.addresslineOne}
                  </div>
                  <div className="text-left">Address Line Two:</div>
                  <div
                    className={cn(
                      "col-span-3 text-left ",
                      data?.companyAddress?.addresslineTwo
                        ? "text-xl dark:bg-foreground/10 px-2 rounded-md"
                        : ""
                    )}
                  >
                    {data?.companyAddress?.addresslineTwo}
                  </div>
                  <div className="text-left">Landmark:</div>
                  <div
                    className={cn(
                      "col-span-3 text-left ",
                      data?.companyAddress?.landMark
                        ? "text-xl dark:bg-foreground/10 px-2 rounded-md"
                        : ""
                    )}
                  >
                    {data?.companyAddress?.landMark}
                  </div>
                  <div className="text-left">City:</div>
                  <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                    {data?.companyAddress?.city}
                  </div>
                  <div className="text-left">State:</div>
                  <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                    {data?.companyAddress?.state}
                  </div>
                  <div className="text-left">Country:</div>
                  <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                    {data?.companyAddress?.country}
                  </div>
                  <div className="text-left bg-">Pin-Code:</div>
                  <div className="text-left text-xl dark:bg-foreground/10 px-2 rounded-md">
                    {data?.companyAddress?.pinCode}
                  </div>
                </div>
              </div>
            )}

            <div className="w-full  flex flex-col  items-center justify-start space-y-5  mt-10">
              <div className="w-full flex items-center">
                <div className="w-36">Office Numbers:</div>
                <div
                  className={cn(
                    "w-full",
                    officePhoneNumberList?.length === 0
                      ? "flex justify-start"
                      : ""
                  )}
                >
                  <ArrayInputAndDisplayWithAddButton
                    displayClassName={cn(
                      "w-[145%] -ml-16 ",
                      officePhoneNumberList?.length === 0 && "w-0"
                    )}
                    className={cn(
                      "",
                      officePhoneNumberList?.length === 0 && "flex ml-14"
                    )}
                    list={officePhoneNumberList}
                    sendDataBack={officePhoneNumberListFromChild}
                    lable={"Office Phone-Number"}
                    type="NUMBER"
                  />
                </div>
              </div>

              {view === "company" && (
                <div className="w-full flex  items-center">
                  <div className="w-36">Offical Emails:</div>
                  <div
                    className={cn(
                      "w-full",
                      officeEmailList?.length === 0 ? "flex justify-start" : ""
                    )}
                  >
                    <ArrayInputAndDisplayWithAddButton
                      displayClassName={cn(
                        "w-[145%] -ml-16 ",
                        officeEmailList?.length === 0 && "w-0"
                      )}
                      className={cn(
                        "",
                        officeEmailList?.length === 0 && "flex ml-14"
                      )}
                      list={officeEmailList}
                      sendDataBack={officeEmailListFromChild}
                      lable={"Offical Email-Address"}
                      type="EMAIL"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2 mt-5">
              <a target="_blank" href="/dashboard">
                <Button className="flex gap-2 items-center justify-between transition ease-in-out delay-150  duration-300 bg-indigo-400 hover:bg-indigo-800 dark:text-white">
                  Manage Users <ExternalLink />
                </Button>
              </a>
              <a target="_blank" href="/dashboard">
                <Button className="flex gap-2 items-center justify-between transition ease-in-out delay-150  duration-300 bg-indigo-400 hover:bg-indigo-800 dark:text-white">
                  {view} Roles
                  <ExternalLink />
                </Button>
              </a>
              <a target="_blank" href="/dashboard">
                <Button className="flex gap-2 items-center justify-between transition ease-in-out delay-150  duration-300 bg-indigo-400 hover:bg-indigo-800 dark:text-white">
                  Manage Users <ExternalLink />
                </Button>
              </a>
              <a target="_blank" href="/dashboard">
                <Button className="flex gap-2 items-center justify-between transition ease-in-out delay-150  duration-300 bg-transparent text-black dark:text-white border hover:bg-indigo-800 hover:text-white">
                  Manage Users <ExternalLink />
                </Button>
              </a>
            </div>
          </div>
        </ScrollArea>
      </section>
    </div>
  );
};

export default SuperAdminCompanyPage;
