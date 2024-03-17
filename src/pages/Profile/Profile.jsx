import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { userData } from "../userSlice";
import {
  DeleteAppointment,
  bringAppointments,
  bringProfile,
  updateAppointment,
  updateProfile,
} from "../../Services/apiCalls";
import { NewAppointment } from "../../Components/Modals/NewAppointment";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const userRdxData = useSelector(userData);
  const token = userRdxData.credentials.token;
  const myId = userRdxData.credentials.userData.userId;
  const [editMode, setEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [myAppointments, setMyAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [originalAppointment, setOriginalAppointment] = useState(null);
  const [originalData, setOriginalData] = useState(profileData);
  const navigate = useNavigate();

  const today = new Date();
  const date = today.toISOString().split("T")[0];

  useEffect(() => {
    if (!token) {
      navigate("/home")
    }
    else {
    bringProfile(token, myId).then((res) => {
      setProfileData(res);
      setEditableData(res);
    });
    bringAppointments(token, myId)
      .then((appointments) => {
        setMyAppointments(appointments);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
    }}, [token, myId]);

  const inputHandler = (event) => {
    setEditableData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const buttonHandler = () => {
    if (editMode) {
      if (
        !editableData.name ||
        !editableData.last_name ||
        !editableData.address ||
        !editableData.phone_number
      ) {
        setShowError(true); 
        setTimeout(() => {
          setShowError(false);
        }, 5000); 
        return;
      }
      updateProfile(token, myId, editableData)
        .then((updatedProfile) => {
          setProfileData(updatedProfile);
          setEditMode(false);
          window.location.reload(); 
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else {
      setOriginalData({ ...editableData });
      setEditMode(true);
    }
  };

  const toggleDetails = () => {
    setDetailsOpen(!detailsOpen);
  };

  const handleEditAppointment = (index) => {
    const appointmentsCopy = [...myAppointments];
    setOriginalAppointment({ ...appointmentsCopy[index] });
    appointmentsCopy[index].editable = true;
    setMyAppointments(appointmentsCopy);
  };

  const handleCancelEditData = () => {
    setProfileData(originalData);
    setEditMode(false);
  };

  const handleCancelEdit = (index) => {
    const appointmentsCopy = [...myAppointments];
    if (originalAppointment) {
      appointmentsCopy[index] = originalAppointment;
      setMyAppointments(appointmentsCopy);
      setOriginalAppointment(null);
    }
  };

  const handleSaveAppointment = (index) => {
    const appointment = myAppointments[index];
    const { id, date, time } = appointment;
    updateAppointment(token, id, { date, time })
      .then((updatedAppointment) => {
        const updatedAppointments = [...myAppointments];
        updatedAppointments[index] = { ...updatedAppointment, editable: false };
        setMyAppointments(updatedAppointments);
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
      });
  };

  const cancelButtonHandler = (id) => {
    DeleteAppointment(token, id)
      .then(() => {
        const updatedAppointments = myAppointments.filter(
          (appointment) => appointment.id !== id
        );
        setMyAppointments(updatedAppointments);
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  return (
    <div className="profileBody">
      <div className="body">
        {!!profileData.phone_number ? (
          <Container className="mt-5">
            <Row className="justify-content-center">
              <Col md={6} className="mt-md-4 mb-4">
                <Card className="profile-card">
                  <Card.Title className="profile-card-title">
                    Welcome {profileData.name} {profileData.last_name}
                  </Card.Title>
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
                        {showError && (
                          <Alert
                            variant="danger"
                            onClose={() => setShowError(false)}
                            dismissible
                          >
                            Please fill in all fields
                          </Alert>
                        )}
                        <Button
                          variant="primary"
                          className="mt-3"
                          onClick={buttonHandler}
                        >
                          {editMode ? "Save" : "Update details"}
                        </Button>
                        {editMode && (
                          <Button
                            variant="secondary"
                            className="mt-3"
                            onClick={handleCancelEditData}
                          >
                            Cancel Edit
                          </Button>
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
<Col md={3} className="mt-md-4 mb-5 mobile-margin-top">                {" "}
                <Card className="appointment-Card">
                  <Card.Body className="newAppointment">
                    <Card.Img
                      variant="top"
                      src="https://i.pinimg.com/564x/33/85/ee/3385ee65676343e4ad42afb9c450a598.jpg"
                    />

                    <div>Ready for your next adventure?</div>
                    <Button
                      variant="primary"
                      onClick={() => setShowModal(true)}
                    >
                      Schedule an appointment
                    </Button>
                    <NewAppointment
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : (
          <p>Cargando datos de perfil...</p>
        )}
      </div>
      {myAppointments.length > 0 && (
        <Container className="mt-5" id="appointment-box">
          <h3 className="text-center mb-4">MY APPOINTMENTS</h3>
          <Row xs={1} md={2} lg={3} className="g-5">
            {" "}
            {myAppointments.map((appointment, index) => (
              <Col key={index}>
                <Card className="h-100" id="custom-card-profile">
                  {" "}
                  <Card.Body>
                    <Card.Title>Agent: {appointment.agent.name}</Card.Title>
                    <Card.Title>
                      Service: {appointment.service.service_name}
                    </Card.Title>

                    <Card.Text>
                      <span className="font-weight-bold">Date:</span>{" "}
                      {appointment.editable ? (
                        <Form.Control
                          type="date"
                          value={appointment.date}
                          min={date}
                          onChange={(e) => {
                            const value = e.target.value;
                            setMyAppointments((prevAppointments) =>
                              prevAppointments.map((app, i) =>
                                i === index ? { ...app, date: value } : app
                              )
                            );
                          }}
                        />
                      ) : (
                        appointment.date
                      )}
                      <br />
                      <span className="font-weight-bold">Time:</span>{" "}
                      {appointment.editable ? (
                        <Form.Control
                          type="time"
                          value={appointment.time}
                          onChange={(e) => {
                            const value = e.target.value;
                            setMyAppointments((prevAppointments) =>
                              prevAppointments.map((app, i) =>
                                i === index ? { ...app, time: value } : app
                              )
                            );
                          }}
                        />
                      ) : (
                        appointment.time
                      )}
                    </Card.Text>
                    <div className="buttons">
                      <Button
                        variant="primary"
                        onClick={() => {
                          if (appointment.editable) {
                            handleSaveAppointment(index);
                          } else {
                            handleEditAppointment(index);
                          }
                        }}
                      >
                        {appointment.editable ? "Save" : "Reschedule"}
                      </Button>
                      {appointment.editable && (
                        <Button
                          variant="secondary"
                          onClick={() => handleCancelEdit(index)}
                        >
                          Cancel Edit
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        onClick={() => cancelButtonHandler(appointment.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};
