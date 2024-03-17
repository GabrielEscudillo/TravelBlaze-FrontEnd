import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Destinations.css"; 
import { IoMdGlobe } from "react-icons/io"; 

export const Destinations = () => {
  return (
    <div className="destinations-page">
      <Container className="py-5">
        <h1 className="text-center mb-5">Explore Destinations</h1>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Card className="destination-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/20/a2/ad/20a2ade799e34c8ea049320e2ceb01f0.jpg"
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="card-title text-center">
                  Europe
                </Card.Title>
                <Card.Text className="card-text text-center">
                  Explore the rich history and diverse cultures of Europe.{" "}
                  <IoMdGlobe />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="destination-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/45/14/ee/4514eea776a9878c665efcde4e336fb8.jpg"
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="card-title text-center">
                  Africa
                </Card.Title>
                <Card.Text className="card-text text-center">
                  Experience the breathtaking landscapes and vibrant traditions
                  of Africa. <IoMdGlobe />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="destination-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/8a/eb/9f/8aeb9fd0f2c08a9914aff214f601f804.jpg"
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="card-title text-center">
                  Americas
                </Card.Title>
                <Card.Text className="card-text text-center">
                  Discover the natural wonders and cultural diversity of the
                  Americas. <IoMdGlobe />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4} className="mb-4">
            <Card className="destination-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/8c/7a/ad/8c7aadd6c32078ac29aabf1a9aba4640.jpg"
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="card-title text-center">Asia</Card.Title>
                <Card.Text className="card-text text-center">
                  Journey through ancient civilizations and modern marvels in
                  Asia. <IoMdGlobe />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="destination-card">
              <Card.Img
                variant="top"
                src="https://i.pinimg.com/564x/06/20/4f/06204f27cccbe8664cfb66fd1ffda338.jpg"
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title className="card-title text-center">
                  Oceania
                </Card.Title>
                <Card.Text className="card-text text-center">
                  Experience the beauty of pristine nature and island paradises
                  in Oceania. <IoMdGlobe />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
