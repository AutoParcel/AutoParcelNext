
import Link from "next/link";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-2xl font-bold text-primary_black">
      {/* Image Section */}
      <div className="relative w-full h-[150px] lg:h-[230px] overflow-hidden mb-4">
        <Image
          src="/picture27.png"
          fill
          className="top-0"
          objectFit="cover"
          objectPosition="bottom"
          alt="plaksha"
        />
        <div className="absolute bottom-0 left-0 p-4 text-white text-3xl font-semibold">
          <p>Welcome to Plaksha</p>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-col md:flex-row justify-around w-[90%] gap-12 ">
        <Link
          href="/dashboard/parceladder"
          className="bg-gray-200 flex flex-col justify-center items-center p-6 w-full h-60 rounded-3xl group hover:scale-105 transition-transform duration-300"
        >
          <div className="w-40 h-40 relative mb-2">
          <Image alt="add_parcel" fill src="/add-package.png"  />
          </div>
          <span className="text-lg">Add Parcel</span>
        </Link>
        <Link
          href="/dashboard/parcels"
          className="bg-gray-200 flex flex-col justify-center items-center w-full h-60 rounded-3xl group hover:scale-105 transition-transform duration-300"
        >
          <div className="w-40 h-40 mb-2 relative">
          <Image src="/parcel.png" fill alt="parcels"  />
          </div>
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

