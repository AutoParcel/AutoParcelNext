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
    // const parcels = await prisma.parcel.findMany(parameter);
    // @ts-ignore
    let parcels = await funcs[func](query);
    // remove otp from each parcel

    // if it's null it will give an error.
    // first check if it's null/empty

    if(func=='findUnique'){
      if(parcels!=null){
        delete parcels.otp;
      }
    } else if (func=='findMany'){
      if(parcels!=null && parcels.length>0){
        parcels?.forEach((parcel: any) => {
          delete parcel.otp;
        });
      }
    }

    // parcels.forEach((parcel: any) => {
    //   delete parcel.otp;
    // });


    return NextResponse.json({ parcels }, { status: 200 });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};

// export const POST = async (req: Request, parameter: any) => {
//   try {
//     await connectToDb();
//     const parcel = await prisma.parcel.create({ data: parameter });
//     return NextResponse.json({ parcel }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     //@ts-ignore
//     return NextResponse.json({ error: error.message }, { status: 200 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };