"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
const formSchema = z.object({
  username: z.string().min(2, {
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
import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import Link from "next/link";

// const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
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
    setImage(imageSrc);
    setCamOpen(false);
    console.log(imageSrc);
  }, [webcamRef]);

  let videoConstraints: MediaTrackConstraints = {
    facingMode: FACING_MODE_ENVIRONMENT,
    width: 1000,
    height: 640,
  };

  return (
    <div className="flex flex-row justify-around gap-x-20">
      <div className="w-[100%]">
        <Button>
          <Link href="/">Go back</Link>
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
      <div className="webcam-container">
        <div className="webcam-img">
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
              <Button className={"m-4"} type="button" onClick={opencamera}>
                Scan label
              </Button>
              {/* <img
                src={image}
                alt="Scan"
                style={{ width: "1000px", height: "auto" }}
              /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
