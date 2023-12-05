"use client";
import { getParcels, filter_sort_query } from "@/utils";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
const Page = () => {
  useEffect(() => {
    (async () => {
      const queryAllTime = filter_sort_query("A", "N", "A");
      const queryMonth = filter_sort_query("M", "N", "A");
      const queryWeek = filter_sort_query("W", "N", "A");
      const queryToday = filter_sort_query("T", "N", "A");
      const parcelsAllTime = await getParcels("findMany", queryAllTime);
      const parcelsMonth = await getParcels("findMany", queryMonth);
      const parcelsWeek = await getParcels("findMany", queryWeek);
      const parcelsToday = await getParcels("findMany", queryToday);
      setParcelsData([parcelsAllTime, parcelsMonth, parcelsWeek, parcelsToday]);
    })();
    return console.log("getting parcels!");
  }, []);
  const [parcelsData, setParcelsData] = useState([[], [], [], []]);
  return (
    <div className="flex m-10 gap-6">
      <div className="flex gap-6 flex-col">
        <div className=" flex bg-primary_beige w-[27rem] h-[27rem] rounded-xl justify-center items-center">
          <div className="justify-center items-center flex flex-col">
            <div className="font-medium text-9xl">{parcelsData[0].length}</div>
            <div className="">parcels all time</div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className=" flex bg-primary_white w-32 h-32 rounded-xl justify-center items-center">
            <div className="justify-center items-center flex flex-col">
              <div className="font-medium text-4xl">
                {parcelsData[1].length}
              </div>
              <div className="text-xs text-center">parcels this month</div>
            </div>
          </div>
          <div className=" flex bg-primary_white w-32 h-32 rounded-xl justify-center items-center">
            <div className="justify-center items-center flex flex-col">
              <div className="font-medium text-4xl">
                {parcelsData[2].length}
              </div>
              <div className="text-xs text-center">parcels this week</div>
            </div>
          </div>
          <div className=" flex bg-primary_white w-32 h-32 rounded-xl justify-center items-center">
            <div className="justify-center items-center flex flex-col">
              <div className="font-medium text-4xl">
                {parcelsData[3].length}
              </div>
              <div className="text-xs text-center">parcels today</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary_white w-full h-[27rem] rounded-xl justify-center items-center flex">
        GRAPH
      </div>
    </div>
  );
};

export default Page;
