"use client";
import React, { useEffect, useState } from "react";
import { GetARoom } from "./AdminController";
import BookingDetails from "./BookingDetails";

function SingleRoomDisplay({ roomId }: any) {
  const initialValues = {
    roomName: "",
    _id: "",
    image: "",
    price: 0,
    features: []
  };
  const [roomDetails, setRoomDetails] = useState(initialValues);
  useEffect(() => {
    const getRoom = async () => {
      const { selectedRoom } = await GetARoom(roomId);
      setRoomDetails(selectedRoom);
    };
    getRoom();
  }, [roomId]);
  return (
    <div className="p-5 lg:px-20">
      <div className="flex [&>*]:self-center sticky top-0 py-2 backdrop-blur-lg">
        <h1 className="font-semibold md:text-2xl text-xl">Hotel Site</h1>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="p-5">
          {/* Room Name  */}
          <h1 className="text-2xl lg:placeholder:text-3xl font-bold text-slate-700 pb-10">
            {roomDetails?.roomName} (₦{roomDetails.price} per night)
          </h1>
          <img
            className="w-full object-cover max-h-60 lg:max-h-72 lg:h-72 rounded-2xl"
            src={roomDetails.image}
            alt="Deluxe Image"
          />
          <div className="py-6">
            <h1 className="font-semibold bg-bgcolor p-2 text-xl lg:text-2xl text-slate-700">
              Features of the {roomDetails.roomName}
            </h1>
            <ul className="lg:text-lg py-5 flex flex-wrap lg:gap-8 gap-4 ">
              {roomDetails.features.map((feature, index) => (
                <li
                  key={index}
                  className="bg-slate-300 cursor-pointer hover:scale-110 px-6 rounded-full py-2 [&>*]:self-center"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <BookingDetails
          pricePerNight={roomDetails.price}
          id={roomDetails._id}
        />
      </div>
    </div>
  );
}

export default SingleRoomDisplay;
