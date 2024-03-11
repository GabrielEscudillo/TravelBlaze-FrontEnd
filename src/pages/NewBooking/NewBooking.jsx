import React, { useState } from "react";
import { Form, Button, Col, Tab, Tabs, Container, Row } from "react-bootstrap";
import "./NewBooking.css";
import { createBooking } from "../../Services/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FlightTab } from "../../Components/FlightTab/FlightTab";
import { HotelTab } from "../../Components/HotelTab/HotelTab";

export const NewBooking = () => {
  const [bookingType, setBookingType] = useState(null);


  const handleBookingType = (type) => {
    setBookingType(type);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center h-100"
    >
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
                <Tab eventKey="flight" title="Flight">
                  <FlightTab />
                </Tab>
                <Tab eventKey="hotel" title="Hotel">
                <HotelTab />
                </Tab>
                <Tab eventKey="flightHotel" title="Flight + Hotel" />
                <Tab eventKey="cruise" title="Cruise" />
              </Tabs>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={14} className="booking-form"></Col>
        </Row>
      </div>
    </Container>
  );
};
