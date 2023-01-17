import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function RegisterModal(){
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  //render
    return(<span className=''>
        <Button variant='secondary' onClick={handleShow}>
        Registrarse
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Regístrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type='text' className='form-control'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Registrarme
          </Button>
        </Modal.Footer>
      </Modal>
    </span>)
}