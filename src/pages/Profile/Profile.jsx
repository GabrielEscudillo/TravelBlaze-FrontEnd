import "./Profile.css";
import {
  bringProfile,
  updateProfile,
} from "../../Services/apiCalls";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.userId;
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    bringProfile(token, myId).then((res) => {
      setProfileData(res);
      setEditableData(res);
    });
  }, [token, myId]);

  const inputHandler = (event) => {
    setEditableData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (editMode) {
      updateProfile(token, myId, editableData)
        .then((updatedProfile) => {
          setProfileData(updatedProfile);
          setEditMode(false);
          window.location.reload(); // Recargar 
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      setEditMode(true);
    }
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };


  return (
    <>
      <div className="body">
        {!!profileData.phone_number ? (
          <>
            <Container className="mt-5">
              <Card.Title className="profile-card-title">
                Welcome {profileData.name} {profileData.last_name}
              </Card.Title>{" "}
              <Row className="justify-content-center">
                <Col md={7} className="mt-md-4">
                  <Card className="profile-card">
                    {" "}
                    <Card.Body>
                      <Button
                        variant="primary"
                        className="view-details-button"
                        onClick={toggleDetails}
                      >
                        {detailsOpen ? "Hide details" : "View details"}
                      </Button>
                      {detailsOpen && (
                        <>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              Name:{" "}
                              {editMode ? (
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={editableData.name}
                                  onChange={inputHandler}
                                />
                              ) : (
                                profileData.name
                              )}
                            </li>
                            <li className="list-group-item">
                              Last Name:{" "}
                              {editMode ? (
                                <Form.Control
                                  type="text"
                                  name="last_name"
                                  value={editableData.last_name}
                                  onChange={inputHandler}
                                />
                              ) : (
                                profileData.last_name
                              )}
                            </li>
                            <li className="list-group-item">
                              Email: {profileData.email}
                            </li>
                            <li className="list-group-item">
                              Phone number:{" "}
                              {editMode ? (
                                <Form.Control
                                  type="text"
                                  name="phone_number"
                                  value={editableData.phone_number}
                                  onChange={inputHandler}
                                />
                              ) : (
                                profileData.phone_number
                              )}
                            </li>
                            <li className="list-group-item">
                              Address:{" "}
                              {editMode ? (
                                <Form.Control
                                  type="text"
                                  name="address"
                                  value={editableData.address}
                                  onChange={inputHandler}
                                />
                              ) : (
                                profileData.address
                              )}
                            </li>
                          </ul>
                          <Button
                            variant="primary"
                            className="mt-3"
                            onClick={buttonHandler}
                          >
                            {editMode ? "Save" : "Update details"}
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        ) : (
          <p>Cargando datos de perfil...</p>
        )}{" "}
      </div>

    </>
  );
};
