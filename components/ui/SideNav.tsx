import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className=" bg-[#e7af69] px-3 py-2 rounded-md font-semibold hover:bg-amber-500">
          Sign Out
          </button>
        </form>
  );
}75