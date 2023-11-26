import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
export const GET = async (req: Request, parameter:any) => {
  try {
    await connectToDb();
    const parcelRecievers = await prisma.vendor.findMany(parameter);
    return NextResponse.json({ parcelRecievers }, { status: 200 });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};
