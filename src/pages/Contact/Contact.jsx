
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./Contact.css";

export const Contact = () => {
    return (     <Container className="mt-5">
    <Row>
    <Col xs={12} md={4} className="mx-auto">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Email: info@travelblaze.com</p>
          <p>Phone: +1234567890</p>
          <img src="https://i.pinimg.com/564x/84/1d/6b/841d6b83eedc646cba67bc3b97eea7bf.jpg" alt="Travel Image"               className="mt-4 img-fluid"
              style={{
                maxWidth: "400px",
                width: "100%",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
              }} />
        </div>
      </Col>
      <Col
  xs={12}
  md={6}
  className="mx-auto d-flex flex-column justify-content-center align-items-center mb-5 mt-md-0 mt-3"
>
        <div className="contact-form" id="contact-box">
        <h3 className="mt-1">Have a question? Just ask...</h3>
            <p>Our team is here to assist you with any inquiries you may have. Whether you're planning your next getaway or seeking advice on travel destinations, we're dedicated to providing you with the best possible assistance. Don't hesitate to reach out!</p>          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  </Container>)
}