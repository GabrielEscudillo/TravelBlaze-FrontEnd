import "./AllBookings.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllBookings, removeBooking } from "../../Services/apiCalls";
import { Button, Card } from "react-bootstrap";


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
  <div className="bookings-container">
  <h2>My Bookings</h2>
  {bookings ? (
    bookings.length > 0 ? (
      <ul>
        {bookings.map((booking) => (
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
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeButtonHandler(booking.id)}
                  >
                    Delete
                  </Button>
              </div>
            )}
            {booking.hotel && (
              <div className="booking-details">
                <h4>Hotel Details</h4>
                <p>Hotel Name: {booking.hotel.hotel_name}</p>
                <p>Address: {booking.hotel.address}</p>
                {/* Include other hotel details here */}
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeButtonHandler(booking.id)}
                  >
                    Delete
                  </Button>
              </div>
            )}
            {booking.cruise && (
              <div className="booking-details">
                <h4>Cruise Details</h4>
                <p>Cabin: {booking.cruise.cabin}</p>
                <p>Route: {booking.cruise.route}</p>
                {/* Include other cruise details here */}
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeButtonHandler(booking.id)}
                  >
                    Delete
                  </Button>
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
