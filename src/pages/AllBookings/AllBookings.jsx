import "./AllBookings.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllBookings, removeBooking } from "../../Services/apiCalls";
import { Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (bookings.length === 0) {
      bringAllBookings(token).then((res) => {
        setBookings(res.results);
      });
    }
  }, []);

  const removeButtonHandler = (id) => {
    removeBooking(token, id).then(() => {
      setBookings(bookings.filter((booking) => booking.id !== id));
    });
  };

  console.log(bookings);
  return (
<div className="container my-4"> {/* Agrega margen arriba y abajo */}
  <h2 className="text-center mb-4">My Bookings</h2>
  {bookings ? (
    bookings.length > 0 ? (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="col mb-3">
            <div className="card h-100" id="booking-card">
              <div className="card-body text-center">
                <h5 className="card-title mb-2">
                  Booking ID: {booking.id}
                </h5>
                <p className="card-text mb-2">
                  Date of Purchase: {booking.date_of_purchase}
                </p>
                <p className="card-text mb-2">Price: {booking.price}</p>
                <hr className="my-2" /> {/* Linea separadora */}
                <div className="row align-items-start mb-2">
                  <div className="col-6">
                    {booking.flight && (
                      <div>
                        <h6 className="card-subtitle mb-2">Flight Details</h6>
                        <p className="card-text mb-2">
                          Airline: {booking.flight.airline}
                        </p>
                        <p className="card-text mb-2">
                          Flight Number: {booking.flight.flight_number}
                        </p>
                        <p className="card-text mb-2">
                          Name: {booking.user.name}
                        </p>
                        <p className="card-text mb-2">
                          Last name: {booking.user.last_name}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="col-6">
                    {booking.hotel && (
                      <div>
                        <h6 className="card-subtitle mb-2">Hotel Details</h6>
                        <p className="card-text mb-2">
                          Hotel Name: {booking.hotel.hotel_name}
                        </p>
                        <p className="card-text mb-2">
                          Name: {booking.user.name}
                        </p>
                        <p className="card-text mb-2">
                          Last name: {booking.user.last_name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {booking.cruise && (
                  <div>
                    <h6 className="card-subtitle mb-2">Cruise Details</h6>
                    <p className="card-text mb-2">
                      Cabin: {booking.cruise.cabin}
                    </p>
                    <p className="card-text mb-2">
                      Route: {booking.cruise.route}
                    </p>
                  </div>
                )}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeButtonHandler(booking.id)}
                >
                  <FaTrash /> Delete
                </button>
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
