import React, { useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { userSignUp, userLogin } from "../../Services/apiCalls";
import "./Register.css";
import {
  FaEnvelope,
  FaLock,
  FaMapMarkedAlt,
  FaPhone,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";

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
    <Container className="d-flex justify-content-center mt-5">
      <Row className="mb-2">
        <Col xs={12} md={6} className="text-center mb-4">
          <div>
            <img
              src="https://i.pinimg.com/originals/27/0d/14/270d1417bac18a63b02ea5ab337a8165.gif"
              alt="Travel Image"
              className="mt-1 img-fluid"
              style={{
                maxWidth: "350px",
                width: "100%",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
              }}
            />
            <p className="mt-3">
              Start your extraordinary journey with TravelBlaze today! Uncover
              new horizons, embrace diverse cultures, and create memories that
              will last a lifetime. Let your adventure begin!
            </p>
          </div>
        </Col>
        <Col xs={12} md={5} className="mb-5">
          <Form
            onSubmit={handleSubmit}
            className="w-100"
            id="SignUpBox"
            >
            <h3 className="mt-2 text-center">Join Our Community</h3>

            <Row className="mb-2">
              <Form.Group as={Col} controlId="formName">
                <Form.Label>
                  <FaUser /> Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={signUpData.name}
                  onChange={inputHandler}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formLastName">
                <Form.Label>
                  <FaUserAlt /> Last Name
                </Form.Label>
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
              <Form.Label>
                <FaMapMarkedAlt /> Address
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={signUpData.address}
                onChange={inputHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>
                <FaEnvelope /> Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={signUpData.email}
                onChange={inputHandler}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formPassword">
                  <Form.Label>
                    <FaLock /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={signUpData.password}
                    onChange={inputHandler}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>
                    <FaPhone /> Phone Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phone_number"
                    value={signUpData.phone_number}
                    onChange={inputHandler}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Mensaje de error si no han completado todos los campos */}
            {showError && (
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
        </Col>
      </Row>
    </Container>
  );
};
