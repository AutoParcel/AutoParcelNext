"use client";
import ParcelCard from "@/components/ui/ParcelCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import writeXlsxFile from "write-excel-file";
import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getParcels } from "@/utils";
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
      const parcels = await getParcels("findMany", {});
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
    <div className="flex min-h-screen flex-col items-center justify-between p-5 mx-14 gap-10 my-10">
      <div className="mb-8 text-6xl font-bold self-start">Parcel Details</div>
      <div className="flex flex-wrap items-center justify-between w-full gap-10">
        <div className="flex border rounded-lg p-1 focus:outline-none focus:ring focus:ring-gray-100">
          <input
            type="text"
            placeholder="Search By"
            className="border-none bg-transparent p-2 md:w-48 lg:w-80 outline-none"
          />
          <div className="">
            <Select defaultValue="Name">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Name">Name</SelectItem>
                <SelectItem value="ParcelID">Parcel ID</SelectItem>
                <SelectItem value="OwnerID">User ID</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Select defaultValue="allTime">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="Week">This Week</SelectItem>
            <SelectItem value="Month">This Month</SelectItem>
            <SelectItem value="allTime">All Parcels</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-center items-center gap-2">
          <div className="">Sort By: </div>
          <Select defaultValue="Date">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Today">Name</SelectItem>
              <SelectItem value="Week">Shelf</SelectItem>
              <SelectItem value="Month">Parcel ID</SelectItem>
              <SelectItem value="Date">Date</SelectItem>
              <SelectItem value="Status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Collected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="option-three" />
            <Label htmlFor="option-three">Not Collected</Label>
          </div>
        </RadioGroup>
        <Button className="" onClick={downloadExcel}>
          Download Excel
        </Button>
      </div>
      {parcelsData.length === 0 ? (
        "No Parcels"
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 w-full">
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
    </div>
  );
};

export default Parcel;
