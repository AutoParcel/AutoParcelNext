import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
const TopNav = () => {
  return (
    <div className="bg-primary_red p-5 gap-6 flex text-white items-center justify-between h-[60px]">
      <div className="flex gap-10">
        <Link href="/" className="text-xl flex justify-center items-center">
          <Image
            src="/AutoParcelIcon.png"
            alt="epic"
            width={60}
            height={10}
            className="-my-10"
          />
          AutoParcel
        </Link>
      </div>
      <div className="flex gap-5">
        <div className="flex gap-5 text-sm items-center">
          <Link href="/">Home</Link>
          <Link href="/parceladder">Add Parcel</Link>
          <Link href="/parcels">Parcels</Link>
          <Link href="/statistics">Statistics</Link>
          <Link href="/about">About Us</Link>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default TopNav;
