import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request, parameter: any) => {
  try {
    await connectToDb();
    const parcel = await prisma.vendor.create({ data: parameter });
    return NextResponse.json({ parcel }, { status: 200 });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};