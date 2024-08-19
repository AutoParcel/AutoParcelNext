import Link from "next/link";
import Image from "next/image";
import SideNav from "@/components/ui/SideNav";
const TopNav = () => {
  return (
    <div className="flex flex-col min-h-[60px]">
      {/* Dark Blue Section */}
      <div className="bg-[#007878] p-5 flex items-center justify-between h-[60px]">
        <div className="flex items-center w-full">
          <Image
            src="/PU_White_Primary.png"
            alt="Plaksha University"
            width={130}
            height={95}
          />

          <div className="flex-grow flex justify-center">
            <Image
              src="/AutoParcelIcon.png"
              width={33}
              height={10}
              alt="Picture of the author"
            />
            <span className="ml-4 text-xl text-white">AutoParcel</span>
          </div>
        </div>
        <div className="text-sm text-white">
          Hi,User
        </div>
      </div>

      {/* Light Blue Section */}
      <div className="bg-[#00a0b4] p-4 flex justify-end h-[40px]">
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
