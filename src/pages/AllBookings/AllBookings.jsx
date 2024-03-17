import "./AllBookings.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { bringAllBookings, removeBooking } from "../../Services/apiCalls";
import { Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (bookings.length === 0) {
      bringAllBookings(token).then((res) => {
        setBookings(res.results);
        setTotalPages(Math.ceil(res.count / limit));
      });
    }
  }, []);

  const removeButtonHandler = (id) => {
    removeBooking(token, id).then(() => {
      setBookings(bookings.filter((booking) => booking.id !== id));
    });
  };

  const Next = () => {
    setPage(page + 1);
    bringAllBookings(token, page + 1, limit).then((res) => {
      setBookings(res.results);
    });
  }

  const Prev = () => {
    if (page > 1) {
      setPage(page - 1);
      bringAllBookings(token, page - 1, limit).then((res) => {
        setBookings(res.results);
      });
    }
  };
  return (
<div className="container my-4"> 
  <h2 className="text-center mb-4">All Bookings</h2>
  {bookings ? (
    bookings.length > 0 ? (
      <><div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
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
                    <hr className="my-2" /> 
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
                              Address: {booking.hotel.address}
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
                        <p className="card-text mb-2">
                          Name: {booking.user.name}
                        </p>
                        <p className="card-text mb-2">
                          Last Name {booking.user.last_name}
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
          </div><div className="d-flex justify-content-center mb-5">
              <Button variant="primary" disabled={page === 1} onClick={Prev}>
                Prev
              </Button>
              {page < totalPages && (
                <Button className="mx-2" variant="primary" onClick={Next}>
                  Next
                </Button>
              )}
            </div></>
    ) : (
      <p>No bookings found</p>
    )
  ) : (
    <p>Loading...</p>
  )}
</div>

  );
};
