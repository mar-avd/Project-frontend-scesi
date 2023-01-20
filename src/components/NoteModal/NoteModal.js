
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';

export default function NoteModal({idNote}){
    
    const [show, setShow] = useState(false);
    const [note, setNote] = useState({});
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const loadNote = () => {
      api.get('note/oneNote?noteID=' + idNote, config).then((response) => {
        setNote(response.data)
      }).catch((error) => console.log(error))

    }
    //states
    const handleClose = () => setShow(false);
    const handleShow = () => {
      loadNote();
      setShow(true)};
    //render
    return(<>
    <Button variant='btn' onClick={handleShow}>
        Ver nota
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{note.titleNote}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{note.contentNote}</p>
          <div>
            <span className='badge text-bg-primary'>Etiqueta 1</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex justify-content-around'>
            <small>
            <p>Ultima modificación {note.modificationDate}</p>

            </small>
            <div>
              <Button variant="secondary" size='sm' onClick={handleClose}>
                Eliminar
              </Button>
              <Button variant="primary" size='sm' onClick={handleClose}>
                Editar
              </Button>

            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>)
}