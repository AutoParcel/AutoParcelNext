"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaCamera, FaCalendarAlt, FaChevronLeft } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { FaEdit } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getParcels } from "@/utils";
interface Iprediction {
  label: string;
  page: number;
  value: string;
  confidence: number;
}

export default function ParcelPage({ params }: { params: { id: string } }) {
  const onSubmit = async (data: any) => {
    console.log("submitted", data);
    setEditStatus((prev) => !prev);
  };
  const formSchema = z.object({
    OwnerName: z.string().min(2, {
      message: "Name must be at least 3 characters.",
    }),
    Date: z.date({
      required_error: "Date of arrival of package is required.",
    }),
    ParcelCompany: z.string(),
    ParcelNumber: z.string(),
    PhoneNumber: z.string(),
    RoomNumber: z.number(),
    OwnerID: z.string(),
    Shelf: z.string(),
    Comment: z.string(),
  });
  const fillform = async (data: any) => {
    form.setValue("OwnerName", data.OwnerName);
    form.setValue("ParcelCompany", data.ParcelCompany);
    form.setValue("ParcelNumber", data.ParcelNumber);
    form.setValue("PhoneNumber", data.PhoneNumber);
    form.setValue("RoomNumber", data.RoomNumber);
    form.setValue("OwnerID", data.OwnerID);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      OwnerName: "", //
      ParcelCompany: "",
      ParcelNumber: "", //
      PhoneNumber: "",
      RoomNumber: 0,
      OwnerID: "", //
      Shelf: "A", //
      Comment: "", //
      Date: new Date(),
    },
  });
  const [parcel, setParcel] = React.useState(null);
  React.useEffect(() => {
    (async () => {
      const Parcel = await getParcels("findMany", {
        where: { ParcelID: params.id },
      });
      setParcel(Parcel[0]);
    })();
  }, []);
  const [editStatus, setEditStatus] = useState(false);
  return (
    <>
      <h1 className="text-6xl font-bold mt-10 flex gap-5">
        Parcel
        <div className="text-primary_red">{params.id}</div>
      </h1>
      <div className="flex flex-row justify-between gap-x-10 mt-5">
        <div className="w-full p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="Date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <FaCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-10">
                  <div className="p-3 bg-primary_white text-sm font-bold rounded-xl opacity-75">
                    Parcel Unique ID- {params.id}
                  </div>
                  {editStatus ? (
                    <Button className="bg-primary_red" type="submit">
                      Submit
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setEditStatus((prev) => !prev)}
                      className="flex gap-3"
                      type="button"
                    >
                      <p>Edit Parcel </p>
                      <FaEdit />
                    </Button>
                  )}
                </div>
              </div>
              <FormField
                control={form.control}
                name="OwnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Owner</FormLabel>
                    <FormControl>
                      <Input placeholder="Parcel owner name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ParcelCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Parcel company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ParcelNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="AWB number, order number, etc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="PhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="RoomNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <FormControl>
                      <Input placeholder="000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="OwnerID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner ID</FormLabel>
                    <FormControl>
                      <Input placeholder="U20XX0XXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Shelf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shelf</FormLabel>
                    <FormControl>
                      <Select defaultValue={field.value}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Shelf A</SelectItem>
                          <SelectItem value="B">Shelf B</SelectItem>
                          <SelectItem value="C">Shelf C</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
