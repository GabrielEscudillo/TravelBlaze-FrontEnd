import "./Home.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export const Home = () => {
  return (
    <div className="home-page">
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <h1>Discover the World with Us</h1>
            <p>
              Embark on an unforgettable journey with our agency and experience
              the wonders of the world like never before. Let us guide you to
              the most breathtaking destinations, where adventure awaits at
              every turn.
            </p>
            <Button variant="primary" size="lg">
              Explore Destinations
            </Button>
          </Col>
          <Col md={4} className="text-center my-4 my-md-0">
            <div className="image-frame image-3d-frame">
              <img
                src="https://i.pinimg.com/originals/6a/6f/9f/6a6f9fca653aabd2ee0ecc0ba3d2ed64.gif"
                alt="Travel"
                className="img-fluid"
                id="image"
              />
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={4} className="text-center mb-4 mb-md-0">
            <Card className="destination-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/9e/86/b8/9e86b83b9aa80b9fed2ae1597d00cf60.jpg"
              />
              <Card.Body>
                <Card.Title>Beach Destinations</Card.Title>
                <Card.Text>
                  Escape to paradise and feel the warmth of the sun on your skin
                  as you lounge on pristine beaches and swim in crystal-clear
                  waters.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center mb-4 mb-md-0">
            <Card className="destination-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/1b/48/42/1b4842d614b0673ee8fa3782e5db4e73.jpg"
              />
              <Card.Body>
                <Card.Title>Mountain Destinations</Card.Title>
                <Card.Text>
                  Feel the rush of adrenaline as you conquer majestic peaks and
                  marvel at breathtaking vistas in our mountain getaways.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="text-center">
            <Card className="destination-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/3d/fb/82/3dfb82a874d69bbaa52f7e6a43983ebb.jpg"
              />
              <Card.Body>
                <Card.Title>Urban Destinations</Card.Title>
                <Card.Text>
                  Immerse yourself in the vibrant culture and bustling energy of
                  the world's most exciting cities, where every corner holds a
                  new adventure.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
