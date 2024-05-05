import { apiDataFormatterWithAmountOptionForTable } from "@/Utils/API Data Formatter/apiDataFormatterWithAmountOptionForTable";
import { DateAndTimeInHuman } from "@/Utils/Date and Time Formatter/DateAndTimeInHuman";
import LogTableLoading from "@/components/LogTableLoading";
import ParkingLogCarousel from "@/components/ParkingLogCarousel/ParkingLogCarousel";
import { ParkingLogTable } from "@/components/shadcn/ParkingLog Table With Pagination and Selection/ParkingLogTable";
import { columns } from "@/components/shadcn/ParkingLog Table With Pagination and Selection/columns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button, Card } from "@tremor/react";
import { Suspense } from "react";
import Commerical_WithOutParkingFee_ParkingLog_Page from "../Commerical_WithOutParkingFee_ParkingLog_Page/Commerical_WithOutParkingFee_ParkingLog_Page";

const badgeBgColorHandler = (data) => {
  if (!data) return "hidden";
  data = data.toLowerCase();
  if (data === "fastag") return "bg-orange-500";
  if (data === "upi") return "bg-indigo-500";
  if (data === "cash") return "bg-emerald-500";
  if (data === "card") return "bg-cyan-500";
  return "bg-red-500";
};

const Commerical_ParkingFee_ParkingLog_Page = ({ data, imageUrls }) => {
  // data = {
  //   _id: "65c36b61a9a9cbada6e69ed4",
  //   parkingLogID: "JH05Y3643-2024-01-18",
  //   vehicleNumber: "JH05Y3643",
  //   entryTimeStamp: "2024-01-18T20:13:00.885Z",
  //   companyID: "65b79cf749a3c7eba98ff06a",
  //   location: "P and M Mall Jamshedpur",
  //   equipmentIDs: ["EquimentID-1", "EquimentID-2"],
  //   createdAt: "2024-02-07T11:37:05.069Z",
  //   updatedAt: "2024-02-08T06:51:24.692Z",
  //   __v: 0,
  //   vehicleType: "CAR",
  //   duration: 3.05,
  //   exitTimeStamp: "2024-01-18T23:16:00.885Z",
  //   payment: {
  //     totalAmount: {
  //       amount: 150,
  //       currencyCode: "INR",
  //       currencySymbol: "₹",
  //       _id: "65c479ece61736eb66c35583",
  //     },
  //     status: "paid",
  //     mode: "fastag",
  //   },
  //   parkingSpot: { spot: "A-308", level: "B1" },
  // };

  imageUrls = [
    {
      url: "https://i.ytimg.com/vi/JlSe1pq_E60/maxresdefault.jpg",
      source: "Front Gate",
    },
    {
      url: "https://i.ytimg.com/vi/JlSe1pq_E60/maxresdefault.jpg",
      source: "Mid Gate",
    },
    {
      url: "https://i.ytimg.com/vi/JlSe1pq_E60/maxresdefault.jpg",
      source: "End Gate",
    },
    
  ];

  




  return (
    <div className="-mt-2 grid grid-cols-2 gap-2 p-2 w-full h-screen overflow-y-auto ">
      <Card>
        <div className=" w-full p-14 ">
          <ParkingLogCarousel imageUrls={imageUrls} />
        </div>
      </Card>

      {/* Parking Log Details */}
      <Card className="flex flex-col justify-between">
        <div className="p-2">
          {/* Title */}
          <div className="w-full flex flex-col">
            <div className="text-3xl  font-bold">{data?.vehicleNumber}</div>
            <div>
              <Badge variant="outline">{data?.vehicleType}</Badge>
            </div>
          </div>

          {/* Parking Log Details Starts Here */}

          <div className="w-full  flex items-end justify-start space-y-2  mt-10">
            <div className="w-[110px] text-lg ">Duration: </div>
            <div className="w-full text-xl">{data?.duration} hr</div>
          </div>

          <div className="flex  items-end">
            <div className="w-full  flex items-end justify-start space-y-2  mt-10">
              <div className="w-[110px] ">Entered at:</div>

              <div className="w-full text-xl">
                {" "}
                {DateAndTimeInHuman(data?.entryTimeStamp)}
              </div>
            </div>

            <div className=" mr-5 text-3xl font-extralight">|</div>

            <div className="w-full  flex items-end justify-start space-y-2  mt-10">
              <div className="w-[110px] text-lg ">Exited at: </div>
              <div className="w-full text-xl">
                {data?.exitTimeStamp
                  ? DateAndTimeInHuman(data?.exitTimeStamp)
                  : "--"}
              </div>
            </div>
          </div>

          <div className="w-full  flex items-end justify-start space-y-2  mt-10">
            <div className="w-[110px] text-lg ">Parked at: </div>
            <div className="w-full text-xl ">
              {data?.parkingSpot?.spot}{" "}
              {data?.parkingSpot?.level
                ? `(${data?.parkingSpot?.level} - Level)`
                : ""}
            </div>
          </div>
          <div className="w-full  flex items-end justify-start space-y-2  mt-10">
            <div className="w-[165px] text-lg ">Payment Mode: </div>
            <div className="text-xl ">
              <Badge
                className={cn(
                  "scale-125",
                  badgeBgColorHandler(data?.payment?.mode)
                )}
              >
                {data?.payment?.mode?.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className=" col-span-2 mt-12 h-11 rounded-md flex items-center justify-center w-full bg-indigo-500  text-tremor-brand-inverted text-2xl shadow-md">
            Total: {data?.payment?.totalAmount?.currencySymbol}{" "}
            {data?.payment?.totalAmount?.amount}
          </div>

          <div
            className={cn(
              " mt-12 h-11 border  rounded-md flex items-center justify-center w-full  text-2xl shadow-md",
              `${
                data?.payment?.status &&
                data?.payment?.status.toLowerCase() === "pending"
                  ? "border-orange-500 text-orange-500"
                  : data?.payment?.status &&
                    data?.payment?.status.toLowerCase() === "paid"
                  ? "border-emerald-700 text-emerald-700"
                  : data?.payment?.status &&
                    data?.payment?.status.toLowerCase() === "failed"
                  ? "border-red-700 text-red-700"
                  : "border-red-900 text-red-900"
              }`
            )}
          >
            {data?.payment?.status?.toUpperCase()}
          </div>
        </div>
      </Card>

      {/* History of Entries */}
      <Card className="col-span-2  ">
        <Suspense fallback={<LogTableLoading />}>
          <div className=" h-screen p-2 w-full ">
            <h1 className="text-3xl text-tremor-content dark:text-dark-tremor-content">
              History
            </h1>

            <ParkingLogTable
              columns={columns([
                "vehicle number",
                "parked_at",
                "entry_at",
                "exit_at",
                "duration",
                "amount",
                "payment status",
              ])}
              data={apiDataFormatterWithAmountOptionForTable(
                history,
                "society"
              )}
            />
          </div>
        </Suspense>

        {/* <div className='w-full  flex items-end justify-start space-y-2  mt-10'>
         <div className='w-full text-xl'>{JSON.stringify(data)}
    </div>
         </div> */}
      </Card>
    </div>
  );
};

export default Commerical_ParkingFee_ParkingLog_Page;
