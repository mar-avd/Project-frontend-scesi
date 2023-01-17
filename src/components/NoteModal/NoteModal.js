
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function NoteModal({idNote}){
    
    const [show, setShow] = useState(false);

    //states
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //render
    return(<>
    <Button variant='btn' onClick={handleShow}>
        Ver
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Estás seguro de eliminar esta nota?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Eliminar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>)
}