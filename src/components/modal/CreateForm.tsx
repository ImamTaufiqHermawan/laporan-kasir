import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Button, Modal, ModalFooter,
  ModalHeader, ModalBody
} from "reactstrap"

function CreateModal() {

  // Modal open state
  const [modal, setModal] = React.useState(false);

  // Toggle for Modal
  const toggle = () => setModal(!modal);

  return (
    <div style={{
      display: 'block', width: 700, padding: 30
    }}>
      <h4>ReactJS Reactstrap Modal Component</h4>
      <Button color="danger"
        onClick={toggle}>Click me to open Modal</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}>Sample Modal Title</ModalHeader>
        <ModalBody>
          Sample Modal Body Text to display...
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Okay</Button>
        </ModalFooter>
      </Modal>
    </div >
  );
}

export default CreateModal;
