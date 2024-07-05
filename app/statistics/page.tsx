"use client";
import { getParcels, filter_sort_query } from "@/utils";
import { useState, useEffect } from "react";
import {
  BarChartAlltime,
  HorizontalBarChartCompany,
  PieChartStatus,
  PieChartBatch,
} from "@/components/ui/graph";
import { getStatus, avgTime } from "@/app/statistics/getData";
import { Oval } from "react-loader-spinner";
const Page = () => {
  const [avg, setAvg] = useState(0);
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
      const avg_time = avgTime(parcelsMonth)
      setAvg(avg_time? avg_time: 0)
      setParcelsData([parcelsAllTime, parcelsMonth, parcelsWeek, parcelsToday]);
    })();
    return console.log("getting parcels!");
  }, []);

  const [parcelsData, setParcelsData] = useState([[], [], [], []]);
  const parcelStatus_alltime = getStatus(parcelsData[0]);
  // const parcelStatus_month = getStatus(parcelsData[1]);
  // const parcelStatus_week = getStatus(parcelsData[2]);
  // const parcelStatus_today = getStatus(parcelsData[3]);

  // console.log("parcels data", parcelsData[0]);
  // console.log("avg", avgTime(parcelsData[1]));
  return (
    <>
      {parcelsData[0].length == 0 ? (
        <div className="w-full flex flex-col h-[90vh] justify-center items-center">
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
          Counting parcels...
        </div>
      ) : (
        <div className="flex flex-col m-4 md:m-10 gap-6">
          <div className="mb-4 text-3xl md:text-4xl lg:text-6xl font-bold self-start">
            Statistics
          </div>
          {/* Left side with parcel counts */}
          <div className="flex flex-row gap-6 h-[70vh] ">
            {/* Parcel count for all time */}
            <div className="flex-col flex w-2/6 gap-6 h-full">
              <div className="flex flex-col bg-primary_white rounded-xl justify-around items-center p-6 h-1/2">
                <div className="text-xs md:text-base text-center">
                  Average Days taken to collect parcel this month
                </div>
                <div className="font-medium text-4xl md:text-7xl">
                  {avg}
                </div>
              </div>
              <div className="flex bg-primary_white rounded-xl justify-around items-center p-6 h-1/2">
                <div className="flex justify-center items-center">
                  <div className="flex flex-col items-center">
                    <div className="font-medium text-4xl md:text-7xl">
                      {parcelsData[0].length}
                    </div>
                    <div className="text-xs md:text-base text-center">
                      Total Parcels (all time)
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="font-medium text-4xl md:text-7xl text-center">
                    {parcelStatus_alltime.collected_count}
                  </div>
                  <div className="text-xs md:text-base text-center">
                    Collected Parcels
                  </div>
                  <div className="" />
                  <div className="font-medium text-4xl md:text-7xl text-center">
                    {parcelStatus_alltime.uncollected_count}
                  </div>
                  <div className="text-xs md:text-base text-center">
                    {" "}
                    Uncollected Parcels{" "}
                  </div>
                </div>
              </div>
            </div>
            {/* Parcel counts for this month, this week, and today */}
            <div className="bg-primary_white w-4/6 h-full rounded-xl justify-center items-center flex p-6">
              <BarChartAlltime parcels={parcelsData[0]} />
            </div>
          </div>
            <div className="flex gap-6 flex-row w-full h-full">
              {["This Month", "This Week", "Today"].map((period, index) => (
                <div
                  key={index}
                  className="flex bg-primary_white w-full rounded-xl justify-center items-center p-6"
                >
                  <div className="flex flex-col items-center w-2/6">
                    <div className="font-medium text-4xl">
                      {parcelsData[index + 1].length}
                    </div>
                    <div className="text-xs md:text-sm text-center">{`Parcels ${period}`}</div>
                  </div>
                  <div className="w-4/6">
                    <PieChartStatus parcels={parcelsData[index + 1]} />
                  </div>
                </div>
              ))}
            </div>

          {/* Right side with graph */}
          <div className="bg-primary_white w-full h-[27rem] rounded-xl overflow-hidden flex flex-row p-6">
            <div className="flex flex-1 justify-center items-center">
              <HorizontalBarChartCompany parcels={parcelsData[0]} />
            </div>
            <div className="flex flex-1 justify-center items-center">
              <PieChartBatch parcels={parcelsData[0]} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
