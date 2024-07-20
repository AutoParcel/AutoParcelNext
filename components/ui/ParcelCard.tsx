import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Input } from "./input";
import { getParcels } from "@/utils";
import { useState } from "react";
import sendMessage from "@/hooks/sendTwilio";
import {getDate} from "@/utils";
const ParcelCard = ({
  name,
  ownerid,
  shelf,
  date,
  id,
  status,
  no_of_reminders,
}: {
  name: string;
  ownerid: string;
  shelf: string;
  id: string;
  date: string;
  status: string;
  no_of_reminders: number;
}) => {
  
  const [userotp, setUserotp] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const newdate = new Date(date);
  const CardClicked = async (event: any, name = "") => {
    event.stopPropagation();
    if (name == "Collected") {
      toast({
        title: "Parcel Already Collected!",
        description: "",
        variant: "destructive",
        duration: 3000,
      });
    } else if (name == "Handover") {
      console.log("handover opened");
      // console.log("otp",parseInt(userotp));
      let otp_user = await getParcels("findUnique", {
        where: {
          ParcelID: id,
          otp: userotp,
        },
        //include: { vendor: true, ParcelReceiver: true }
      });
      console.log("otp_user", otp_user);
      if (otp_user != null) {
        otp_user = await getParcels("update", {
          where: {
            ParcelID: id,
          },
          data: {
            Status: "C",
            CollectedAt : new Date(),
          },
          include: {ParcelReceiver: true },
        });
        console.log("with include: ", otp_user);
        if (otp_user.Status == "C") {
          toast({
            title: "Parcel Handover",
            description: "Parcel Handover Successful!",
            duration: 3000,
          });
          await sendMessage(otp_user, "0", "h");
          router.push("/dashboard/parcels/" + id);
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
      // we'll send a query to find a unique parcel with the id and then update it's status to collected
    } else if (name == "epic") {
    } else {
      router.push("/dashboard/parcels/" + id);
    }
    console.log(event, name);
  };
  const exclamationClicked = async(e: any) => {
    e.stopPropagation();
    let last_date = await getParcels("findUnique", {
      where: {
        ParcelID: id,
      },
      select: {
        Reminders: true
      }
    })
    toast({
      title: "Last Reminder Sent on",
      description: getDate(last_date.Reminders[last_date.Reminders.length - 1]),
      duration: 3000,
    })
  }
  return (
    <Dialog>
      <div
        className={`${
          status == "C" ? "opacity-50" : "hover:bg-primary_beige"
        } p-4 rounded-md shadow-md text-center bg-primary_white cursor-pointer flex flex-col justify-between`}
        onClick={(e) => CardClicked(e)}
        >
        <div className="h-full flex flex-col relative">
        {status == "NC" && no_of_reminders > 1 ? 
        <div className="text-white font-bold absolute bg-primary_red rounded-full w-10 h-10 text-sm justify-center items-center flex -right-6 -top-6"
        onClick={(e) => exclamationClicked(e)}>
        !</div>:""}
          <div className="flex justify-center">
            <div className="text-xl font-semibold mb-2">{id}</div>
          </div>
          <div className="text-left mb-2">{name} </div>
          <div className="text-left -mt-3 mb-1 text-xs text-primary_yellow font-bold">
            {ownerid}
          </div>
          <div className="text-left mb-2">Shelf {shelf}</div>
          <div className="text-right mb-2 justify-self-end ">
            {newdate.getDate().toString() +
              "-" +
              newdate.getMonth().toString() +
              "-" +
              newdate.getFullYear().toString()}
          </div>
        </div>
        <div>
          {status == "C" ? (
            <button
              className="bg-primary_black text-primary_white p-4 rounded-md w-full"
              onClick={(e) => CardClicked(e, "Collected")}
            >
              Collected
            </button>
          ) : (
            // <button
            //   className="bg-primary_black text-primary_white rounded-md w-full"
            //   onClick={(e) => CardClicked(e, "epic")}
            // >
              <DialogTrigger className="p-4 bg-primary_black text-primary_white rounded-md w-full" onClick={(e) => CardClicked(e, "epic")}>
                Handover Parcel
              </DialogTrigger>
            // </button>
          )}
        </div>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please enter OTP to handover parcel</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
            <div className="flex flex-col gap-5">
              <div className="flex gap-4">
                <Input
                  type="number"
                  placeholder="OTP"
                  value={userotp}
                  onChange={(e) => setUserotp(e.target.value)}
                />
                <Button className="w-full">Resend OTP</Button>
              </div>
              <Button onClick={(e) => CardClicked(e, "Handover")}>
                Handover Parcel
              </Button>
            </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelCard;
