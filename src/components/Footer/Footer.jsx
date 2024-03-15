import "./Footer.css";
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <h5>Contact Us</h5>
            <p>123 Travel Street</p>
            <p>Travel City, TC 12345</p>
            <p>info@example.com</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Follow Us</h5>
            <p>
              <a href="https://www.facebook.com"><FaFacebook className="mr-2" /></a>
              <a href="https://www.twitter.com"><FaTwitter className="mr-2" /></a>
              <a href="https://www.instagram.com"><FaInstagram /></a>
            </p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Join Our Community</h5>
            <p>Unlock exclusive travel deals and more by joining our community!</p>
            <p><Link to="/register" className="text-light">Sign Up Now</Link></p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <p className="small">&copy; 2024 Your Travel Agency. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
