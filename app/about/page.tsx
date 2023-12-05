import React from "react";
import { FaShieldCat } from "react-icons/fa6";
export default function About() {
  return (
    <main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-between p-24">
      <div className="container mx-auto p-8 flex justify-between items-start">
        <div className="w-2/3">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            {
              " AutoParcel is your one-stop shop for all your car shipping needs. We offer a variety of shipping options to fit your budget and time constraints, and we make the process of shipping your car as easy as possible. We'll pick up your car from your driveway and deliver it to your destination safely and securely. You can track your car's progress every step of the way, and we'll keep you updated on any changes.AutoParcel is your one-stop shop for all your car shipping needs. We offer a variety of shipping options to fit your budget and time constraints, and we make the process of shipping your car as easy as possible. We'll pick up your car from your driveway and deliver it to your destination safely and securely. You can track your car's progress every step of the way, and we'll keep you updated on any changes.AutoParcel is your one-stop shop for all your car shipping needs. We offer a variety of shipping options to fit your budget and time constraints, and we make the process of shipping your car as easy as possible. We'll pick up your car from your driveway and deliver it to your destination safely and securely. You can track your car's progress every step of the way, and we'll keep you updated on any changes."
            }
          </p>
        </div>

        <div className="w-1/3 image-container flex items-end justify-end">
          <FaShieldCat className="w-96 h-96 fill-primary_black" />
        </div>
      </div>
    </main>
  );
}
