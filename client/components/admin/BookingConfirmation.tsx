"use client";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { GetARoom } from "./AdminController";
import moment from "moment";
import { GetContactDetails, getId } from "../auth/AuthController";
import axios from "axios";

function BookingConfirmation() {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [roomName, setRoomName] = useState("");
  const [contactDetails, setContactDetails] = useState<any>(null);
  var token = Cookies.get("token");

  async function payWithPaystack(e: { preventDefault: () => void }) {
    e.preventDefault();
    try {
      const PAYSTACK_API_KEY =
        "pk_test_c3c92ed8d034efde8ef609b5b649b38d7737ff3a";
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email: contactDetails.email,
          amount: bookingDetails.price
        },
        { 
          headers: {
            Authorization: `Bearer ${PAYSTACK_API_KEY}`
          }
        }
      );

      const responseData = response.data;

      // Redirect user to Paystack's payment page
      window.location.href = responseData.data.authorization_url;
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
    // let handler = PaystackPop.setup({
    //   key: "pk_test_c3c92ed8d034efde8ef609b5b649b38d7737ff3a", // Replace with your public key
    //   email: contactDetails.email,
    //   amount: bookingDetails.price * 100,
    //   ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    //   // label: "Optional string that replaces customer email"
    //   onClose: function () {
    //     alert("Window closed.");
    //   },
    //   callback: function (response: { reference: string }) {
    //     let message = "Payment complete! Reference: " + response.reference;
    //     alert(message);
    //   }
    // });

    // handler.openIframe();
  }

  useEffect(() => {
    var details = Cookies.get("booking-details");
    details
      ? setBookingDetails(JSON.parse(details))
      : setBookingDetails(details);
  }, []);
  useEffect(() => {
    const fetchDetails = async () => {
      if (bookingDetails) {
        const { selectedRoom } = await GetARoom(bookingDetails?.roomId);
        setRoomName(selectedRoom.roomName);
        if (token) {
          const { id } = await getId(JSON.parse(token));
          console.log(id);
          const { contactDetails } = await GetContactDetails(id);
          console.log(contactDetails);
          contactDetails
            ? setContactDetails(contactDetails)
            : setContactDetails(contactDetails);
        }
      }
    };
    fetchDetails();
  }, [bookingDetails, token]);

  return (
    <div className="p-5 lg:px-20">
      <div className="flex [&>*]:self-center sticky top-0 py-2 backdrop-blur-lg">
        <h1 className="font-semibold lg:text-2xl text-lg">Hotel Site</h1>
      </div>
      <h1 className="font-semibold text-lg lg:text-2xl text-center">
        Confirm Booking
      </h1>
      <main className="mt-6 lg:w-2/3 mx-auto lg:px-8 px-2 py-4 rounded-xl  border-2 border-gray-500 lg:space-y-3">
        <div className="pb-3 flex flex-row justify-between px-3">
          <span className="lg:text-lg text-md">Name</span>
          <span className="text-lg lg:text-xl">{contactDetails?.username}</span>
        </div>

        <div className="pb-3 flex flex-row justify-between px-3">
          <span className="text-md lg:text-lg">Email address:</span>
          <span className="text-lg lg:text-xl">{contactDetails?.email}</span>
        </div>

        <div className="pb-3 flex flex-row justify-between px-3">
          <span className="text-md lg:text-lg">Room Name</span>
          <span className="text-lg lg:text-xl">{roomName}</span>
        </div>

        <div className="pb-3 flex flex-row justify-between px-3">
          <span className="lg:text-lg">Date of arrival</span>
          <span className="text-lg lg:text-xl">
            {moment(bookingDetails?.arrivalDate).format("dddd DD MMM YYYY ")}
          </span>
        </div>

        <div className="pb-3 flex flex-row justify-between px-3">
          <span className="lg:text-lg">Date of departure</span>
          <span className="text-lg lg:text-xl">
            {moment(bookingDetails?.departureDate).format("dddd DD MMM YYYY ")}
          </span>
        </div>
        <div className="pb-3 flex flex-row justify-between px-3">
          <span className="lg:text-lg">Number of guest</span>
          <span className="text-lg lg:text-xl">
            {bookingDetails?.guestNumber}
          </span>
        </div>

        <div className="mx-auto w-11/12 py-4 flex justify-between">
          <h1 className="text-2xl font-semibold">Total</h1>
          <h1 className="text-2xl font-semibold">₦{bookingDetails?.price}</h1>
        </div>
        <div className="flex justify-center">
          <button
            onClick={payWithPaystack}
            className="bg-slate-700 hover:bg-slate-700/80 rounded-md mx-auto w-10/12 p-3 lg:py-4 text-white"
          >
            Make Payment
          </button>
        </div>
      </main>
    </div>
  );
}

export default BookingConfirmation;
