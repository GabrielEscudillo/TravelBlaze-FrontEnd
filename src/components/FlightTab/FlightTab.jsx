import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../Services/apiCalls";

export const FlightTab = () => {
  const [bookingInfo, setBookingInfo] = useState({
    date_of_purchase: "",
    price: "",
    user_id: "",
    airline: "",
    flight_number: "",
    departure: "",
    destination: "",
    date_of_departure: "",
    date_of_return: "",
  });

  const inputHandler = (event) => {
    setBookingInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createBooking(bookingInfo);
      navigate("/profile");
    } catch (error) {
      console.error("Error while creating booking:", error);
    }
  };
  console.log(event.target.value);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUserId">
        <Form.Label>User ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter User ID"
          name="user_id"
          value={bookingInfo.user_id}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group controlId="formDateOfPurchase">
        <Form.Label>Date of Purchase</Form.Label>
        <Form.Control
          type="date"
          name="date_of_purchase"
          value={bookingInfo.date_of_purchase}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Price"
          name="price"
          value={bookingInfo.price}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group controlId="formDate_of_departure">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter Price"
          name="date_of_departure"
          value={bookingInfo.date_of_departure}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group controlId="formDate_of_return">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter Price"
          name="date_of_return"
          value={bookingInfo.date_of_return}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group controlId="formAirline">
        <Form.Label>Airline</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Airline"
          name="airline"
          value={bookingInfo.airline}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group controlId="formFlightNumber">
        <Form.Label>Flight Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Flight Number"
          name="flight_number"
          value={bookingInfo.flight_number}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group controlId="formDeparture">
        <Form.Label>Departure</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Departure"
          name="departure"
          value={bookingInfo.departure}
          onChange={inputHandler}
        />
      </Form.Group>
      <Form.Group controlId="formDestination">
        <Form.Label>Destination</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Destination"
          name="destination"
          value={bookingInfo.destination}
          onChange={inputHandler}
        />
      </Form.Group>
      // Agrega más inputs aquí según sea necesario
      <Button variant="primary" type="submit" className="create-booking-btn">
        Crear Booking
      </Button>
    </Form>
  );
};
