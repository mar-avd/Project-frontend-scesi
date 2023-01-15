import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function AddModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //render
  return (
    <div>
      <Button variant='light' onClick={handleShow}>
        <i className="bi bi-plus-circle-fill"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type='text' className='form-control'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
