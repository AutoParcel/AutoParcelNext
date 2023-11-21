"use client";
import ParcelCard from "@/components/ui/ParcelCard";
import axios from "axios";
import { useEffect } from "react";

const getParcels = async () => {
  const parcels = await axios.get("/api/parcels");
  return parcels;
};

const Parcel = () => {
  useEffect(() => {
    const parcels = getParcels();
    console.log("Hello");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      {/* Search Bar at the top */}
      <div className="flex items-center mb-8">
        <div className="bg-gray-300 rounded-full p-2 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200">
          <input
            type="text"
            placeholder="Search brooo"
            className="border-none bg-transparent p-2 rounded-full w-48 outline-none"
          />
        </div>

        <button className="bg-blue-500 text-white p-2.5 rounded-full ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-7a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

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
      </div>

      <div className="mb-8 text-3xl font-bold">Parcel Details</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20">
        {/* {parcelsData.map((parcel, index) => (
          <ParcelCard
            name={""}
            shelf={""}
            id={""}
            date={""}
            index={0}
            key={0}
          />
        ))} */}
      </div>

      {/* Rest of the content goes here */}
    </main>
  );
};

export default Parcel;
