import { useEffect, useState } from "react";
import "./Agents.css";
import { bringAllAgents } from "../../Services/apiCalls";
import { Card, Col, Container, Row } from "react-bootstrap";

export const Agents = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (agents.length === 0) {
      bringAllAgents().then((data) => {
        setAgents(data);
      });
    }
  }, []);

  return (
    <>
      <h1 className="text-center mb-0 mt-4">Meet our team</h1>
      <div className="agents-page">
        <Container className="py-5">
          <Row className="justify-content-center">
            {agents && agents.length > 0 ? (
              agents.map((agent) => {
                return (
                  <Col md={4} className="mb-4" key={agent.id}>
                    <Card className="agent-card shadow rounded">
                      <div className="card-img-container rounded">
                        <Card.Img
                          variant="top"
                          src={agent.photo}
                          className="card-img-top agent-img rounded"
                        />
                      </div>
                      <Card.Body className="d-flex flex-column justify-content-center">
                        <Card.Title className="card-title text-center">
                          {agent.name}
                        </Card.Title>
                        <Card.Text className="card-text text-center">
                          Expert in {agent.specialty}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <p className="text-center">No agents to display.</p>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};
