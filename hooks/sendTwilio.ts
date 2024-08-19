"use server";
import axios from "axios";
import prisma from "@/prisma";
import { getDate } from "@/utils";
interface Parcel {
  ParcelID: string;
  OwnerName: string;
  ParcelCompany: string;
  ParcelNumber: string;
  PhoneNumber: string;
  RoomNumber: string;
  OwnerID: string;
  Shelf: string;
  Comment: string;
  Status: string;
  ReceivedAt: string;
  CollectedAt: string | null;
  Reminders: any[];
  ParcelReceiver: {
    Batch: string;
    Email: string;
    OwnerName: string;
    PhoneNumber: string;
    RoomNumber: string;
  };
}

export default async function sendMessage(
  parcel_obj: Parcel,
  otp: string | undefined,
  type: string
) {
  try {
    console.log("sending message via smtp");
    console.log(parcel_obj);

    let body = "";
    let subject = "";
    if (type == "resend" || type == "reminder") {
      console.log("otp is being fetched from db");  
      const new_parcel = await prisma.parcel.findUnique({
        where: {
          ParcelID: parcel_obj.ParcelID,
        },
      });
      otp = new_parcel?.otp;
    }
    if (type == "c") {
      body = `Dear ${parcel_obj.OwnerName},
      
We hope this message finds you well. This is to inform you that we will attempt to deliver your courier today. Kindly ensure that you share the ${otp} as your One Time Password (OTP) with the guard upon delivery. This will help facilitate a smooth and efficient delivery process.
      
Thanks,
Mailroom
      `
      if(parcel_obj.ParcelReceiver.Batch.startsWith("UG") || parcel_obj.ParcelReceiver.Batch.startsWith("TLP")){
      body = `Dear ${parcel_obj.OwnerName},\nYour parcel ${parcel_obj.ParcelID} has arrived at Gate 1 on date:  ${getDate(parcel_obj.ReceivedAt)}.\nKindly use ${otp} as your AutoParcel One Time Password (OTP) to collect your parcel.\n\nThank you for using AutoParcel.`;
    }
    subject = `Your Parcel ${parcel_obj.ParcelID} Arrived!`;
    } else if (type == "h") {
      body = `Dear ${parcel_obj.OwnerName},

We hope this message finds you well. This is to inform you that your parcel ${parcel_obj.ParcelID} has been collected.
      
Thanks,
Mailroom
      `
      if((parcel_obj.ParcelReceiver.Batch.startsWith("UG") || parcel_obj.ParcelReceiver.Batch.startsWith("TLP")) && parcel_obj.CollectedAt){
      body = `Dear ${parcel_obj.OwnerName},\nYour parcel ${parcel_obj.ParcelID} has been collected from Gate 1 on date:  ${getDate(parcel_obj.CollectedAt)}.\n\nThank you for using AutoParcel.`;
      }
      subject = `Your Parcel ${parcel_obj.ParcelID} Handed-Over!`;
    } else if (type == "reminder") {
      body = `Dear ${parcel_obj.OwnerName},
      
I hope this message finds you well. This is to inform you that a courier package Via ${parcel_obj.ParcelCompany} ${parcel_obj.ParcelNumber} addressed to you was attempted for delivery today, but unfortunately, you were not available at the time the guard attempted to hand it over.

To ensure you receive your package promptly, please visit the mailroom to collect it at your earliest convenience using ${otp} as your One Time Password (OTP). The mailroom ( Gate-1, Security Post) is open from 09:00 AM to 07:00 PM. Kindly present your identification to the guard, and they will assist you in retrieving your parcel.

If you have any questions or concerns regarding this matter, please feel free to reach out to security at 98759-90803.

Thank you for your attention to this matter.
`
    if(parcel_obj.ParcelReceiver.Batch.startsWith("UG") || parcel_obj.ParcelReceiver.Batch.startsWith("TLP")){
      body = `Dear ${parcel_obj.OwnerName},\nYour parcel ${parcel_obj.ParcelID} has been waiting at Gate 1. \nKindly use ${otp} as your AutoParcel One Time Password (OTP) to collect your parcel as soon as possible.\n\nThank you for using AutoParcel.`;
    }
      subject = "Reminder: Collect Your Parcel!";
    } else {
      body = `Kindly use ${otp} as your AutoParcel One Time Password (OTP) to collect your parcel.\n\nThank you for using AutoParcel.`;
      subject = "AutoParcel OTP";
    }
    const Data = {
      body_text: body,
      subject: subject,
      recipient: parcel_obj.ParcelReceiver.Email,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    console.log("Data: ", Data);
    const result = await axios
      .post("http://autoparcel-backend-1:8000/smtp", Data, { headers })
      .then((res) => {
        console.log("Message response: ", res.data);
      })
      .catch((error) => {
        console.error("Failed to send a message", error);
      });
    return result;
  } catch (err) {
    console.log(err);
  }
}
