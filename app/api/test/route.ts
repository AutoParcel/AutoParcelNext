import { connectToDb } from "@/utils";
import prisma from "@/prisma";
import { NextResponse } from "next/server";
export const POST = async (req: Request) => {
  const data = await req.json();
  console.log(data);
  console.log("gello");
  return NextResponse.json(data.epic, { status: 200 });
};
