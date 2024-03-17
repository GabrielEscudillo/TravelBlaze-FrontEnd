import React, { useState } from "react";
import { Col, Tab, Tabs, Container, Row } from "react-bootstrap";
import "./NewBooking.css";
import { FlightTab } from "../../Components/FlightTab/FlightTab";
import { HotelTab } from "../../Components/HotelTab/HotelTab";
import { FlightAndHotelTab } from "../../Components/FlightAndHotelTab/FlightAndHotelTab";
import { CruiseTab } from "../../Components/CruiseTab/CruiseTab";

export const NewBooking = () => {
  const [bookingType, setBookingType] = useState(null);

  const handleBookingType = (type) => {
    setBookingType(type);
  };

  return (
<Container
  fluid
  className="d-flex flex-column flex-md-row justify-content-center align-items-center h-100"
>
      <div className="left-content d-flex flex-column justify-content-center align-items-center order-1 order-md-2">
        <img
          src="https://i.pinimg.com/originals/f7/0b/18/f70b1806d7128b4843d81a5a62bb3b07.gif"
          alt="Travel Image"
          className="mt-3 img-fluid"
          style={{
            maxWidth: "400px",
            width: "100%",
            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
        />
        <div className="text-center mt-4">
          <h2>Welcome, Agent!</h2>
          <p>Get ready to create amazing journeys for your clients.</p>
        </div>
      </div>

      <div className="booking-container d-flex flex-column align-items-center order-2 order-md-1 w-100 w-lg-90">
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
                <Tab eventKey="flightHotel" title="Flight + Hotel">
                  <FlightAndHotelTab />
                </Tab>
                <Tab eventKey="cruise" title="Cruise">
                  <CruiseTab />
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={14} className="booking-form">
          </Col>
        </Row>
      </div>
    </Container>
  );
};
