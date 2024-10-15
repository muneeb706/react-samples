import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa'; // Import the check icon from react-icons

const Congratulations: React.FC = () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-start vh-100 pt-5">
      <Row>
        <Col className="text-center">
          <img src="/party-popper.png" alt="Party Popper" className="mb-3" style={{ width: '30%', maxWidth: '300px' }} />
          <h1>Congratulations</h1>
          <h4>You have completed Day Two Test</h4>
          <div className="progress-container mt-5">
            <div className="progress-item completed">
              <div className="circle completed">
                <FaCheck size={25}/>
              </div>
              <div className="text completed-text">Day One</div>
            </div>

            <div className="progress-item completed">
              <div className="circle completed">
              <FaCheck size={24}/>
              </div>
              <div className="text completed-text">Day Two</div>
            </div>

            <div className="progress-item pending">
              <div className="circle pending"></div>
              <div className="text pending-text">Day Three</div>
            </div>

            <div className="progress-item pending">
              <div className="circle pending"></div>
              <div className="text pending-text">Day Four</div>
            </div>
            <div className="progress-item pending">
              <div className="circle pending"></div>
              <div className="text pending-text">Day Five</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Congratulations;