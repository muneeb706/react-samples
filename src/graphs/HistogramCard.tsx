import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import Histogram from './Histogram';
import 'bootstrap/dist/css/bootstrap.min.css';

const currentData = [
  { day: 'One', score: 0.2 },
  { day: 'Two', score: 0.5 },
  { day: 'Three', score: 0.7 },
  { day: 'Four', score: 0.9 },
  { day: 'Five', score: 0.4 },
];

const pastDataSets = [
  {
    date: '2023-10-01',
    data: [
      { day: 'One', score: 0.1 },
      { day: 'Two', score: 0.3 },
      { day: 'Three', score: 0.6 },
      { day: 'Four', score: 0.8 },
      { day: 'Five', score: 0.2 },
    ],
  },
  {
    date: '2023-10-02',
    data: [
      { day: 'One', score: 0.4 },
      { day: 'Two', score: 0.6 },
      { day: 'Three', score: 0.5 },
      { day: 'Four', score: 0.7 },
      { day: 'Five', score: 0.3 },
    ],
  },
  // Add more past data sets as needed
];

const HistogramCard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto w-50">
        <Col>
          <Card style={{ width: '100%', minHeight: '400px' }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title>Histogram</Card.Title>
              <Button variant="primary" onClick={handleShow}>
                View Past Scores
              </Button>
            </Card.Header>
            <Card.Body>
              <Histogram data={currentData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Past Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {pastDataSets.map((dataset, index) => (
            <div key={index} style={{ height: '450px', marginBottom: '20px' }}>
              <h5>{dataset.date}</h5>
              <div style={{ height: '400px' }}>
                <Histogram data={dataset.data} />
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HistogramCard;