"use client";
import React, { useEffect, useState } from "react";
import { GetRooms } from "./AdminController";
import { useRouter } from "next/navigation";
function ExploreRooms() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const handleRouting = async (roomId: string) => {
    router.push(`/rooms/${roomId}`);
  };
  useEffect(() => {
    const fetchDetails = async () => {
      const { roomDetails } = await GetRooms();
      setRooms(roomDetails);
    };
    fetchDetails();
  }, []);
  return (
    <div className="p-5 md:p-10 lg:px-20">
      <div className="flex [&>*]:self-center sticky top-0 py-2 backdrop-blur-lg">
        <h1 className="font-semibold md:text-2xl text-xl">Hotel Site</h1>
      </div>
      <h1 className="font-semibold md:text-2xl text-xl py-5 text-center">
        Explore Rooms
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
        {rooms?.map((room: any, index: number) => (
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            key={index}
            onClick={() => handleRouting(room._id)}
            className="space-y-4 shadow-2xl cursor-pointer hover:bg-slate-200 duration-300 hover:scale-110 shadow-slate-700 rounded-xl h-fit lg:h-full p-6"
          >
            <img
              src={room.image}
              className="rounded-2xl mx-auto self-center h-36 lg:h-48 xl:h-52 w-full"
              alt={room.roomName + "Image"}
            />
            <div className="space-y-4">
              <h3 className="text-center text-2xl font-semibold text-slate-700">
                {room.roomName}
              </h3>
              <h1 className="text-center text-lg lg:text-xl font-semibold">
                &#8358;{room.price}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExploreRooms;
