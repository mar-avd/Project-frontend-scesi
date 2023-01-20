import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';

export default function DeleteNoteModal({idNote}){
  const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  //states
    const [show, setShow] = useState(false);
  //handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
      api.delete('note/delete?noteID=' + idNote, config).then(() => {
        window.location.reload()
      }).catch((error) => console.log(error))
    }
    //render
    return(<>
    <Button variant='primary' onClick={handleShow}>
        Eliminar definitivamente
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Estás seguro de eliminar esta nota? {idNote}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>)
}