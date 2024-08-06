"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Oval } from "react-loader-spinner";
import { FaCamera } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { getDate } from "@/utils";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import Webcam from "react-webcam";
import usePrediction from "@/hooks/usePrediction";
import sendMessage from "@/hooks/sendTwilio";
import Fuse from "fuse.js";
import {
  getReceivers,
  generatePID,
  addParcel,
  getParcelOTP,
  getParcels,
} from "@/utils";
import OwnerSearch from "@/components/ownersearch";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  OwnerName: z.string().min(2, {
    message: "Name must be at least 3 characters.",
  }),
  Date: z.date(),
  ParcelCompany: z.string().min(2, {
    message: "Parcel Company must be at least 3 characters.",
  }),
  ParcelNumber: z.string(),
  PhoneNumber: z.string(),
  RoomNumber: z.string(),
  OwnerID: z.string(),
  Shelf: z.enum(["A", "B", "C"]),
  Comment: z.string(),
  Email: z.string(),
});
const FACING_MODE_ENVIRONMENT = "environment";

// const FACING_MODE_USER = "user";
const Page = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [camOpen, setCamOpen] = useState(false);
  const [Batch, setBatch] = useState("");
  const [receivers, setReceivers] = useState([]);
  const webcamRef: any = React.useRef(null);
  const router = useRouter();
  const { toast } = useToast();
  React.useEffect(() => {
    async function fetchData() {
      const receivers = await getReceivers({});
      console.log(receivers);
      setReceivers(() => receivers);
    }
    fetchData();
  }, []);

  const fillform = (data: any) => {
    console.log("fillform data:", data)
    data.OwnerName ? form.setValue("OwnerName", data.OwnerName) : "";
    data.ParcelCompany
      ? form.setValue("ParcelCompany", data.ParcelCompany.toLowerCase())
      : "";
    data.PhoneNumber ? form.setValue("PhoneNumber", data.PhoneNumber) : "";
    data.RoomNumber ? form.setValue("RoomNumber", data.RoomNumber) : "";
    data.OwnerID ? form.setValue("OwnerID", data.OwnerID) : "";
    data.ParcelNumber ? form.setValue("ParcelNumber", data.ParcelNumber) : "";
    data.Shelf ? form.setValue("Shelf", data.Shelf) : "";
    data.Comment ? form.setValue("Comment", data.Comment) : "";
    data.Email ? form.setValue("Email", data.Email) : "";
  };

  interface Iprediction {
    label: string;
    page: number;
    value: string;
    confidence: number;
  }

  // const Callapi = async (img: any) => {
  //   const receivers = await getReceivers({});
  //   // const vendors = await getVendors({});

  //   //solve this
  //   const predictionstr = await usePrediction(img);
  //   const emptydata: { [key: string]: [string | number, number] } = {
  //     OwnerName: ["", 0.0],
  //     ParcelCompany: ["", 0.0],
  //     ParcelNumber: ["", 0.0],
  //     RoomNumber: [0, 0.0],
  //     OwnerID: ["", 0.0],
  //   };
  //   const data: any = {
  //     OwnerName: "",
  //     ParcelCompany: "",
  //     ParcelNumber: "",
  //     RoomNumber: 0,
  //     OwnerID: "",
  //   };
  //   console.log(predictionstr);
  //   if (predictionstr != undefined) {
  //     const predictions = JSON.parse(predictionstr);
  //     console.log("THIS WORKS ", predictions);
  //     predictions.forEach((prediction: Iprediction) => {
  //       if (
  //         prediction.confidence > 0.0 &&
  //         emptydata[prediction.label][1] < prediction.confidence
  //       ) {
  //         emptydata[prediction.label] = [
  //           prediction.value,
  //           prediction.confidence,
  //         ];
  //         data[prediction.label] = prediction.value;
  //       }
  //     });

  //     const receiver_result = performDBMatch(
  //       receivers,
  //       data.OwnerName,
  //       "OwnerName"
  //     );

  //     console.log(receiver_result);
  //     if (receiver_result.length > 0) {
  //       const ref_index = receiver_result[0].refIndex;
  //       receiver = receivers[ref_index];
  //       data.OwnerID = receiver.OwnerID;
  //       data.OwnerName = receiver.OwnerName;
  //       data.PhoneNumber = receiver.PhoneNumber;
  //       // what if the room number parameter is missing?
  //       data.RoomNumber = receiver.RoomNumber;
  //     }
  //     if (vendor_result.length > 0) {
  //       const ref_index = vendor_result[0].refIndex;
  //       vendor = vendors[ref_index];
  //       data.ParcelCompany = vendor?.ParcelCompany;
  //     }
  //     // else {
  //       //   // create a new vendor if there is some textual data from the form
  //       //   if (data.ParcelCompany.length > 0) {
  //         //     vendor = await addVendor({ ParcelCompany: data.ParcelCompany });
  //         //     // data.ParcelCompany = vendor.ParcelCompany;
  //         //   } else {
  //           //     vendor = { VendorID: null };
  //           //   }
  //           // }

  //           fillform({
  //             // @ts-ignore
  //             OwnerName: "", // @ts-ignore
  //             ParcelCompany: "", // @ts-ignore
  //             ParcelNumber: "",
  //             PhoneNumber: "", // @ts-ignore
  //             RoomNumber: "", // @ts-ignore
  //             OwnerID: "",
  //             Comment: "",
  //       ...data,
  //     });
  //   } else {
  //     console.log("no predictions");
  //   }
  //   setLoading(false);
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      OwnerName: "", //
      ParcelCompany: "",
      ParcelNumber: "", //
      PhoneNumber: "",
      Email: "",
      RoomNumber: "",
      OwnerID: "", //
      Shelf: "A", //
      Comment: "", //
      Date: new Date(),
    },
  });
  async function onSubmit(values: any) {
    try {
      setLoading(true);
      // if there's a receiver, then update the parcel without the spare (room number, ph number)
      // if there's no receiver, then update the parcel with the spare.
      let spare = "";
      // const uid = //generate uid
      delete values.Date;
      // @ts-ignore

      // here we again conduct fuzzy search and update the receiver
      // if there's a parcel vendor then create the parcel vendor.

      ///////////////////////////////////////////////////////
      // const receivers = await getReceivers({});
      // const vendors = await getVendors({});
      // let vendor = vendors.find((elem)=> elem.ParcelCompany.toLowerCase() == values.ParcelCompany.toLowerCase())
      // if(!vendor){
      //   vendor = vendors.find((elem)=> "others" == values.ParcelCompany.toLowerCase())
      // }
      // perform db match only if the name has changed
      // @ts-ignore
      // if the values are not the same, then we need to update the receiver. If not, we just have to make sure that the original receiver's id is taken
      // if(receiver != null && (receiver.OwnerName.toLowerCase() != values.OwnerName.toLowerCase())){
      // if (
      //   (receiver != null &&
      //     receiver.OwnerName.toLowerCase() !=
      //       values.OwnerName.toLowerCase().trim()) ||
      //   receiver == null
      // ) {
      //   console.log("in here");
      //   const receiver_result = performDBMatch(
      //     receivers,
      //     values.OwnerName.trim(),
      //     "OwnerName"
      //   );
      //   console.log("here are the matches: ", receiver_result);
      //   if (receiver_result.length > 0) {
      //     const ref_index = receiver_result[0].refIndex;
      //     receiver = receivers[ref_index];
      //     values.OwnerID = receiver.OwnerID;
      //     values.OwnerName = receiver.OwnerName;
      //     values.PhoneNumber = receiver.PhoneNumber;
      //     values.RoomNumber = receiver.RoomNumber;
      //   }
      //   // if there's no match, then we don't update all this shit but update spare
      //   else {
      //     //trim?
      //     spare = `(${values.PhoneNumber}),(${values.RoomNumber}),(${values.OwnerID})`;
      //     values.OwnerID = null;
      //   }
      //   // here check, if the above is false, then there are two cases: It's null, so update the spare. Or the two are equal, so make sure Id is not changed
      //   // @ts-ignore
      // }
      // // @ts-ignore
      // else if (
      //   receiver.OwnerName.toLowerCase() == values.OwnerName.toLowerCase().trim()
      // ) {
      //   // @ts-ignore
      //   values.OwnerID = receiver.OwnerID;
      // }

      // values.OwnerID = receiver.OwnerID;
      // check if vendor name has changed. If vendor name has changed, then perform search. If nothing exists, then create.
      // @ts-ignore
      // SAME LOGIC AS VENDOR, BUT JUST HAVE TO MAKE SURE IF THE INPUT FIELD IS NULL OR NOT
      // console.log("outside if: ",values.ParcelCompany)
      // if (values.ParcelCompany == null || values.ParcelCompany.trim() == "") {
      //   vendor = null;
      //   values.ParcelCompany = "";
      // } else {

      //   if (
      //     (vendor != null &&
      //       vendor.ParcelCompany.toLowerCase() !=
      //         values.ParcelCompany.toLowerCase().trim()) ||
      //     vendor == null
      //   ) {
      //     //@ts-ignore
      //     const vendor_result = performDBMatch(
      //       vendors,
      //       values.ParcelCompany.trim(),
      //       "ParcelCompany",
      //       0.0
      //     );
      //     console.log("here are the matches: ", vendor_result);
      //     if (vendor_result.length > 0) {
      //       const ref_index = vendor_result[0].refIndex;
      //       vendor = vendors[ref_index];
      //       console.log("vendor_var", vendor);
      //       values.ParcelCompany = vendor.ParcelCompany;
      //       values = { ...values, vendor_id: vendor.vendor_id };
      //     } else {
      //       // create a new vendor if there is some textual data from the form
      //       // so we know that the parcel company length is not zero, so we can create a new vendor
      //       vendor = await addVendor({
      //         ParcelCompany: values.ParcelCompany.trim(),
      //       });
      //       values.ParcelCompany = vendor.ParcelCompany;
      //       values = { ...values, vendor_id: vendor.vendor_id };
      //     }
      //   } else {
      //     // here put the code
      //     //@ts-ignore
      //     values = { ...values, vendor_id: vendor.vendor_id };
      //   }
      // }
      // @ts-ignore
      delete values.PhoneNumber;
      delete values.RoomNumber;
      delete values.Email;

      // // @ts-ignore
      values = {
        ...values,
        spare: spare,
        ParcelID: await generatePID(),

        Reminders: [new Date()],
      };
      let new_parcel = await addParcel(values);
      // add toast maybe here TODO
      console.log("OKAY THIS IS WORKIGN")
      console.log("new parcel: ", new_parcel);
      router.push("/dashboard/parcels/" + new_parcel.ParcelID);
    } catch (e) {
      if (typeof e === "string") {
        toast({
          title: "Something went wrong!",
          description: e,
          variant: "destructive",
          duration: 3000,
        });
      } else if (e instanceof Error) {
        toast({
          title: "Something went wrong!",
          description: e.message,
          variant: "destructive",
          duration: 3000,
        });
      }
    }
    setLoading(false);
  }

  // const opencamera = () => {
  //   console.log("camera opened");
  //   setCamOpen(true);
  // };

  // const capture = React.useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   setLoading(true);
  //   // Callapi(imageSrc);
  //   setImage(imageSrc);
  //   setCamOpen(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [webcamRef]);

  // let videoConstraints: MediaTrackConstraints = {
  //   facingMode: FACING_MODE_ENVIRONMENT,
  //   width: 1000,
  //   height: 640,
  // };

  const handleNameChange = (data: any) => {
    fillform(data);
    setBatch(data.Batch);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-6xl font-bold mt-2">Add a Parcel</h1>
        <div className="flex justify-end place-self-end">
          <div className="font-bold bg-primary_white rounded-md p-3 ">
            {getDate()}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-x-10 mt-5">
        <div className="w-full p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="OwnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcel Owner</FormLabel>
                    <FormControl>
                      <div className="flex flex-row justify-start gap-3 items-center">
                        <OwnerSearch
                          options={receivers}
                          handleNameChange={handleNameChange}
                        />
                        <div
                          className={`p-2 bg-primary_red rounded-lg font-semibold text-sm text-white ${
                            Batch ? "" : "hidden"
                          }`}
                        >
                          {Batch}
                        </div>
                      </div>
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
                      <Input
                        placeholder="XXXXXXXXXX"
                        {...field}
                        type="number"
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@plaksha.edu.in"
                        {...field}
                        type="string"
                        disabled
                      />
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
                    <FormLabel>
                      {Batch.startsWith("UG") || Batch.startsWith("TLP") ? "Room Number" : "Cabin/Desk Number"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="000"
                        type="number"
                        {...field}
                        disabled
                      />
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
                      <Input placeholder="U20XX0XXX" {...field} disabled />
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
                      <Select defaultValue={field.value} name="Shelf" onValueChange={(event)=>{
                        form.setValue("Shelf",event) // TODO 
                      }}>
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
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-primary_black"
                type="submit"
                disabled={loading}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className="bg-primary_black w-2 m-6 rounded-lg"></div>
        <div className="w-full">
          <div className=" flex items-center justify-center flex-col mt-24">
            {camOpen ? (
              <>
                {/*<Webcam
                  className="webcam"
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  videoConstraints={videoConstraints}
                  screenshotQuality={1}
                />
                 <Button className="bg-primary_black" onClick={capture}>
                  Take Picture
                </Button> */}
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
                  disabled
                  // onClick={opencamera}
                >
                  {image ? "Retake" : "Scan Label"}
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
