"use client";
import Link from "next/link";
import { LuPackagePlus, LuPackageSearch } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import axios from "axios";
export default function Home() {
  const sendRequest = async () => {
    const response = await axios.post("/api/test", {
      data: { epic: "epic" },
    });
    console.log(response.data);
  };
  return (
    <div className="flex justify-around text-2xl font-bold text-primary_black mt-64">
      <Link href="/parceladder" className="text-center">
        <LuPackagePlus size={200} className="stroke-primary_yellow stroke-1" />
        Add Parcel
      </Link>
      <Link href="/parcels" className="text-center">
        <LuPackageSearch
          size={200}
          className="stroke-primary_yellow stroke-1"
        />
        Parcel List
      </Link>
      <Button onClick={sendRequest}>EPIC</Button>
    </div>
  );
}
