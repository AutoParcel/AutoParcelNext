import Link from "next/link";
import { LuPackagePlus, LuPackageSearch } from "react-icons/lu";
export default function Home() {
  return (
    <div className="flex items-center justify-center text-2xl font-bold text-primary_black min-h-[calc(100vh-60px)]">
      <Link
        href="dashboard/parceladder"
        className="text-center hover:bg-primary_white min-h-[calc(100vh-60px)] w-full h-full justify-center items-center flex flex-col group"
      >
        <LuPackagePlus
          size={200}
          className="stroke-primary_yellow stroke-1 group-hover:stroke-primary_red"
        />
        Add Parcel
      </Link>
      <Link
        href="dashboard/parcels"
        className="text-center hover:bg-primary_white min-h-[calc(100vh-60px)] justify-center items-center flex flex-col w-full group"
      >
        <LuPackageSearch
          size={200}
          className="stroke-primary_yellow stroke-1 group-hover:stroke-primary_red"
        />
        Parcel List
      </Link>
    </div>
  );
}
