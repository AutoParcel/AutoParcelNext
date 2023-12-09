import React from "react";
import { FaShieldCat } from "react-icons/fa6";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-2/3 mb-4 md:mb-0 md:pr-4">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            AutoParcel is your one-stop shop for all your car shipping needs.
          </p>
        </div>

        <div className="w-full md:w-1/3 image-container flex items-end justify-end">
          <FaShieldCat className="w-full h-48 md:h-64 lg:h-96 fill-primary_black" />
        </div>
      </div>
    </main>
  );
}
