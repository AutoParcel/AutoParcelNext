import React from 'react';
import Link from "next/link";

const NotFound: React.FC = () => {
    return (
        <div className='flex flex-col justify-center items-center h-[100vh] w-full '>
            <div className='text-4xl mb-2'>Page Not Found</div>
            <div className='text-xl mb-10'>The page you are looking for does not exist.</div>
            <Link href="/dashboard" className='bg-primary_red text-white p-5 rounded-lg'>
                    Go to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;