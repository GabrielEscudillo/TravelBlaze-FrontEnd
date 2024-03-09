import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../../Pages/userSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials ? userRdxData.credentials.token : null;
  const decoded = userRdxData.credentials?.userData;

  const logMeOut = () => {
    dispatch(logout({ credentials: {} }));
    setTimeout(() => {
      navigate();
    });
  };

  return (
<Navbar
  className="custom-navbar"
  style={{ backgroundColor: "#327C8B" }}
  expand="lg"
>
  <Container fluid>
    <Navbar.Brand as={Link} to="/" className="me-auto">
      Tattooink
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-lg-start">
      <Nav className="mx-auto text-center me-auto me-lg-0">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/artists">
          Agents
        </Nav.Link>
        <Nav.Link as={Link} to="/">
          About Us
        </Nav.Link>
        <Nav.Link as={Link} to="/">
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
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/users">
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/allappointments">
                  All Appointments
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logMeOut()}>
                  Log out
                </NavDropdown.Item>
              </>
            ) : decoded.userRoles === "artist" ? (
              <>
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/myappointments">
                  My Appointments
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logMeOut()}>
                  Log out
                </NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/appointments">
                  Schedule an Appointment
                </NavDropdown.Item>
                <NavDropdown.Divider />
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
