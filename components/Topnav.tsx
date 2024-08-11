import Link from "next/link";
import Image from "next/image";
import SideNav from "@/components/ui/SideNav";
const TopNav = () => {
  return (
    <div className="bg-primary_red p-4 sm:p-5 gap-4 sm:gap-6 flex flex-col sm:flex-row text-white items-center justify-between min-h-[60px]">
      <div className="flex gap-4 sm:gap-6">
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
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/parceladder">Add Parcel</Link>
          <Link href="/dashboard/parcels">Parcels</Link>
          <Link href="/dashboard/statistics">Statistics</Link>
          <Link href="/dashboard/about">About Us</Link>
          <SideNav />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
