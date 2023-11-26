import Link from "next/link";
import { LuPackagePlus, LuPackageSearch } from "react-icons/lu";
export default function Home() {
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
    </div>
  );
}
