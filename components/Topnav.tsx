import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
const TopNav = () => {
  return (
    <div className="bg-primary_red p-4 gap-6 flex text-white items-center justify-between">
      <div className="flex gap-10">
        <Link href="/" className="text-lg flex justify-center items-center">
          <Image
            src="/AutoParcelIcon.png"
            alt="epic"
            width={60}
            height={10}
            className="-my-10 "
          />
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
