import React, { useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userSignUp, userLogin } from "../../Services/apiCalls";
import "./Register.css";

export const Register = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    last_name: "",
    address: "",
    email: "",
    password: "",
    phone_number: "",
  });
  const [showError, setShowError] = useState(false);

  const inputHandler = (event) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // verificar si estan completados los campos
    if (
      !signUpData.name ||
      !signUpData.last_name ||
      !signUpData.address ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.phone_number
    ) {
      setShowError(true); // muestra el mensaje d error
      return;
    }
    try {
      await userSignUp(signUpData);
      const credentials = {
        email: signUpData.email,
        password: signUpData.password,
      };
      const token = await userLogin(credentials);
      if (!token) {
        navigate("/login");
        return;
      }
      const decodedToken = jwtDecode(token);
      const data = {
        token: token,
        userData: decodedToken,
      };
      dispatch(login({ credentials: data }));
      setTimeout(() => {
        navigate("/profile");
      });
    } catch (error) {
      console.error("Ha ocurrido un error", error);
    }
  };

  return (
    <Container id="Body" className="d-flex justify-content-center mt-5" style={{ maxWidth: "500px", margin: "auto"}}>
    <Form onSubmit={handleSubmit} className="w-100" id="signUpBox">
      <Row className="mb-2">
        <Form.Group as={Col} controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={signUpData.name}
            onChange={inputHandler}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="last_name"
            value={signUpData.last_name}
            onChange={inputHandler}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          name="address"
          value={signUpData.address}
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={signUpData.email}
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={signUpData.password}
          onChange={inputHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone number"
          name="phone_number"
          value={signUpData.phone_number}
          onChange={inputHandler}
        />
      </Form.Group>

      {/* mensaje de error si no han completado todos los campos */}
      {showError && (
        <Alert
          variant="danger"
          onClose={() => setShowError(false)}
          dismissible
        >
          Please fill in all fields
        </Alert>
      )}

      <Button variant="primary" type="submit" className="w-30">
        Register
      </Button>
    </Form>
  </Container>
  );
};
