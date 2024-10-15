import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import Histogram from "./Histogram";
import "bootstrap/dist/css/bootstrap.min.css";

const currentDataSet = {
  date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  data: [
    { day: "One", score: 0.2 },
    { day: "Two", score: 0.5 },
    { day: "Three", score: 0.7 },
    { day: "Four", score: 0.9 },
    { day: "Five", score: 0.4 },
  ],
};

const pastDataSets = [
  {
    date: "2023-10-01",
    data: [
      { day: "One", score: 0.1 },
      { day: "Two", score: 0.3 },
      { day: "Three", score: 0.6 },
      { day: "Four", score: 0.8 },
      { day: "Five", score: 0.2 },
    ],
  },
  {
    date: "2023-10-02",
    data: [
      { day: "One", score: 0.4 },
      { day: "Two", score: 0.6 },
      { day: "Three", score: 0.5 },
      { day: "Four", score: 0.7 },
      { day: "Five", score: 0.3 },
    ],
  },
  // Add more past data sets as needed
];

const HistogramCard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  const selectedDataSet =
    selectedDate === currentDataSet.date
      ? currentDataSet
      : pastDataSets.find((dataset) => dataset.date === selectedDate);

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto w-50">
        <Col>
          <Card style={{ width: "100%", minHeight: "400px" }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Card.Title>Histogram</Card.Title>
              <div>
                <Form.Control
                  as="select"
                  onChange={handleDateChange}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Past Assignments
                  </option>
                  <option value={currentDataSet.date}>Last Assignment</option>
                  {pastDataSets.map((dataset, index) => (
                    <option key={index} value={dataset.date}>
                      {dataset.date}
                    </option>
                  ))}
                </Form.Control>
              </div>
            </Card.Header>
            <Card.Body>
              <h5>{selectedDate ? selectedDate : currentDataSet.date}</h5>
              <Histogram
                data={
                  selectedDataSet ? selectedDataSet.data : currentDataSet.data
                }
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HistogramCard;
