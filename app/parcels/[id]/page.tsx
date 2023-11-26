"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
    form.setValue("ParcelCompany", data.vendor.ParcelCompany);
    form.setValue("ParcelNumber", data.ParcelNumber);
    form.setValue("PhoneNumber", data.ParcelReceiver.PhoneNumber);
    form.setValue("RoomNumber", data.ParcelReceiver.RoomNumber);
    form.setValue("OwnerID", data.OwnerID);
    form.setValue("Shelf", data.Shelf);
    form.setValue("Comment", data.Comment);
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
      Shelf: "", //
      Comment: "", //
      Date: new Date(),
    },
  });
  const [parcel, setParcel] = React.useState(null);
  const RequestDetails = async () => {
    const ParcelDetails = await getParcels("findMany", {
      where: { ParcelID: params.id },
      include: { vendor: true, ParcelReceiver: true },
    });
    console.log(ParcelDetails[0]);
    fillform(ParcelDetails[0]);
    setParcel(() => ParcelDetails[0]);
  };
  useEffect(() => {
    RequestDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <div>Received At:</div>
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
                          <SelectItem value="Shelf A">Shelf A</SelectItem>
                          <SelectItem value="Shelf B">Shelf B</SelectItem>
                          <SelectItem value="Shelf C">Shelf C</SelectItem>
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
