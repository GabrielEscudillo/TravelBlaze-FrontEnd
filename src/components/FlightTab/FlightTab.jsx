import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../Services/apiCalls";
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { BsFillPersonFill, BsCalendar, BsCurrencyDollar, BsArrowRight, BsFillAirplaneFill, BsFillMapFill, BsFillPinMapFill, BsBoxArrowInUpRight } from 'react-icons/bs';
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

  const [showError, setShowError] = useState(false);

  const inputHandler = (event) => {
    setBookingInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !bookingInfo.date_of_purchase ||
      !bookingInfo.price ||
      !bookingInfo.user_id ||
      !bookingInfo.airline ||
      !bookingInfo.flight_number ||
      !bookingInfo.departure ||
      !bookingInfo.destination ||
      !bookingInfo.date_of_departure ||
      !bookingInfo.date_of_return
    ) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 600); // muestra el mensaje d error
      return;
    }
    try {
      await createBooking(bookingInfo);
      navigate("/profile");
    } catch (error) {
      console.error("Error while creating booking:", error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formUserId">
            <Form.Label>
              <BsFillPersonFill /> User ID
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User ID"
              name="user_id"
              value={bookingInfo.user_id}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formDateOfPurchase">
            <Form.Label>
              <BsCalendar /> Date of Purchase
            </Form.Label>
            <Form.Control
              type="date"
              name="date_of_purchase"
              value={bookingInfo.date_of_purchase}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formPrice">
            <Form.Label>
              <BsCurrencyDollar /> Price
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              name="price"
              value={bookingInfo.price}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formAirline">
            <Form.Label>
            <BsFillAirplaneFill /> Airline
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Airline"
              name="airline"
              value={bookingInfo.airline}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>

      </Row>
      <Row>
      <Col md={6}>
          <Form.Group controlId="formDate_of_departure">
            <Form.Label>
              <BsCalendar /> Date of departure
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of departure"
              name="date_of_departure"
              value={bookingInfo.date_of_departure}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formDate_of_return">
            <Form.Label>
              <BsCalendar /> Date of return
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of return"
              name="date_of_return"
              value={bookingInfo.date_of_return}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>

      </Row>
      <Row>

        <Col md={6}>
          <Form.Group controlId="formDeparture">
            <Form.Label>
            <BsBoxArrowInUpRight /> Departure
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Departure"
              name="departure"
              value={bookingInfo.departure}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
                <Col md={6}>
          <Form.Group controlId="formDestination">
            <Form.Label>
            <BsFillPinMapFill /> Destination
            </Form.Label>
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
      <Row>
      <Col md={6}>
          <Form.Group controlId="formFlightNumber">
            <Form.Label>
            <BsFillAirplaneFill /> Flight Number            </Form.Label>
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
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Please fill in all fields
        </Alert>
      )}
<Button variant="primary" type="submit" className="create-booking-btn mt-3">
        <BsArrowRight /> Crear Booking
      </Button>
    </Form>
  );
};
