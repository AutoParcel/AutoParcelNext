"use server";
import axios from "axios";
import prisma from "@/prisma";

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
    let body = "";
    let subject = "";
    if (type == "resend" || type == "reminder") {
      const new_parcel = await prisma.parcel.findUnique({
        where: {
          ParcelID: parcel_obj.ParcelID,
        },
      });
      otp = new_parcel?.otp;
    }
    if (type == "c") {
      body = `Dear ${parcel_obj.OwnerName},\nYour parcel ${parcel_obj.ParcelID} has arrived at Gate 1 at ${parcel_obj.ReceivedAt}.\nKindly use ${otp} as your AutoParcel One Time Password (OTP) to collect your parcel.\n\nThank you for using AutoParcel.`;
      subject = `Your Parcel ${parcel_obj.ParcelID} Arrived!`;
    } else if (type == "h") {
      body = `Dear ${parcel_obj.OwnerName},\nYour parcel ${parcel_obj.ParcelID} has been collected from Gate 1 at ${parcel_obj.CollectedAt}.\n\nThank you for using AutoParcel.`;
      subject = `Your Parcel ${parcel_obj.ParcelID} Handed-Over!`;
    } else if (type == "reminder") {
      body = `Kindly use ${otp} as your AutoParcel One Time Password (OTP) to collect your parcel.`;
      body = `Dear ${parcel_obj.OwnerName},\nYour parcel ${parcel_obj.ParcelID} has been waiting at Gate 1. \nKindly use ${otp} as your AutoParcel One Time Password (OTP) to collect your parcel as soon as possible.\n\nThank you for using AutoParcel.`;
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
      .post("https://pythonserver-ftnw.onrender.com/smtp", Data, { headers })
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
