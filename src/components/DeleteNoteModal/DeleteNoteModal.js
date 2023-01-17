
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export default function DeleteNoteModal({idNote}){
    
    const [show, setShow] = useState(false);

    //states
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //render
    return(<>
    <Button variant='' onClick={handleShow}>
        Eliminar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Estás seguro de eliminar esta nota?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>)
}