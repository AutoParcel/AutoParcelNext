"use client";
import Link from "next/link";
import { LuPackagePlus, LuPackageSearch } from "react-icons/lu";
export default function Home() {
  return (
    <div className="flex items-center justify-center text-2xl font-bold text-primary_black min-h-[calc(100vh-60px)]">
      <Link
        href="/parceladder"
        className="text-center hover:bg-primary_white rounded-lg min-h-[calc(100vh-60px)] w-full h-full justify-center items-center flex flex-col"
      >
        <LuPackagePlus size={200} className="stroke-primary_yellow stroke-1" />
        Add Parcel
      </Link>
      <Link
        href="/parcels"
        className="text-center hover:bg-primary_white rounded-lg min-h-[calc(100vh-60px)] justify-center items-center flex flex-col w-full"
      >
        <LuPackageSearch
          size={200}
          className="stroke-primary_yellow stroke-1"
        />
        Parcel List
      </Link>
    </div>
  );
}
