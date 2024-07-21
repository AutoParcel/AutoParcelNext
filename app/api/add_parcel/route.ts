import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { getParcelOTP } from "@/utils";
import sendMessage from "@/hooks/sendTwilio";

export const POST = async (req: Request) => {
  try {
    
    let data = await req.json();
    data.data.otp = getParcelOTP();
    await connectToDb();
    const parcel: any = await prisma.parcel.create({data:data.data,include:{ParcelReceiver: true}}); // Add type annotation to parcel
    sendMessage(parcel, parcel.otp, "c");
    console.log("otp sent!"); 
    delete parcel.otp
    return NextResponse.json({ parcel }, { status: 200 });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};