import Link from "next/link";
import React from "react";

function LandingPage() {
  return (
    <div className="relative min-h-screen px-8 md:px-20">
      <div className="flex [&>*]:self-center py-6 justify-between gap-10">
        <h1 className="font-semibold md:text-2xl text-lg">Hotel Site</h1>
        <div className="flex  gap-3 md:gap-7 [&>*]:self-center">
          <Link
            href="/auth"
            className="border-2 cursor-pointer flex [&>*]:self-center gap-2 border-[#71717A] rounded-md py-1 px-4 md:px-6"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-blue-500 cursor-pointer text-white rounded-md py-2 px-4 md:px-6"
          >
            Register
          </Link>
        </div>
      </div>
      <div className="text-center flex flex-col py-20 md:py-40 mx-auto md:w-10/12 justify-center gap-5">
        <h1 className="font-semibold text-3xl leading-[2.5rem]  md:text-4xl md:leading-[3.5rem]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit Neque qua.
        </h1>

        <Link
          href="/auth"
          className="text-lg bg-blue-500 w-fit self-center gap-2 text-white rounded-md py-2 md:py-3 px-8"
        >
          Explore &gt;&gt;
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
