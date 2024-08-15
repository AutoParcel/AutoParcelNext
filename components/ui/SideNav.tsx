import { signOut } from '@/auth';
 
export default function SideNav() {
  return (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className=" bg-gray-300 px-2 py-1 rounded-md font-semibold hover:bg-black hover:text-white">
          Sign Out
          </button>
        </form>
  );
}75