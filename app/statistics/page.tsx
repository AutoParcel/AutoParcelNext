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
    <div className="flex flex-col md:flex-row m-4 md:m-10 gap-6">
      {/* Left side with parcel counts */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Parcel count for all time */}
        <div className="flex bg-primary_beige md:w-72 h-72 rounded-xl justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="font-medium text-4xl md:text-9xl">{parcelsData[0].length}</div>
            <div className="text-xs md:text-base text-center">Parcels all time</div>
          </div>
        </div>

        {/* Parcel counts for this month, this week, and today */}
        <div className="flex gap-6">
          {['This Month', 'This Week', 'Today'].map((period, index) => (
            <div key={index} className="flex bg-primary_white md:w-32 h-32 rounded-xl justify-center items-center">
              <div className="flex flex-col items-center">
                <div className="font-medium text-4xl">{parcelsData[index + 1].length}</div>
                <div className="text-xs md:text-sm text-center">{`Parcels ${period}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side with graph */}
      <div className="bg-primary_white w-full h-[27rem] rounded-xl justify-center items-center flex">
        GRAPH
      </div>
    </div>
  );
};

export default Page;