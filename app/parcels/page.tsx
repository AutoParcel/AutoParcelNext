"use client";
import ParcelCard from "@/components/ui/ParcelCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import writeXlsxFile from "write-excel-file";
import { Schema } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const getParcels = async () => {
  const parcels = await axios.get("/api/parcels");
  return parcels.data.parcels;
};
interface ParcelInterface {
  OwnerName: string;
  ParcelID: string;
  Shelf: string;
  ReceivedAt: string;
  Comment: string;
  Status: string;
  OwnerID: string;
  vendor_id: string;
}
const Parcel = () => {
  const [parcelsData, setParcelsData] = useState([]);
  useEffect(() => {
    (async () => {
      const parcels = await getParcels();
      console.log(parcels);
      setParcelsData(parcels);
    })();
    return console.log("component unmounted");
  }, []);
  const downloadExcel = async () => {
    console.log("download excel");
    console.log(parcelsData);
    const schema = [
      {
        column: "OwnerName",
        type: String,
        value: (student: any) => student.OwnerName,
      },
      {
        column: "OwnerID",
        type: String,
        value: (student: any) => student.OwnerID,
      },
      {
        column: "ParcelID",
        type: String,
        value: (student: any) => student.ParcelID,
      },
      {
        column: "Shelf",
        type: String,
        value: (student: any) => student.Shelf,
      },
      {
        column: "ReceivedAt",
        type: String,
        value: (student: any) => student.ReceivedAt,
      },
      {
        column: "Comment",
        type: String,
        value: (student: any) => student.Comment,
      },
      {
        column: "Status",
        type: String,
        value: (student: any) => student.Status,
      },
      {
        column: "vendor_id",
        type: Number,
        value: (student: any) => student.vendor_id,
      },
    ];
    await writeXlsxFile(parcelsData, {
      schema,
      fileName: "file.xlsx",
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="flex items-center mb-8">
        <div className="bg-gray-300 rounded-full p-2 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200">
          <input
            type="text"
            placeholder="Search brooo"
            className="border-none bg-transparent p-2 rounded-full w-48 outline-none"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <div>
          <div>
            <button
              id="optionsButton"
              className="flex items-center border-solid border-gray-800 border-[1px] px-5 py-2 rounded cursor-pointer font-bold bg-gray-200 hover:bg-gray-300 transition duration-300 w-[200px]"
            >
              Filter
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                height="20"
                width="20"
                viewBox="0 0 24 24"
                className="ml-2 text-gray-600"
              >
                <path d="M7 10l5 5 5-5z" fill="rgba(0,0,0,0.87)"></path>
              </svg>
            </button>
          </div>
        </div>

        <div>
          <button
            id="optionsButton"
            className="flex items-center border-solid border-gray-800 border-[1px] px-5 py-2 rounded cursor-pointer font-bold bg-gray-200 hover:bg-gray-300 transition duration-300 w-[200px]"
          >
            Sort By
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              className="ml-2 text-gray-600"
            >
              <path d="M7 10l5 5 5-5z" fill="rgba(0,0,0,0.87)"></path>
            </svg>
          </button>
          <div className="rounded border-[1px] border-gray-950 bg-blue-500 p-4 absolute top-[50-px] w-[200px] shadow-md hidden">
            <div className="cursor-pointer hover:bg-slate-600">Name</div>
            <div className="cursor-pointer hover:bg-slate-600">ID</div>
            <div className="cursor-pointer hover:bg-slate-600">Shelf</div>
            <div className="cursor-pointer hover:bg-slate-600">
              Date Received
            </div>
          </div>
        </div>
        <Button className="" onClick={downloadExcel}>
          Download Excel
        </Button>
      </div>
      <div className="mb-8 text-3xl font-bold">Parcel Details</div>
      {parcelsData.length === 0 ? (
        "No Parcels"
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20">
          {parcelsData.map((parcel: ParcelInterface) => (
            <ParcelCard
              name={parcel.OwnerName}
              shelf={parcel.Shelf}
              id={parcel.ParcelID}
              date={parcel.ReceivedAt}
              key={parcel.ParcelID}
              status={parcel.Status}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Parcel;
