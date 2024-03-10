import React, { useState } from "react";
import { Form, Button, Col, Tab, Tabs, Container, Row } from "react-bootstrap";
import "./NewBooking.css";
import { createBooking } from "../../Services/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NewBooking = () => {
  const [bookingType, setBookingType] = useState(null);
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
    hotel_name: "",
    address: "",
    guests: "",
    check_in_date: "",
    check_out_date: "",
  });

  const [flight, setFlight] = useState(null);
  const [hotel, setHotel] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();


console.log(event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
await createBooking(bookingInfo);
        navigate("/profile");
    } catch (error) {
      console.error("Error while creating booking:", error);
    }
  };

  const inputHandler = (event) => {
    setBookingInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
//   console.log(event.target.value);

  const handleBookingType = (type) => {
    setBookingType(type);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center h-100">
      <div className="booking-container d-flex flex-column align-items-center">
        <h2>New Booking</h2>
        <Row className="justify-content-center">
          <Col md={12}>
            <div className="text-center mb-3">
              <Tabs
                id="booking-type-tabs"
                className="justify-content-center"
                onSelect={(type) => handleBookingType(type)}
              >
                <Tab eventKey="flight" title="Flight" />
                <Tab eventKey="hotel" title="Hotel" />
                <Tab eventKey="flightHotel" title="Flight + Hotel" />
                <Tab eventKey="cruise" title="Cruise" />
              </Tabs>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={14} className="booking-form">
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

              {bookingType === "flight" && (
                <>
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
                </>
              )}

              {bookingType === "hotel" && (
                <>
                  <Form.Group controlId="formHotelName">
                    <Form.Label>Hotel Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Hotel Name"
                      name="hotel_name"
                      value={bookingInfo.hotel_name}
                      onChange={inputHandler}
                    />
                  </Form.Group>

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

                  <Form.Group controlId="formGuests">
                    <Form.Label>Guests</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Guests"
                      name="guests"
                      value={bookingInfo.guests}
                      onChange={inputHandler}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCheckInDate">
                    <Form.Label>Check-in Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="check_in_date"
                      value={bookingInfo.check_in_date}
                      onChange={inputHandler}
                    />
                  </Form.Group>

                  <Form.Group controlId="formCheckOutDate">
                    <Form.Label>Check-out Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="check_out_date"
                      value={bookingInfo.check_out_date}
                      onChange={inputHandler}
                    />
                  </Form.Group>
                </>
              )}

              <Button
                variant="primary"
                type="submit"
                className="create-booking-btn"
              >
                Crear Booking
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>);
};
