import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';

export default function DeleteNoteModal({ idNote }) {
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
  return (<>
    <Button variant='danger' onClick={handleShow}>
      Eliminar definitivamente
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar definitivamente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          Recuerda que al borrar esta nota, no podrás recuperarla <b>¿Estás seguro de eliminar la nota?</b>
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  </>)
}