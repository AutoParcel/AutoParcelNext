import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
const TopNav = () => {
  return (
    <div className="bg-red-500 p-4 gap-6 flex text-white items-center justify-between">
      <div className="flex gap-10">
        <Link href="/" className="text-lg">
          AutoParcel
        </Link>
        <div className="flex gap-5 text-xs items-center">
          <Link href="/">Home</Link>
          <Link href="/parceladder">Add new parcel</Link>
          <Link href="/parcels">Parcels</Link>
          <Link href="/about">About Us</Link>
        </div>
      </div>
      <div className="">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default TopNav;
