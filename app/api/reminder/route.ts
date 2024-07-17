import prisma from "@/prisma";
import { NextResponse } from "next/server";
import axios from "axios";

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

    const sendReminder = async (parcel:any) => {
          console.log("Someone called me! cron job is running");
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
          const newdate = getDate(new Date().toDateString())
          console.log("result", result)
          await connectToDb();
          await prisma.parcel.update({
            where: {
              ParcelID: parcel.ParcelID, // Assuming ParcelID is the unique identifier for each parcel
            },
            data: {
              Reminders: {
                set: [...parcel.Reminders, newdate], // Make sure parcel.Reminders initially exists and is iterable
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
      await connectToDb();
      const parcels = await prisma.parcel.findMany({
            where: {
              Status: "NC",
            },
            include: {
              ParcelReceiver: true,
            }
          });
      for (const parcel of parcels) {
          sendReminder(parcel);
          }
      try {
            return NextResponse.json({ parcels }, { status: 200 });
          } catch (error) {
            console.log(error);
            //@ts-ignore
            return NextResponse.json({ error: error.message }, { status: 200 });
          } finally {
            await prisma.$disconnect();
          }
  }