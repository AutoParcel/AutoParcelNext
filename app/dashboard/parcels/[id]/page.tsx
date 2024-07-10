"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Oval } from "react-loader-spinner";
import sendMessage from "@/hooks/sendTwilio";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getParcels } from "@/utils";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { Hand } from "lucide-react";
import { Parcel } from "@prisma/client";

export default function ParcelPage({ params }: { params: { id: string } }) {
  const [userotp, setUserotp] = useState("");
  const [loading, setLoading] = useState(true);
  const [editStatus, setEditStatus] = useState(false);
  const onSubmit = async (data: any) => {
    console.log("submitted", data);
    setEditStatus((prev) => !prev);
  };
  const sendReminder = (parcelobj:Parcel) =>{
    console.log("Sending Reminder with OTP: ", userotp)
    console.log(parcelobj)
    // sendMessage(parcelobj, userotp, "c");
  }
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
    form.setValue("PhoneNumber", data.ParcelReceiver?.PhoneNumber);
    form.setValue("RoomNumber", parseInt(data.ParcelReceiver?.RoomNumber));
    form.setValue("OwnerID", data.OwnerID == null ? "" : data.OwnerID);
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
      Shelf: "A", //
      Comment: "",
    },
  });
  const [parcel, setParcel] = React.useState({
    OwnerName: "",
    ParcelCompany: "",
    ParcelNumber: "",
    PhoneNumber: "",
    RoomNumber: 0,
    OwnerID: "",
    Shelf: "",
    Comment: "",
    Status: "",
    ReceivedAt: "",
    CollectedAt: "",
    Reminders: [],
  });

  function getOrdinalNum(n: number) {
    return (
      n +
      (n > 0
        ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
        : "")
    );
  }
  const getDate = (olddate: string) => {
    let date = new Date(olddate);
    let currentDayOrdinal = getOrdinalNum(date.getDate());
    let currentMonth = date.toLocaleString("default", { month: "long" });

    let currentYear = date.getFullYear();
    // let currentTime = date.getUTCHours() + ":" + date.getUTCMinutes();
    let currentTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let currentDate = `${currentDayOrdinal} ${currentMonth} ${currentYear} at ${currentTime}`;
    return currentDate;
  };
  const RequestDetails = async () => {
    const ParcelDetails = await getParcels("findMany", {
      where: { ParcelID: params.id },
      include: { ParcelReceiver: true },
    });
    console.log(ParcelDetails[0]);
    fillform(ParcelDetails[0]);
    setParcel(() => ParcelDetails[0]);
    setLoading(false);
  };

  useEffect(() => {
    RequestDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  const { toast } = useToast();
  const CardClicked = async (event: any, name = "") => {
    event.stopPropagation();
    if (name == "Collected") {
      toast({
        title: "Parcel Already Collected!",
        description: "",
        variant: "destructive",
        duration: 3000,
      });
    } else if (name == "freepass") {
      let otp_user = await getParcels("update", {
        where: {
          ParcelID: params.id,
        },
        data: {
          Status: "C",
          CollectedAt: new Date(),
        },
      });
      if (otp_user.Status == "C") {
        toast({
          title: "Parcel Handover",
          description: "Parcel Handover Successful!",
          duration: 3000,
        });
        sendMessage(otp_user, "0", "h");
        router.push("/dashboard/parcels/" + params.id);
        router.refresh();
      } else {
        toast({
          title: "Parcel Handover",
          description: "Parcel Handover Failed! Try Again.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else if (name == "handover") {
      console.log("handover opened");

      let otp_user = await getParcels("findUnique", {
        where: {
          ParcelID: params.id,
          otp: userotp,
        },
        //include: { vendor: true, ParcelReceiver: true }
      });

      console.log("otp_user", parcel.OwnerID);
      if (otp_user != null) {
        otp_user = await getParcels("update", {
          where: {
            ParcelID: params.id,
          },
          data: {
            Status: "C",
            CollectedAt: new Date(),
          },
          include: { ParcelReceiver: true },
        });
        if (otp_user.Status == "C") {
          toast({
            title: "Parcel Handover",
            description: "Parcel Handover Successful!",
            duration: 3000,
          });
          sendMessage(otp_user, "0", "h");
          console.log("this is running!!");
          router.push("/dashboard/parcels/" + params.id);
          window.location.reload();
        } else {
          toast({
            title: "Parcel Handover",
            description: "Parcel Handover Failed! Try Again.",
            variant: "destructive",
            duration: 3000,
          });
        }
      } else {
        toast({
          title: "Parcel Handover",
          description: "Incorrect OTP! Try Again!",
          variant: "destructive",
          duration: 3000,
        });
      }
    } else if (name == "epic") {
      console.log("epicc");
    } else {
      console.log("clicked");
    }
    console.log("Reached here!");
  };
  return (
    <>
      {loading ? (
        <div className="w-full justify-center flex mt-48">
          <Oval
            height={80}
            width={80}
            color="var(--primary_red)"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="var(--primary_red)"
            strokeWidth={6}
            strokeWidthSecondary={3}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-between items-center mt-10">
            <h1 className="text-6xl font-bold flex gap-5">
              Parcel
              <div className="text-primary_red">{params.id}</div>
            </h1>
            <div className="w-full flex flex-row-reverse">
              {parcel.Status == "C" ? (
                <div className="bg-primary_yellow text-white p-4 rounded-md font-semibold">
                  Collected
                </div>
              ) : (
                <div className="flex flex-row ">
                <button className="gap-2 flex p-4 bg-primary_black text-white border-r-primary_yellow border-r-8 rounded-l-md hover:bg-primary_red font-semibold" onClick={(e) => sendReminder(parcel,"","c")}>
                  <div className="inline">Send Reminder</div>
                  <BellAlertIcon className="w-6 h-6 stroke-2 inline"/>
                </button>
                <Dialog>
                  <DialogTrigger
                    className="gap-2 flex p-4 bg-primary_black text-white rounded-r-md hover:bg-primary_yellow font-semibold"
                    onClick={(e) => CardClicked(e, "epic")}
                  >
                    <div className="inline">Handover</div>
                    <Hand className="w-6 h-6 stroke-2 inline"/>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Please enter OTP to handover parcel
                      </DialogTitle>
                      <DialogDescription>
                        {parcel.OwnerID == null ? (
                          <div className="flex flex-col gap-5 mt-5">
                            <div className="text-primary_red">
                              No Phone Number Found!
                            </div>
                            <Button onClick={(e) => CardClicked(e, "freepass")}>
                              Handover Parcel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-5 mt-5">
                            <div className="flex gap-4">
                              <Input
                                type="number"
                                placeholder="OTP"
                                value={userotp}
                                onChange={(e) => setUserotp(e.target.value)}
                              />
                              <Button
                                className="w-full"
                                onClick={(e) =>
                                  sendMessage(parcel, userotp, "resend")
                                }
                              >
                                Resend OTP
                              </Button>
                            </div>
                            <Button onClick={(e) => CardClicked(e, "handover")}>
                              Handover Parcel
                            </Button>
                          </div>
                        )}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between gap-x-10 mt-5">
            <div className="w-full p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 flex-col">
                      <div>
                        Received At:
                        <div className="font-bold inline">
                          {" "}
                          {getDate(parcel.ReceivedAt)}
                        </div>
                      </div>
                      {parcel.Reminders && <div>
                        Reminders sent: 
                        <div className="font-bold inline">
                          {" "}
                          {parcel.Reminders.length}
                        </div>
                      </div> }
                      {parcel.CollectedAt && <div>
                        Collected At:
                        <div className="font-bold inline">
                          {" "}
                          {getDate(parcel.CollectedAt)}
                        </div>
                      </div> }
                    </div>

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
                          className="flex gap-3 bg-primary_black hover:bg-opacity-50"
                          type="button"
                        >
                          Edit Parcel
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
                          <Input
                            placeholder="Parcel owner name"
                            {...field}
                            disabled={!editStatus}
                          />
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
                          <Input
                            placeholder="Parcel company name"
                            {...field}
                            disabled={!editStatus}
                          />
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
                            disabled={!editStatus}
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
                            placeholder=""
                            {...field}
                            disabled={!editStatus}
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
                        <FormLabel>Room Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="000"
                            {...field}
                            disabled={!editStatus}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="OwnerID"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="U20XX0XXX"
                            {...field}
                            disabled={!editStatus}
                          />
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
                          <Select
                            defaultValue={field.value}
                            disabled={!editStatus}
                          >
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
                          <Textarea {...field} disabled={!editStatus} />
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
      )}
    </>
  );
}
