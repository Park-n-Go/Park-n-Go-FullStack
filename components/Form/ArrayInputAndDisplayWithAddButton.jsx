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

const ArrayInputAndDisplayWithAddButton = ({
  title,
  list,
  sendDataBack,
  type,
  displayClassName,
  className,
  lable,
}) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(values) {
    setIsSubmitting(true);
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
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (!isSubmitting) {
      setListData(list);
    }
  }, [list, listData]);

  return (
    <div className={cn("grid grid-cols-4 items-center gap-4", className)}>
      <Label htmlFor="username" className="text-right">
        {title}
      </Label>
      <ScrollArea
        className={cn(
          "w-[120%] col-span-2 py-2 whitespace-nowrap ",
          displayClassName
        )}
      >
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
      <div className="cursor-pointer mx-10 w-1/2 flex justify-center items-center transition ease-in-out delay-150  duration-300 text-indigo-400 hover:text-indigo-800">
        <Dialog>
          <DialogTrigger asChild>
            <CircleFadingPlus className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add {title || lable}</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="newData"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Input
                              type={type}
                              name="newData"
                              className="col-span-4 focus-visible:ring-0  focus-visible:border-2 focus-visible:border-indigo-500"
                              {...field}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="transition ease-in-out delay-150 cursor-pointer  duration-300 bg-indigo-400 hover:bg-indigo-800"
                    >
                      Add
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ArrayInputAndDisplayWithAddButton;
