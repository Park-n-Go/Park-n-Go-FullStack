"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "../ui/badge";

import { CircleFadingPlus, X } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { cn } from "@/lib/utils";

const inputTypeZodSchema = (type) => {
  switch (type) {
    case "NUMBER":
      return z.string().regex(/^\d+$/, {
        message: "Input must contain only numbers, no alphabets or symbols.",
      });
    case "TEXT":
      return z.string().min(2, {
        message: "Input must be at least 2 characters.",
      });
    case "EMAIL":
      return z
        .string()
        .email({ message: "Input must be a valid email address." });
    default:
      return z.string().min(2, {
        message: "Input must be at least 2 characters.",
      });
  }
};

const ArrayInputAndDisplay = ({ title, list, sendDataBack, type, className}) => {
  const formSchema = z.object({
    newData: inputTypeZodSchema(type),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newData: "",
    },
  });

  const [listData, setListData] = useState(list);

  function onSubmit(values) {
    const isDuplicateData = listData.indexOf(values?.newData);
    let data;
    let filteredData;
    if (isDuplicateData != -1) {
      filteredData = listData.filter((value) => value != values?.newData);
      data = [...filteredData];
    } else {
      data = [...listData, values?.newData];
    }

    sendDataBack(data);
    setListData(data);
  }

  useEffect(() => {}, [listData]);

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="list" className="text-right">
        {title}
      </Label>
      <ScrollArea className={cn("w-[120%] col-span-2 py-2 ",className)}>
        <div className="flex space-x-2  p-2">
          {listData?.map((element, index) => (
            <Badge variant="outline" className="" key={index}>
              {element}{" "}
              <X
                className=" transition ease-in-out delay-150  duration-300 scale-75 cursor-pointer text-indigo-500 hover:bg-indigo-600 hover:text-background rounded-full mx-1 -mr-1"
                onClick={() => {
                  onSubmit({ newData: element });
                }}
              />
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
     
    </div>
  );
};

export default ArrayInputAndDisplay;
