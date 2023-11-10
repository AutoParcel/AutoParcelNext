"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FaCamera } from "react-icons/fa";
const formSchema = z.object({
  ParcelOwner: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  ParcelCompany: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  ParcelID: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  PhoneNumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  RoomNumber: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  OwnerID: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  Comment: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
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

const FACING_MODE_ENVIRONMENT = "environment";

const Callapi = async (img: any) => {
  const epic = await usePrediction(img);
};

// const FACING_MODE_USER = "user";
const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ParcelOwner: "",
      ParcelCompany: "",
      ParcelID: "",
      PhoneNumber: "",
      RoomNumber: "",
      OwnerID: "",
      Comment: "",
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
      <Button>
        <Link href="/">Go back</Link>
      </Button>
      <div className="flex flex-row justify-between gap-x-10">
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="ParcelOwner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Owner</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ParcelID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel ID</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <div className="w-full">
          <div className=" flex items-center justify-center flex-col">
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
                <Button onClick={capture}>Take Picture</Button>
              </>
            ) : (
              <>
                <FaCamera className="w-60 h-60" />
                <Button className={"m-4"} type="button" onClick={opencamera}>
                  {image == "" ? "Scan label" : "Retake"}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
