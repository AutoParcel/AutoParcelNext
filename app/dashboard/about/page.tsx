import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-between p-4 md:p-8 lg:p-12">
      <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row justify-between items-start">
        {/* Left side content */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-8">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 mb-4">
            AutoParcel was born out of necessity during our ILGC project in the
            second year of college. As a team of five innovative students, we
            recognized the inefficiencies and challenges that guards and
            residents faced in managing parcels manually. The cumbersome process
            of log entries, the risk of misplacement, and the overall lack of
            security in traditional systems inspired us to create a solution
            that could streamline and secure the entire parcel management
            process.
          </p>
          <p className="text-gray-700 mb-4">
            With this in mind, we developed AutoParcel—your one-stop solution for
            all parcel management needs. Our platform not only reduces the
            burden on security personnel but also ensures that every package is
            accounted for and delivered to the right person.
          </p>
          <p className="text-gray-700 mb-4">
            We believe in making life easier, one parcel at a time.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Meet the Team</strong>
          </p>
          <p className="text-gray-700">
            Starting from the left, we are Amog, Jiya, Abhinav, Nandini, and
            Manan. Together, we bring diverse skills and a shared vision to
            revolutionize parcel management.
          </p>
        </div>

        {/* Right side image */}
        <div className="relative w-full md:w-1/2 h-[300px] md:h-[550px]">
          <Image
            src="/team_photo.png"
            fill
            className="object-cover object-bottom"
            alt="Team Photo"
          />
        </div>
      </div>
    </main>
  );
}
