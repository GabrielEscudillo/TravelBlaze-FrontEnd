import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringBookings } from "../../Services/apiCalls";
import "./Bookings.css";
import { FaPlane, FaHotel, FaShip } from "react-icons/fa";

export const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData?.userId;

  useEffect(() => {
    bringBookings(token, myId).then((res) => {
      setBookingData(res.results); 
    });
  }, [token, myId]);
  return (
    <div className="bookings-container text-center mt-3 mb-3 mx-4" >
      <h2 className="mb-4">My Bookings</h2>
      {bookingData ? (
        bookingData.length > 0 ? (
          <div className="row">
            {bookingData.map((booking) => (
              <div key={booking.id} className="col-lg-4 mb-4">
                <div className="card booking-card">
                  <div className="card-body">
                    <h4 className="card-title mb-1">
                      Booking ID: {booking.id}
                    </h4>
                    <p className="card-text mb-1">
                    <strong>Date of Purchase:</strong> {booking.date_of_purchase}
                    </p>
                    <p className="card-text mb-1"><strong>Price:</strong> {booking.price}</p>
                    <hr />
                    <div className="d-flex justify-content-between align-items-around">
                      {booking.flight && (
                        <div className="booking-details">
                          <h4>
                            <FaPlane /> Flight Details
                          </h4>
                          <p className="p-tight p-bold">Airline:</p>
                          <p className="p-tight">{booking.flight.airline}</p>
                          <p className="p-tight p-bold">Flight Number:</p>
                          <p className="p-tight">
                            {booking.flight.flight_number}
                          </p>
                          <p className="p-tight p-bold">From:</p>
                          <p className="p-tight">{booking.flight.departure}</p>
                          <p className="p-tight p-bold">To:</p>
                          <p className="p-tight">
                            {booking.flight.destination}
                          </p>
                          <p className="p-tight p-bold">Departure:</p>
                          <p className="p-tight">
                            {booking.flight.date_of_departure}
                          </p>
                          <p className="p-tight p-bold">Return:</p>
                          <p className="p-tight">
                            {booking.flight.date_of_return}
                          </p>
                        </div>
                      )}
                      {booking.hotel && (
                        <div className="booking-details">
                          <h4>
                            <FaHotel /> Hotel Details
                          </h4>
                          <p className="p-tight p-bold">Hotel:</p>
                          <p className="p-tight">{booking.hotel.hotel_name}</p>
                          <p className="p-tight p-bold">Address:</p>
                          <p className="p-tight">{booking.hotel.address}</p>
                          <p className="p-tight p-bold">Guests:</p>
                          <p className="p-tight">{booking.hotel.guests}</p>
                          <p className="p-tight p-bold">Check In:</p>
                          <p className="p-tight">
                            {booking.hotel.check_in_date}
                          </p>
                          <p className="p-tight p-bold">Check Out:</p>
                          <p className="p-tight">
                            {booking.hotel.check_out_date}
                          </p>
                        </div>
                      )}
                    </div>
                    {booking.cruise && (
                      <div className="booking-details">
                        <h4>
                          <FaShip /> Cruise Details
                        </h4>
                        <p>
                          <strong>Line:</strong> {booking.cruise.cruise_line}
                        </p>
                        <p>
                          <strong>Cabin:</strong> {booking.cruise.cabin}
                        </p>
                        <p>
                          <strong>Route:</strong> {booking.cruise.route}
                        </p>
                        <p>
                          <strong>Departure:</strong>{" "}
                          {booking.cruise.date_of_departure}
                        </p>
                        <p>
                          <strong>Return:</strong>{" "}
                          {booking.cruise.date_of_return}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
