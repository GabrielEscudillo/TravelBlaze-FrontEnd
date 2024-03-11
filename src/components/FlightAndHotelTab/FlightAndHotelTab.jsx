import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../Services/apiCalls";

export const FlightAndHotelTab = () => {
  const [bookingInfo, setBookingInfo] = useState({
    date_of_purchase: "",
    price: "",
    user_id: "",
    hotel_name: "",
    address: "",
    guests: "",
    check_in_date: "",
    check_out_date: "",
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
      <Row className="mb-3">
        <Col xs={12} sm={6}>
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
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group controlId="formDateOfPurchase">
            <Form.Label>Date of Purchase</Form.Label>
            <Form.Control
              type="date"
              name="date_of_purchase"
              value={bookingInfo.date_of_purchase}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
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
        </Col>
        <Col>
          <Form.Group controlId="formHotelName">
            <Form.Label>Hotel:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter hotel name"
              name="hotel_name"
              value={bookingInfo.hotel_name}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              name="address"
              value={bookingInfo.address}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formGuests">
            <Form.Label>Guests</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Guests"
              name="guests"
              value={bookingInfo.guests}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formCheckInDate">
            <Form.Label>Check-in Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter check in date"
              name="check_in_date"
              value={bookingInfo.check_in_date}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formCheckOutDate">
            <Form.Label>Check-out Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Check-out date"
              name="check_out_date"
              value={bookingInfo.check_out_date}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
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
        </Col>
        <Col>
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
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
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
        </Col>
        <Col>
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
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formDate_of_departure">
            <Form.Label>Date of Departure</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date of Departure"
              name="date_of_departure"
              value={bookingInfo.date_of_departure}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formDate_of_return">
            <Form.Label>Date of Return</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date of Return"
              name="date_of_return"
              value={bookingInfo.date_of_return}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit" className="create-booking-btn">
        Crear Booking
      </Button>
    </Form>
  );
};
