import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
export const GET = async (req: Request, parameter: any, func: any = 'findMany') => {
  try {
    await connectToDb();
    let funcs={'findMany':prisma.parcel.findMany,'findFirst':prisma.parcel.findFirst,'findUnique':prisma.parcel.findUnique}
    // const parcels = await prisma.parcel.findMany(parameter);
    // @ts-ignore
    const parcels = await funcs[func](parameter);
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