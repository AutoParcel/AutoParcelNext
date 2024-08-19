
import Link from "next/link";
import { LuPackagePlus, LuPackageSearch } from "react-icons/lu";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-2xl font-bold text-primary_black">
      {/* Image Section */}
      <div className="relative w-full h-[190px] overflow-hidden mb-4">
        <Image
          src="/picture27.png"
          layout="fill"
          objectFit="cover"
          alt="Picture of the author"
          priority
        />
        <div className="absolute bottom-0 left-0 p-4 text-white text-3xl font-semibold">
          <p>Welcome to Plaksha</p>
        </div>
      </div>

      {/* Button Section */}
      <div className="grid grid-cols-2 gap-20 p-4">
        <Link
          href="/dashboard/parceladder"
          className="bg-gray-200 flex flex-col justify-center items-center p-6 w-80 h-60 rounded-3xl group hover:scale-105 transition-transform duration-300"
        >
          <img src="/add-package.png" className="w-40 h-40 mb-2" />
          <span className="text-lg">Add Parcel</span>
        </Link>
        <Link
          href="/dashboard/parcels"
          className="bg-gray-200 flex flex-col justify-center items-center w-80 h-60 rounded-3xl group hover:scale-105 transition-transform duration-300"
        >
          <img src="/parcel.png" className="w-40 h-40 mb-2" />
          <span className="text-lg">Parcel List</span>
        </Link>
        {/* <Link
          href="/dashboard/statistics"
          className="bg-gray-200 flex flex-col justify-center items-center w-62 h-38 rounded-3xl group hover:bg-primary_white"
        >
          <img src="/bar-chart.png" className="w-20 h-20 mb-2" />
          <span className="text-lg">Statistics</span>
        </Link>
        <Link
          href="/dashboard/about"
          className="bg-gray-200 flex flex-col justify-center items-center p-6 w-62 h-38 rounded-3xl group hover:bg-primary_white"
        >
          <img src="/about.png" className="w-20 h-20 mb-2" />
          <span className="text-lg">About Us</span>
        </Link> */}
      </div>
    </div>
  );
}

