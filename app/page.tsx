import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-5 m-10">
      <Link href="/">Home</Link>
      <Link href="/parceladder">Add new parcel</Link>
      <Link href="/parcels">Parcels</Link>
      <Link href="/about">About Us</Link>
    </main>
  );
}
