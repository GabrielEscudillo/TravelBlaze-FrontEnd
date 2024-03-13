import React, { useState } from "react";
import { LoginInput } from "../../Components/LoginInput/LoginInput";
import { userLogin } from "../../Services/apiCalls";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { login, userData } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./Login.css";
import { FaEnvelope } from 'react-icons/fa';
import { BiLock } from 'react-icons/bi';


export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.table(event.target.value);
  };
  const buttonHandler = (event) => {
    event.preventDefault();
    if (!credentials.email || !credentials.password) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 400);
      return;
    }
    try {
      userLogin(credentials)
        .then((token) => {
          if (!token) {
            setLoginError(true);
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
        })
        .catch((err) => {
          console.error("Ha ocurrido un error", err);
          setLoginError(true);
        });
    } catch (error) {
      console.error("Ha ocurrido un error", error);
    }
  };

  return (
    <Container id="loginBody" className="d-flex justify-content-center mt-5"style={{ maxWidth: "500px", margin: "auto"}}>
      <Row className="mb-2">
        <Col xs={12} md={8} lg={12} className="mx-auto">
          {" "}
          {/* Añadida la clase mx-auto */}
          <div className="logInBox-name">
            <h1>Welcome to TravelBlaze</h1>
            <Form className="w-100" id="logInBox">
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <FaEnvelope /> <LoginInput
                  type={"email"}
                  name={"email"}
                  handler={inputHandler}
                  placeholder={"Insert your email"}
                  iconClass={"bi bi-envelope"}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
              <BiLock /> <LoginInput
                  type={"password"}
                  name={"password"}
                  handler={inputHandler}
                  placeholder={"Insert your password"}
                  iconClass={"bi bi-lock"}
                />
              </Form.Group>
              {showError && (
                <Alert
                  variant="danger"
                  onClose={() => setShowError(false)}
                  dismissible
                >
                  Por favor ingresa tu correo electrónico y contraseña
                </Alert>
              )}
              <Button variant="primary" onClick={buttonHandler} block="true">
                Iniciar sesión
              </Button>
            </Form>
            {loginError && (
              <Alert variant="danger" className="mt-3">
                Correo electrónico o contraseña incorrectos. Por favor,
                inténtalo de nuevo.
              </Alert>
            )}
            <p className="mt-3">
              ¿No tienes una cuenta? <a href="/register">Regístrate</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
