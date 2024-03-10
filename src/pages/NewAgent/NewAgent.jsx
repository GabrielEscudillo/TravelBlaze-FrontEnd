import React, { useState } from "react";
import "./NewAgent.css";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { agentSignUp } from "../../Services/apiCalls";

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
    <Container className="mt-5">
      <div id="signUpBox" className="bg-light p-4 rounded">
        <h1 className="mb-4">Register</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={agentSignUpData.name}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="last_name"
              value={agentSignUpData.last_name}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={agentSignUpData.address}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="formSpecialty">
            <Form.Label>Spectialty</Form.Label>
            <Form.Control
              type="text"
              placeholder="specialty"
              name="specialty"
              value={agentSignUpData.specialty}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={agentSignUpData.email}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={agentSignUpData.password}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              name="phone_number"
              value={agentSignUpData.phone_number}
              onChange={inputHandler}
            />
          </Form.Group>
          <Form.Group controlId="formphoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="link"
              placeholder="Enter your photo"
              name="photo"
              value={agentSignUpData.photo}
              onChange={inputHandler}
            />
          </Form.Group>
          {showError && ( // Muestra el mensaje de error solo cuando showError es true
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
            >
              Please fill in all fields
            </Alert>
          )}

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};
