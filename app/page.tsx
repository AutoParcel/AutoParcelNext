"use client"
import { useRouter } from "next/navigation";
const Page = () => {
    // Your code here
    const router = useRouter();
    router.push("/dashboard");
    return (
        <>
        </>
    );
};

export default Page;