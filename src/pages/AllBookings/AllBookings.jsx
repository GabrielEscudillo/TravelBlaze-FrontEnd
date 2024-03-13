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
          <div className="card-container">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title className="mb-2">Booking ID: {booking.id}</Card.Title>
                    <Card.Text className="mb-2">Date of Purchase: {booking.date_of_purchase}</Card.Text>
                    <Card.Text className="mb-2">Price: {booking.price}</Card.Text>
                    {booking.flight && (
                      <div>
                        <h4 className="mb-2">Flight Details</h4>
                        <Card.Text className="mb-2">Airline: {booking.flight.airline}</Card.Text>
                        <Card.Text className="mb-2">Flight Number: {booking.flight.flight_number}</Card.Text>
                        <Card.Text className="mb-2">Name: {booking.user.name}</Card.Text>
                        <Card.Text className="mb-2">Last name: {booking.user.last_name}</Card.Text>
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
                      <div>
                        <h4 className="mb-2">Hotel Details</h4>
                        <Card.Text className="mb-2">Hotel Name: {booking.hotel.hotel_name}</Card.Text>
                        <Card.Text className="mb-2">Name: {booking.user.name}</Card.Text>
                        <Card.Text className="mb-2">Last name: {booking.user.last_name}</Card.Text>
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
                      <div>
                        <h4 className="mb-2">Cruise Details</h4>
                        <Card.Text className="mb-2">Cabin: {booking.cruise.cabin}</Card.Text>
                        <Card.Text className="mb-2">Route: {booking.cruise.route}</Card.Text>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeButtonHandler(booking.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
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
