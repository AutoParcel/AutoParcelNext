import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex justify-between w-full">
        <div className="text-center p-40 w-1/2">
          <Link href="/parcels">Parcel List</Link>
        </div>
        <div className="text-center p-40 w-1/2">
          <Link href="/parceladder">Add Parcel</Link>
        </div>
      </div>
      <div className="text-center p-20 mt-10">
        <Link href="/about">About Us</Link>
      </div>
    </main>
  );
}


