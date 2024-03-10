import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringBookings } from "../../Services/apiCalls";
import "./Bookings.css";

export const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.userId;

  useEffect(() => {
    bringBookings(token, myId).then((res) => {
      setBookingData(res.results); // Guarda solo el array de reservas en bookingData
    });
  }, [token, myId]);


    return (
        <div className="bookings-container">
          <h2>My Bookings</h2>
          {bookingData ? (
            bookingData.length > 0 ? (
              <ul>
                {bookingData.map((booking) => (
                  <li key={booking.id}>
                    <h3>Booking ID: {booking.id}</h3>
                    <p>Date of Purchase: {booking.date_of_purchase}</p>
                    <p>Price: {booking.price}</p>
                    {booking.flight && (
                      <div className="booking-details">
                        <h4>Flight Details</h4>
                        <p>Airline: {booking.flight.airline}</p>
                        <p>Flight Number: {booking.flight.flight_number}</p>
                        {/* Include other flight details here */}
                      </div>
                    )}
                    {booking.hotel && (
                      <div className="booking-details">
                        <h4>Hotel Details</h4>
                        <p>Hotel Name: {booking.hotel.hotel_name}</p>
                        <p>Address: {booking.hotel.address}</p>
                        {/* Include other hotel details here */}
                      </div>
                    )}
                    {booking.cruise && (
                      <div className="booking-details">
                        <h4>Cruise Details</h4>
                        <p>Cabin: {booking.cruise.cabin}</p>
                        <p>Route: {booking.cruise.route}</p>
                        {/* Include other cruise details here */}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings found</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
      
  
};



