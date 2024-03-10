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
  console.log(userRdxData);

  const logMeOut = () => {
    dispatch(logout({ credentials: {} }));
    setTimeout(() => {
      navigate();
    });
  };
  return (

  //   <Navbar
  //   style={{ backgroundColor: "#101010" }}
  //   variant="dark"
  //   expand="lg"
  //   className="text-light"
  //   id="navbar"
  // >
  //   <Container className="container">
  //     <Navbar.Brand href="/" className="ms-auto">
  //       Tattooink
  //     </Navbar.Brand>
  //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //     <Navbar.Collapse id="basic-navbar-nav">
  //       <Nav className="me-auto">
  //         <Nav.Link href="/">Home</Nav.Link>
  //         <Nav.Link href="Artists">Artists</Nav.Link>
  //         <NavDropdown title="My account" id="basic-nav-dropdown">
  //           {!token ? (
  //             <>
  //               <NavDropdown.Item href="login">Login</NavDropdown.Item>
  //               <NavDropdown.Item href="register">Register</NavDropdown.Item>
  //             </>
  //           ) : decoded.userRoles === "super_admin" ? (
  //             <>
  //               <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
  //               <NavDropdown.Item href="users">
  //                 Users
  //               </NavDropdown.Item>
  //               <NavDropdown.Item href="allappointments">
  //                 all appointments
  //               </NavDropdown.Item>
  //               <NavDropdown.Divider />
  //               <NavDropdown.Item href="/" onClick={() => logMeOut()}>
  //                 Log out
  //               </NavDropdown.Item>
  //             </>
  //           ) : decoded.userRoles === "artist" ? (
  //             <>
  //               <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
  //               <NavDropdown.Item href="myappointments">
  //                 My Appointments
  //               </NavDropdown.Item>
  //               <NavDropdown.Divider />
  //               <NavDropdown.Item href="/" onClick={() => logMeOut()}>
  //                 Log out
  //               </NavDropdown.Item>
  //             </>
  //           ) : (
  //             <>
  //               <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
  //               <NavDropdown.Item href="appointments">
  //                 Schedule an appointment
  //               </NavDropdown.Item>
  //               <NavDropdown.Divider />
  //               <NavDropdown.Item href="/" onClick={() => logMeOut()}>
  //                 Log out
  //               </NavDropdown.Item>
  //             </>
  //           )}
  //         </NavDropdown>
  //       </Nav>
  //     </Navbar.Collapse>
  //   </Container>
  // </Navbar>
    <Navbar
      className="custom-navbar"
      style={{ backgroundColor: "#327C8B" }}
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-auto">
          TravelBlaze
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
                ) : decoded.userRoles === "agent" ? (
                  <>
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/myappointments">
                      Appointments
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logMeOut()}>
                      Log out
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                  
                    <NavDropdown.Item as={Link} to="/home">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/home">
                      Appointments
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/home">
                      Bookings
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
