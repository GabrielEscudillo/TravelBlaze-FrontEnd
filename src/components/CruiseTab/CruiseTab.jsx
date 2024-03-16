import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCruise } from "../../Services/apiCalls";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillAlt, FaShip, FaStar, FaUser } from "react-icons/fa";
import { BsCalendar } from "react-icons/bs";

export const CruiseTab = () => {
  const [bookingInfo, setBookingInfo] = useState({
    date_of_purchase: "",
    price: "",
    user_id: "",
    cruise_line: "",
    cabin: "",
    route: "",
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
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !bookingInfo.date_of_purchase ||
      !bookingInfo.price ||
      !bookingInfo.user_id ||
      !bookingInfo.cruise_line ||
      !bookingInfo.cabin ||
      !bookingInfo.route ||
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
      await createCruise(bookingInfo);
      navigate("/profile");
    } catch (error) {
      console.error("Error while creating booking:", error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-1">
        <Col md={6}>
          <Form.Group controlId="formUserId">
            <Form.Label><FaUser /> User ID</Form.Label>
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
            <Form.Label><FaCalendarAlt /> Date of Purchase</Form.Label>
            <Form.Control
              type="date"
              name="date_of_purchase"
              value={bookingInfo.date_of_purchase}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col md={6}>
          <Form.Group controlId="formPrice">
            <Form.Label><FaMoneyBillAlt /> Price</Form.Label>
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
          <Form.Group controlId="formCruiseLine">
            <Form.Label><FaShip />Cruise Line</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter cruise line"
              name="cruise_line"
              value={bookingInfo.hotel_name}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col md={6}>
          <Form.Group controlId="formcabin">
            <Form.Label><FaStar /> Cabin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter cabin"
              name="cabin"
              value={bookingInfo.cabin}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formroute">
            <Form.Label><FaMapMarkerAlt />Route</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter route"
              name="route"
              value={bookingInfo.route}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col md={6}>
          <Form.Group controlId="formDateOfDeparture">
            <Form.Label><BsCalendar /> Date of departure</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter check in date"
              name="date_of_departure"
              value={bookingInfo.date_of_departure}
              onChange={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formDateOfRreturn">
            <Form.Label><BsCalendar /> Date Of Return</Form.Label>
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

      {showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          Please fill in all fields
        </Alert>
      )}

      <Button variant="primary" type="submit" className="create-booking-btn mt-3">
        Crear Booking
      </Button>
    </Form>
  );
};
