"use client";
import ParcelCard from "@/components/ui/ParcelCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import writeXlsxFile from "write-excel-file";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Oval } from "react-loader-spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getParcels, filter_sort_query } from "@/utils";
interface ParcelInterface {
  OwnerName: string;
  ParcelID: string;
  Shelf: string;
  ReceivedAt: string;
  Comment: string;
  Status: string;
  OwnerID: string;
  vendor_id: string;
  ParcelReceiver: any;
  vendor: any;
}

const Parcel = () => {
  const [loading, setLoading] = useState(false);
  const [parcelsData, setParcelsData] = useState([]);
  const [filteredParcelsData, setFilteredParcelsData] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [searchParam, setSearchParam] = useState("OwnerName");
  const [filterOptions, setFilterOptions] = useState({
    timefilt: "A",
    sort: "D",
    status: "A",
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      const query = filter_sort_query(
        filterOptions.timefilt,
        filterOptions.sort,
        filterOptions.status
      );

      // console.log(query);
      const parcels = await getParcels("findMany", query);
      console.log("parcels: ", parcels);
      setParcelsData(parcels);
      setFilteredParcelsData(parcels);
    })();
    setLoading(false);
    console.log("getting parcels!");
    // return console.log("getting parcels!");
  }, [filterOptions,]);

  useEffect(() => {
    setLoading(true);
    if (searchParam == "Batch" || searchParam == "OwnerID") {
      const filteredData = parcelsData.filter((parcel: ParcelInterface) => {
        console.log(parcel);
        if (parcel.ParcelReceiver != null) {
          return parcel.ParcelReceiver[searchParam as keyof ParcelInterface]
            .toLowerCase()
            .includes(searchWord.toLowerCase());
        }
      });
      setFilteredParcelsData(filteredData);
    } else if (searchParam == "ParcelCompany") {
      const filteredData = parcelsData.filter((parcel: ParcelInterface) => {
        if (parcel.vendor != null) {
          return parcel.vendor[searchParam as keyof ParcelInterface]
            .toLowerCase()
            .includes(searchWord.toLowerCase());
        }
      });

      setFilteredParcelsData(filteredData);
    } else if (searchParam !== "") {
      const filteredData = parcelsData.filter((parcel: ParcelInterface) => {
        return parcel[searchParam as keyof ParcelInterface]
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      });
      setFilteredParcelsData(filteredData);
    } else {
      setFilteredParcelsData(parcelsData);
    }
    setLoading(false);
  }, [searchWord, searchParam]);

  const downloadExcel = async () => {
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
    await writeXlsxFile(filteredParcelsData, {
      schema,
      fileName: "file.xlsx",
    });
  };

  return (
    <div className="flex flex-col items-center justify-between p-5 mx-4 md:mx-8 lg:mx-14 gap-5 my-5 md:my-8 lg:my-10">
      <div className="mb-4 text-3xl md:text-4xl lg:text-6xl font-bold self-start">
        Parcel Details
      </div>
      <div className="flex flex-wrap items-center justify-between w-full gap-5 md:gap-8">
        <div className="flex border rounded-xl p-1 focus:outline-none focus:ring focus:ring-gray-100">
          <Input
            type="text"
            placeholder="Search By"
            className="border-none bg-transparent p-2 md:w-58 lg:w-80 outline-none"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <div className="">
            <Select
              defaultValue={searchParam}
              onValueChange={(val) => setSearchParam(val)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OwnerName">Name</SelectItem>
                <SelectItem value="ParcelID">Parcel ID</SelectItem>
                <SelectItem value="OwnerID">User ID</SelectItem>
                <SelectItem value="Batch">Batch</SelectItem>
                <SelectItem value="ParcelCompany">Parcel Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Select
          defaultValue={filterOptions.timefilt}
          onValueChange={(val) =>
            setFilterOptions((prev) => {
              return { ...prev, timefilt: val };
            })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="T">Today</SelectItem>
            <SelectItem value="W">This Week</SelectItem>
            <SelectItem value="M">This Month</SelectItem>
            <SelectItem value="A">All Parcels</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex justify-center items-center gap-2">
          <div className="">Sort By: </div>
          <Select
            defaultValue={filterOptions.sort}
            onValueChange={(val) =>
              setFilterOptions((prev) => {
                return { ...prev, sort: val };
              })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="N">Name</SelectItem>
              <SelectItem value="Sh">Shelf</SelectItem>
              <SelectItem value="P">Parcel ID</SelectItem>
              <SelectItem value="D">Date</SelectItem>
              <SelectItem value="S">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <RadioGroup
          defaultValue={filterOptions.status}
          onValueChange={(val) =>
            setFilterOptions((prev) => {
              return { ...prev, status: val };
            })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="A" id="A" />
            <Label htmlFor="A">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="C" id="C" />
            <Label htmlFor="C">Collected</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="NC" id="NC" />
            <Label htmlFor="NC">Not Collected</Label>
          </div>
        </RadioGroup>
        <Button className="" onClick={downloadExcel}>
          Download Excel
        </Button>
      </div>
      {loading ? (
        <Oval
          height={60}
          width={60}
          color="var(--primary_red)"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="var(--primary_red)"
          strokeWidth={6}
          strokeWidthSecondary={3}
        />
      ) : parcelsData.length === 0 ? (
        "No Parcels"
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 w-full">
          {filteredParcelsData.map((parcel: ParcelInterface) => (
            <ParcelCard
              name={parcel.OwnerName}
              ownerid={parcel.OwnerID}
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
