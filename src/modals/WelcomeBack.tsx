import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const WelcomeBack: React.FC = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  useEffect(() => {
    // Show the modal on page load
    setShow(true);
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="custom-modal-header justify-content-center border-0">
        <Modal.Title className="w-100 text-center">Welcome Back!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-modal-body text-center">
        <p>We're glad to see you again! Please take a moment to review any updates and continue using our services.</p>
        <Button variant="primary" onClick={handleClose} className="mt-3">
          Continue
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default WelcomeBack;