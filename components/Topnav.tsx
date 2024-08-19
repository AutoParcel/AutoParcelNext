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

          <div className="flex-grow flex md:justify-center justify-end">
            <Image
              src="/AutoParcelIcon.png"
              width={33}
              height={10}
              alt="Picture of the author"
            />
            <span className="md:ml-0 ml-4 text-xl text-white">AutoParcel</span>
          </div>
        </div>
        <div className="hidden md:block text-sm text-white">
          Hi,User
        </div>
      </div>

      {/* Light Blue Section */}
      <div className="bg-[#00a0b4] p-4 flex justify-end h-[40px]">
        <div className="w-full md:w-auto flex gap-2 md:gap-5 text-xs md:text-sm justify-between items-center text-white">
          <Link href="/dashboard" className="hover:underline">Home</Link>
          <Link href="/dashboard/parceladder" className="hover:underline">Add Parcel</Link>
          <Link href="/dashboard/parcels" className="hover:underline">Parcels</Link>
          <Link href="/dashboard/statistics" className="hover:underline">Statistics</Link>
          <Link href="/dashboard/about" className="hover:underline">About Us</Link>
          <SideNav />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
