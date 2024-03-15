import React, { useState } from "react";
import "./NewAgent.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { agentSignUp } from "../../Services/apiCalls";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import {
  FaUser,
  FaUserAlt,
  FaMapMarkedAlt,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaImage,
} from "react-icons/fa";

export const NewAgent = () => {
  const [agentSignUpData, setAgentSignUpData] = useState({
    name: "",
    last_name: "",
    address: "",
    email: "",
    password: "",
    phone_number: "",
    photo: "",
    specialty: "",
  });
  const [showError, setShowError] = useState(false); // Nuevo estado para manejar el mensaje de error

  const inputHandler = (event) => {
    setAgentSignUpData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !agentSignUpData.name ||
      !agentSignUpData.last_name ||
      !agentSignUpData.address ||
      !agentSignUpData.email ||
      !agentSignUpData.password ||
      !agentSignUpData.phone_number ||
      !agentSignUpData.photo ||
      !agentSignUpData.specialty
    ) {
      setShowError(true); // muestra el mensaje de error
      return;
    }
    try {
      await agentSignUp(agentSignUpData);
      navigate("/users"); // navega a la página de perfil
    } catch (error) {
      console.error("Ha ocurrido un error", error);
    }
  };

  return (
    <Row id="newAgentBody" className="mx-0">
    <Col md={5} xs={10} className="mx-auto d-flex justify-content-center">
      <div className="text-center">
        <h1 className="mb-4 mt-4">Welcome!</h1>
        <p>Thank you for empowering our team with new talent.</p>
        <p>With each new agent, we unlock endless possibilities!</p>
        <img src="https://i.pinimg.com/564x/bb/29/ef/bb29ef294884854c2f8b72c902cae76d.jpg" alt="Superadmin" className="mt-3 img-fluid" style={{ maxWidth: '400px', width: '100%', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }} />
      </div>
    </Col>
    <Col md={5} xs={10} className="mx-auto d-flex justify-content-center">
      <div
        className="bg-light py-1 px-2 rounded form-container mt-4"
        style={{ maxWidth: "400px", margin: "20px auto" }}
      >
        <h1 className="mb-4">New Agent</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-1">
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label><FaUser /> Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={agentSignUpData.name}
                  onChange={inputHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName">
                <Form.Label><FaUserAlt /> Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={agentSignUpData.last_name}
                  onChange={inputHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formSpecialty">
                <Form.Label><FaMapMarkedAlt /> Specialty</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter specialty"
                  name="specialty"
                  value={agentSignUpData.specialty}
                  onChange={inputHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPhoto">
                <Form.Label><FaImage /> Photo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your photo URL"
                  name="photo"
                  value={agentSignUpData.photo}
                  onChange={inputHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="formAddress">
            <Form.Label><FaMapMarkedAlt /> Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={agentSignUpData.address}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label><FaEnvelope /> Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={agentSignUpData.email}
              onChange={inputHandler}
            />
          </Form.Group>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formPassword">
                <Form.Label><FaLock /> Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={agentSignUpData.password}
                  onChange={inputHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label><FaPhone /> Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone_number"
                  value={agentSignUpData.phone_number}
                  onChange={inputHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          {showError && (
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
              className="mt-3"
            >
              Please fill in all fields
            </Alert>
          )}
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Register
          </Button>
        </Form>
      </div>
    </Col>
  </Row>
  );
};
