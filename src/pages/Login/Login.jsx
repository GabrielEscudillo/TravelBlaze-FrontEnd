import { useDispatch, useSelector } from "react-redux";
import "./Login.css"
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { LoginInput } from "../../Components/LoginInput/LoginInput";


export const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
      });   
      const [loginError, setLoginError] = useState(false); 

      const dispatch = useDispatch();
      const userRdxData = useSelector(userData);
      const navigate = useNavigate();

      const inputHandler = (event) => {
        setCredentials((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      };

      const buttonHandler = () => {
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
      };


    return (
        <Container className="body">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="logInBox">
              <h1>Welcome to tattooink</h1>
              <h2>Log In</h2>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <LoginInput
                    type={"email"}
                    name={"email"}
                    handler={inputHandler}
                    placeholder={"Enter your email"}
                    iconClass={"bi bi-envelope"}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <LoginInput
                    type={"password"}
                    name={"password"}
                    handler={inputHandler}
                    placeholder={"Enter your password"}
                    iconClass={"bi bi-lock"}
                  />
                </Form.Group>
                <Button variant="primary" onClick={buttonHandler} block>
                  Log in
                </Button>
              </Form>
              {loginError && ( 
                <Alert variant="danger" className="mt-3">
                  Invalid email or password. Please try again.
                </Alert>
              )}
              <p className="mt-3">
                Don't have an account? <a href="/register">Sign up</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

    );
};