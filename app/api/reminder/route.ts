import prisma from "@/prisma";
import { NextResponse } from "next/server";
import axios from "axios";
import { differenceInHours } from "date-fns";
const sendReminder = async (parcel: any) => {
  console.log("sending reminder to " + parcel.OwnerName);

  const body = `Dear ${parcel.OwnerName},\nYour parcel ${parcel.ParcelID} has been waiting at Gate 1. \nKindly use ${parcel.otp} as your AutoParcel One Time Password (OTP) to collect your parcel as soon as possible.\n\nThank you for using AutoParcel.`;
  const subject = "Automated Reminder: Collect Your Parcel!";

  const Data = {
    body_text: body,
    subject: subject,
    recipient: parcel.ParcelReceiver.Email,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  const result = await axios
    .post("https://pythonserver-ftnw.onrender.com/smtp", Data, { headers })
    .then((res) => {
      console.log("Message response: ", res.data);
    })
    .catch((error) => {
      console.error("Failed to send a message", error);
    });
  const stringdate = new Date().toUTCString()
  console.log("result", result);
  await connectToDb();
  await prisma.parcel.update({
    where: {
      ParcelID: parcel.ParcelID, // Assuming ParcelID is the unique identifier for each parcel
    },
    data: {
      Reminders: {
        set: [...parcel.Reminders, stringdate], // Make sure parcel.Reminders initially exists and is iterable
      },
    },
  });
  await prisma.$disconnect();
};

const connectToDb = async () => {
  try {
    await prisma.$connect();
  } catch (err: any) {
    return new Error(err.message);
  }
};

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  console.log("request: ",request)
  console.log("AUTH HEADER: ", authHeader);
  console.log("API USER: ", process.env.API_USERSECRET);
  console.log("API PASS: ", process.env.API_PASSSECRET);
  if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const encodedCredentials = authHeader.split(" ")[1];
  const decodedCredentials = atob(encodedCredentials);
  const [username, password] = decodedCredentials.split(":");
  if (username === process.env.API_USERSECRET && password === process.env.API_PASSSECRET) {
  } else {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!authHeader) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  await connectToDb();
  const parcels = await prisma.parcel.findMany({
    where: {
      Status: "NC",
    },
    include: {
      ParcelReceiver: true,
    },
  });
  const filteredParcels = parcels.filter((parcel) => {
    if (parcel.Reminders && parcel.Reminders.length > 0) {
      const lastReminder = parcel.Reminders[parcel.Reminders.length - 1];
      // TODO
      const lastReminderDate = new Date(lastReminder)
      const hoursDiff = differenceInHours(new Date(), lastReminderDate);
      return hoursDiff >= 48;
    }
    return false;
  });
  for (const parcel of filteredParcels) {
    sendReminder(parcel);
  }
  try {
    return NextResponse.json({ filteredParcels }, { status: 200 });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
}
