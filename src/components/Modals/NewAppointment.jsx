import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment, bringAllAgents, bringAllServices } from "../../Services/apiCalls"; 
import { jwtDecode } from "jwt-decode";
import { userData } from "../../Pages/userSlice";

export const NuevaCITA = ({ showModal, setShowModal }) => {
  const userRdxData = useSelector(userData);
  const myId = userRdxData.credentials.userData.userId;
  const [newAppointment, setNewAppointment] = useState({
    user_id: myId,
    agent_id: "",
    date: "",
    time: "",
    service_id: "",
  });
  const [agents, setAgents] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    if (agents.length === 0) {
      bringAllAgents().then((arts) => {
        setAgents(arts);
      });
    }

    if (services.length === 0) {
      bringAllServices().then((serv) => {
        setServices(serv);
      });
    }

  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  console.log(event.target.value)

  const buttonHandler = () => {
    const token = userRdxData.credentials.token;
    if (!token) {
      navigate("/login");
      return;
    }

    createAppointment(token, newAppointment)
      .then((res) => {
        console.log(res);
        const decodedToken = jwtDecode(token);
        const data = {
          token: token,
          userData: decodedToken,
        };
        setTimeout(() => {
          navigate("/profile");
        });
      })
      .catch((err) => {
        console.error("Ha ocurrido un error", err);
      });
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Make an Appointment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="agent_id">
            <Form.Label>Select your agent:</Form.Label>
            <Form.Control
              as="select"
              name="agent_id"
              value={newAppointment.agent_id}
              onChange={inputHandler}
            >
              <option value="">Select an agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="service">
            <Form.Label>Select service:</Form.Label>
            <Form.Control
              as="select"
              name="service_id"
              value={newAppointment.service_id}
              onChange={inputHandler}
            >
              <option value="">Select an agent</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.service_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={newAppointment.date}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="time">
            <Form.Label>Time:</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={newAppointment.time}
              onChange={inputHandler}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={buttonHandler}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

