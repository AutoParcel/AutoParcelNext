"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FaCamera, FaCalendarAlt, FaChevronLeft } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { format, set } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import React, { useState, useRef, useEffect, use } from "react";
import Webcam from "react-webcam";
import Link from "next/link";
import usePrediction from "@/hooks/usePrediction";

const formSchema = z.object({
  ParcelOwner: z.string().min(2, {
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
const FACING_MODE_ENVIRONMENT = "environment";

// const FACING_MODE_USER = "user";
const Page = () => {
  const fillform = async (data: any) => {
    form.setValue("ParcelOwner", data.ParcelOwner);
    form.setValue("ParcelCompany", data.ParcelCompany);
    form.setValue("ParcelNumber", data.ParcelNumber);
    form.setValue("PhoneNumber", data.PhoneNumber);
    form.setValue("RoomNumber", data.RoomNumber);
    form.setValue("OwnerID", data.OwnerID);
  };

  const Callapi = async (img: any) => {
    const epic = await usePrediction(img);
    const emptydata = { ParcelOwner: ["", 0.0] };
    console.log(epic);
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ParcelOwner: "",
      ParcelCompany: "",
      ParcelNumber: "",
      PhoneNumber: "",
      RoomNumber: 0,
      OwnerID: "",
      Comment: "",
      Date: new Date(),
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const webcamRef: any = React.useRef(null);
  const [image, setImage] = useState("");
  const [camOpen, setCamOpen] = useState(false);
  const opencamera = () => {
    console.log("camera opened");
    setCamOpen(true);
  };
  // const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

  // const switchMode = React.useCallback(() => {
  //   setFacingMode((prevState) =>
  //     prevState === FACING_MODE_USER
  //       ? FACING_MODE_ENVIRONMENT
  //       : FACING_MODE_USER
  //   );
  // }, []);

  // console.log(facingMode + videoConstraints);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setLoading(true);
    Callapi(imageSrc);
    setImage(imageSrc);
    setCamOpen(false);
  }, [webcamRef]);

  let videoConstraints: MediaTrackConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT,
    width: 1000,
    height: 640,
  };

  return (
    <>
      <Link href="/" className="flex items-center -m-5">
        <FaChevronLeft />
        Go back
      </Link>
      <div className="flex flex-row justify-between gap-x-10 mt-14 ">
        <div className="w-full p-5 border-primary_black border-8 rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormField
                control={form.control}
                name="ParcelOwner"
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
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Shelf A</SelectItem>
                          <SelectItem value="dark">Shelf B</SelectItem>
                          <SelectItem value="system">Shelf C</SelectItem>
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

              <Button className="bg-primary_red" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-full">
          <div className=" flex items-center justify-center flex-col mt-24">
            {camOpen ? (
              <>
                <Webcam
                  className="webcam"
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                  screenshotQuality={1}
                />
                <Button className="bg-primary_black" onClick={capture}>
                  Take Picture
                </Button>
              </>
            ) : loading ? (
              <Oval
                height={60}
                width={60}
                color="var(--primary_red)"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="var(--primary_red)"
                strokeWidth={6}
                strokeWidthSecondary={3}
              />
            ) : (
              <>
                <FaCamera className="w-60 h-60 fill-primary_black" />
                <Button
                  className="m-4 bg-primary_black"
                  type="button"
                  onClick={opencamera}
                >
                  {image ? "Retake" : "Scan Label"}
                </Button>
              </>
            )}
            <Button
              onClick={() =>
                fillform({
                  ParcelOwner: "Abhinav",
                  ParcelCompany: "asd",
                  ParcelNumber: "asd",
                  PhoneNumber: "asd",
                  RoomNumber: 10,
                  OwnerID: "asd",
                  Comment: "asd",
                })
              }
            >
              Fill
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
