import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  const data = await req.json();
  console.log(data);
  return NextResponse.json("This is from test", { status: 200 });
};
