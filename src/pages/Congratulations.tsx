import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa"; // Import the check circle and regular circle icons from react-icons

const Congratulations: React.FC = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center mt-3"
    >
      <Row className="w-100">
        <Col className="text-center">
          <img
            src="/party-popper.png"
            alt="Party Popper"
            className="img-fluid mb-3"
            style={{ width: "12%", maxWidth: "300px" }}
          />
          <h1>Congratulations!</h1>
          <h4>You have completed Day Two Test</h4>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <div className="progress-container mt-3">
            <div className="progress-item completed">
              <FaCheckCircle size={40} className="completed-icon" />
              <div className="text-container">
                <div className="text completed-text">Day One</div>
              </div>
            </div>

            <div className="progress-item completed">
              <FaCheckCircle size={40} className="completed-icon" />
              <div className="text-container">
                <div className="text completed-text">Day Two</div>
              </div>
            </div>

            <div className="progress-item pending">
              <FaRegCircle size={40} className="pending-icon" />
              <div className="text-container">
                <div className="text pending-text">Day Three</div>
              </div>
            </div>

            <div className="progress-item pending">
              <FaRegCircle size={40} className="pending-icon" />
              <div className="text-container">
                <div className="text pending-text">Day Four</div>
              </div>
            </div>
            <div className="progress-item pending">
              <FaRegCircle size={40} className="pending-icon" />
              <div className="text-container">
                <div className="text pending-text">Day Five</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Congratulations;
