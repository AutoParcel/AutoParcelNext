"use server"
import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {

    const data = await req.json();
    console.log(data);

    let func=data.func;
    let query=data.query;

    await connectToDb();
    let funcs={'findMany':prisma.parcel.findMany,'findFirst':prisma.parcel.findFirst,'findUnique':prisma.parcel.findUnique,'update':prisma.parcel.update};
    // @ts-ignore
    let parcels = await funcs[func](query);

    if(func=='findUnique' || func=='findFirst' || func=='update'){
      if(parcels!=null){
        delete parcels.otp;
      }
    } 
    else if (func=='findMany'){
      if(parcels!=null && parcels.length>0){
        parcels?.forEach((parcel: any) => {
          delete parcel.otp;
        });
      }
    }

    return NextResponse.json({ parcels }, { status: 200 });
  } catch (error : any) {
    console.log(error);
    return NextResponse.json({ error }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};