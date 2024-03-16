import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { bringAgentAppointments } from "../../Services/apiCalls";
import { Container, Row, Col, Card } from "react-bootstrap";
import { userData } from "../userSlice";
import { FaCalendarAlt, FaClock, FaPhone, FaTools } from "react-icons/fa";

export const AgentAppointments = () => {
  const [myAppointments, setMyAppointments] = useState([]);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const id = userRdxData.credentials.userData.userId;

  useEffect(() => {
    if (myAppointments.length === 0) {
      bringAgentAppointments(token, id).then((myAppointments) => {
        setMyAppointments(myAppointments);
      });
    }
  }, [token, id]);

  return (
    <Container style={{ paddingBottom: "50px" }}>
      <h1 className="text-center mt-4 mb-4">My Appointments</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {myAppointments
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((appointment, index) => (
            <Col key={index} className="mb-3">
              <Card className="shadow-sm appointment-card">
                <Card.Body>
                  <Card.Title className="text-center fs-4">
                    {appointment.user.name} {appointment.user.last_name}
                  </Card.Title>
                  <hr className="custom-divider" />
                  <div className="text-center">
                    <p className="custom-text">
                      <FaCalendarAlt /> <strong>Date:</strong>{" "}
                      {appointment.date}
                    </p>
                    <p className="custom-text">
                      <FaClock /> <strong>Time:</strong> {appointment.time}
                    </p>
                    <p className="custom-text">
                      <FaPhone /> <strong>Contact:</strong>{" "}
                      {appointment.user.phone_number}
                    </p>
                    <p className="custom-text">
                      <FaTools /> <strong>Service:</strong>{" "}
                      {appointment.service.service_name}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};
