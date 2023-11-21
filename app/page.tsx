import Link from "next/link";
import { LuPackagePlus, LuPackageSearch } from "react-icons/lu";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex justify-around w-full text-2xl font-bold text-primary_black">
        <div className="text-center">
          <LuPackageSearch
            size={200}
            className="stroke-primary_yellow stroke-1"
          />
          <Link href="/parcels">Parcel List</Link>
        </div>
        <div className="text-center">
          <LuPackagePlus
            size={200}
            className="stroke-primary_yellow stroke-1"
          />
          <Link href="/parceladder">Add Parcel</Link>
        </div>
      </div>
    </main>
  );
}
