import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createAppointment, bringAllAgents, bringAllServices } from "../../Services/apiCalls"; 
import { jwtDecode } from "jwt-decode";
import { userData } from "../../Pages/userSlice";

export const NewAppointment = ({ showModal, setShowModal }) => {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const today = new Date();
  const date = today.toISOString().split('T')[0];
  
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

  const navigate = useNavigate();

  const inputHandler = (event) => {
    setNewAppointment((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    if (
      !newAppointment.agent_id ||
      !newAppointment.service_id ||
      !newAppointment.date ||
      !newAppointment.time
    ) {
      setErrorMessage("Please fill out all fields.");
      return false;
    }
    return true;
  };

  const buttonHandler = () => {
    const token = userRdxData.credentials.token;
    if (!token) {
      navigate("/login");
      return;
    }
  
    if (!validateForm()) {
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
        setSuccessMessage("Appointment successfully created.");
        setTimeout(() => {
          setSuccessMessage(""); 
          setShowModal(false); 
          navigate("/profile");
        }, 1000);
  
        setNewAppointment({
          user_id: myId,
          agent_id: "",
          date: "",
          time: "",
          service_id: "",
        });
      })
      .catch((err) => {
        console.error("An error occurred", err);
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
                  {agent.name} - {agent.specialty}
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
              <option value="">Select a service</option>
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
              min={date}
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
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
