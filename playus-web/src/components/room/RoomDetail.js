import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";

export default function RoomDetail({ room }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="outline-primary" onClick={handleShow} size="sm">
        세부정보
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            InRoom
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
