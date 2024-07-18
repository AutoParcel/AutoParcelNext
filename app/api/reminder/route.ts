import prisma from "@/prisma";
import { NextResponse } from "next/server";
import axios from "axios";
import { parse, differenceInHours } from "date-fns";

function getOrdinalNum(n: number) {
      return (
        n +
        (n > 0
          ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
          : "")
      );
    }

const getDate = (olddate: string) => {
      let date = new Date(olddate); //in UTC
      
      const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // 5 hours 30 minutes in milliseconds
      const istDate = new Date(date.getTime() + istOffset); //in IST
      
      let currentDayOrdinal = getOrdinalNum(istDate.getDate());
      let currentMonth = istDate.toLocaleString("default", { month: "long" });
      let currentYear = istDate.getFullYear();
      let currentTime = istDate.getUTCHours() + ":" + istDate.getUTCMinutes();
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
          const newdate = getDate(new Date().toUTCString())
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
      const filteredParcels = parcels.filter(parcel => {
        if (parcel.Reminders && parcel.Reminders.length > 0) {
          const lastReminder = parcel.Reminders[parcel.Reminders.length - 1];
          const lastReminderDate = parse(lastReminder, 'do MMMM yyyy at HH:mm', new Date());

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