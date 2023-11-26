import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  try {

    const data = await req.json();
    console.log(data);

    await connectToDb();
    const vendors = await prisma.vendor.findMany(data.query);
    return NextResponse.json({ vendors }, { status: 200 });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return NextResponse.json({ error: error.message }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};
