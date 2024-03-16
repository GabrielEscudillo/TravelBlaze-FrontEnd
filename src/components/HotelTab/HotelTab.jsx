import { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../Services/apiCalls";
import {
  FaUser,
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarPlus,
  FaCalendarMinus,
} from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

export const HotelTab = () => {
  const [bookingInfo, setBookingInfo] = useState({
    date_of_purchase: "",
    price: "",
    user_id: "",
    hotel_name: "",
    address: "",
    guests: "",
    check_in_date: "",
    check_out_date: "",
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
      !bookingInfo.hotel_name ||
      !bookingInfo.address ||
      !bookingInfo.guests ||
      !bookingInfo.check_in_date ||
      !bookingInfo.check_out_date
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
              <FaUser /> User ID
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
              <FaCalendarAlt /> Date of Purchase
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
              <FaMoneyBillAlt /> Price
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
          <Form.Group controlId="formHotelName">
            <Form.Label>
              <FaHotel /> Hotel:
            </Form.Label>
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
      <Row>
        <Col md={6}>
          <Form.Group controlId="formAddress">
            <Form.Label>
              <FaMapMarkerAlt /> Address
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              name="address"
              value={bookingInfo.address}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formGuests">
            <Form.Label>
              <FaUsers /> Guests
            </Form.Label>
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
      <Row>
        <Col md={6}>
          <Form.Group controlId="formCheckInDate">
            <Form.Label>
              <FaCalendarPlus /> Check-in Date
            </Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter check in date"
              name="check_in_date"
              value={bookingInfo.check_in_date}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formCheckOutDate">
            <Form.Label>
              <FaCalendarMinus /> Check-out Date
            </Form.Label>
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
      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Please fill in all fields
        </Alert>
      )}
      <Button
        variant="primary"
        type="submit"
        className="create-booking-btn mt-3"
      ><BsArrowRight />
        Create booking
      </Button>
    </Form>
  );
};
