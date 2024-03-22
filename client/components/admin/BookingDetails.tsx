"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function BookingDetails(props: { pricePerNight: number; id: string }) {
  const router = useRouter();
  const setDateSyntax = (date: any) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var exactDate = date.getDate();
    month < 10 ? (month = `0${month}`) : month;
    exactDate < 10 ? (exactDate = `0${exactDate}`) : exactDate;
    return `${year}-${month}-${exactDate}`;
  };

  var todaysDate = new Date();
  const [arrivalDate, setArrivalDate] = useState<any>(
    setDateSyntax(todaysDate)
  );
  const [departureDate, setDepartureDate] = useState<any>(null);
  const [guestNumber, setGuestNumber] = useState<any>("1");
  const [minimumArrivalDate, setMinimumArrivalDate] = useState("");
  const [minimumDepartureDate, setMinimumDepartureDate] = useState("");
  const [latestPrice, setLatestPrice] = useState(props.pricePerNight);
  //minimum arrival
  const setMinArrDate = () => {
    var todaysDate = new Date();
    setMinimumArrivalDate(setDateSyntax(todaysDate));
    const [year, month, day] = arrivalDate.split("-").map(Number);
    // Create a new Date object using the components
    const currentArrDate = new Date(year, month - 1, day);
    // console.log(minArrDate);
    currentArrDate.setDate(currentArrDate.getDate() + 1);
    setMinimumDepartureDate(setDateSyntax(currentArrDate));
  };

  // Changing Price irrespective to date
  function priceCheck() {
    var start = new Date(arrivalDate);
    var finish = new Date(departureDate);
    // To calculate the time difference of two dates
    var Difference_In_Time = finish.getTime() - start.getTime();
    // To calculate the no. of days between two dates
    var diff = Difference_In_Time / (1000 * 3600 * 24);
    setLatestPrice(props.pricePerNight * diff);
    setMinArrDate();
  }
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      Cookies.set(
        "booking-details",
        JSON.stringify({
          roomId: props.id,
          arrivalDate,
          price: latestPrice,
          departureDate,
          guestNumber
        })
      );
      router.push(`/rooms/${props.id}/confirm-booking`);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setMinArrDate();
  }, []);
  useEffect(() => {
    priceCheck();
  }, [arrivalDate, departureDate]);

  return (
    <div className="p-5">
      <h1 className="text-2xl lg:text-3xl text-end font-semibold">
        Booking Details
      </h1>
      <b className="text-green-500">Room is Available</b>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 py-5">
        <div className="flex flex-col gap-2">
          <label className="lg:text-lg">Arrival Date</label>
          <input
            type="date"
            required
            className="p-2 lg:p-4 rounded-lg"
            min={minimumArrivalDate}
            value={arrivalDate}
            onChange={(e) => {
              setArrivalDate(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lg:text-lg">Departure Date</label>
          <input
            required
            type="date"
            className="p-2 lg:p-4 rounded-lg"
            min={minimumDepartureDate}
            value={departureDate}
            onChange={(e) => {
              setDepartureDate(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="lg:text-lg">Number of Guests</label>
          <select
            className="p-2 lg:p-4 rounded-lg"
            value={guestNumber}
            onChange={(e) => {
              setGuestNumber(e.target.value);
            }}
          >
            <option disabled>Number of Guests</option>
            <option value="1">Just You</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
          </select>
        </div>
        <div className="mx-auto w-11/12 flex justify-between">
          <h1 className="text-2xl font-semibold">Total</h1>
          <h1 className="text-2xl font-semibold">₦{latestPrice}</h1>
        </div>
        <button
          type="submit"
          className="bg-slate-700 hover:bg-slate-700/70 rounded-md text-white lg:py-5 lg:text-lg py-3 mx-auto w-11/12 "
        >
          Book Room
        </button>
      </form>
    </div>
  );
}

export default BookingDetails;
