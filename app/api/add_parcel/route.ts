import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    
    const data = await req.json();
    console.log(data);

    await connectToDb();
    const parcel = await prisma.parcel.create(data);
    return NextResponse.json({ parcel }, { status: 200 });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};