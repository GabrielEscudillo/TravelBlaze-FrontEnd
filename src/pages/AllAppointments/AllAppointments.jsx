import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import {
  DeleteAppointment,
  bringAllAppointments,
} from "../../Services/apiCalls";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./AllAppointments.css";
import { BsTrash } from "react-icons/bs"; 

export const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;

  useEffect(() => {
    if (appointments.length === 0) {
      bringAllAppointments(token)
        .then((res) => {
          setAppointments(res.results);
          setTotalPages(Math.ceil(res.count / limit));
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    }
  }, [appointments, token]);

  const removeButtonHandler = (id) => {
    DeleteAppointment(token, id).then(() => {
      setAppointments(
        appointments.filter((appointment) => appointment.id !== id)
      );
    });
  };

  const Next = () => {
    setPage(page + 1);
    bringAllAppointments(token, page + 1, limit).then((res) => {
      setAppointments(res.results);
    });
  }

  const Prev = () => {
    if (page > 1) {
      setPage(page - 1);
      bringAllAppointments(token, page - 1, limit).then((res) => {
        setAppointments(res.results);
      });
    }
  };

  return (
    <Container className="mb-5">
      <h1 className="text-center mt-4 mb-4">All Appointments</h1>
      <Row xs={1} md={2} lg={3} className="g-4 mb-4">
        {appointments && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Col key={appointment.id}>
              <Card className="appointment-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="mb-0">
                        Agent: {appointment.agent.user.name}
                      </h5>
                      <p className="text-muted">
                        Specialty: {appointment.agent.specialty}
                      </p>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeButtonHandler(appointment.id)}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                  <hr />
                  <div>
                    <p className="mb-1">
                      <strong>Service: </strong>{" "}
                      {appointment.service.service_name}
                    </p>
                    <p className="mb-1">
                      <strong>Date:</strong> {appointment.date}
                    </p>
                    <p className="mb-1">
                      <strong>Time:</strong> {appointment.time}
                    </p>
                    <p className="mb-0">
                      <strong>Customer:</strong> {appointment.user.name}{" "}
                      {appointment.user.last_name}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
          
        ) : (
          <Col>
            <p className="text-center">No appointments available.</p>
          </Col>
        )}
      </Row>
      <div className="d-flex justify-content-center mb-5">
            <Button variant="primary" disabled={page === 1} onClick={Prev}>
              Prev
            </Button>
            {page < totalPages && (
              <Button className="mx-2" variant="primary" onClick={Next}>
                Next
              </Button>
            )}
          </div>
    </Container>
  );
};
