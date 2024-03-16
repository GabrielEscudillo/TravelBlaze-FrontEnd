import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../Pages/userSlice";
import { Link } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const token = userRdxData?.credentials.token;
  const decoded = userRdxData?.credentials?.userData;

  const logMeOut = () => {
    dispatch(logout({ credentials: {} }));
    setTimeout(() => {
      navigate("/home");
    });
  };
  return (
    <Navbar
      className="custom-navbar"
      style={{ backgroundColor: "#26425A" }}
      expand="lg"
    >
      <Container fluid>
      <Navbar.Brand as={Link} to="/" className="me-auto">
  <img src="./../src/assets/logo.svg" alt="TravelBlaze Logo" style={{ height: "40px" }} />
</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-lg-start"
        >
          <Nav className="mx-auto text-center me-auto me-lg-0">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/agents">
              Agents
            </Nav.Link>
            <Nav.Link as={Link} to="/destinations">
              Destinations
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <div className="d-flex justify-content-end ms-auto">
            <Nav className="me-3">
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                {!token ? (
                  <>
                    <NavDropdown.Item as={Link} to="/login">
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/register">
                      Register
                    </NavDropdown.Item>
                  </>
                ) : decoded.userRoles === "super_admin" ? (
                  <>
                    <NavDropdown.Item as={Link} to="/allappointments">
                      Appointments
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/allbookings">
                      Bookings
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/newagent">
                      New Agent
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/allusers">
                      Users
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logMeOut()}>
                      Log out
                    </NavDropdown.Item>
                  </>
                ) : decoded.userRoles === "agent" ? (
                  <>

                    <NavDropdown.Item as={Link} to="/myappointments">
                      Appointments
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/newbooking">
                      New Booking
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logMeOut()}>
                      Log out
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                  

                    <NavDropdown.Item as={Link} to="/bookings">
                      Bookings
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logMeOut()}>
                      Log out
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
