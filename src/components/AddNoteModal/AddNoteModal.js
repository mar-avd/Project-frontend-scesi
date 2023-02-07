import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AddEditorText from './AddEditorText';

export default function AddNoteModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* Set Datos imput */
  const [note] = useState({});
  const [noteTitle, setNoteTitle] = useState("");

  //render
  return (
    <div>
      <Button variant='primary' onClick={handleShow} >
        <i className="bi bi-plus-circle-fill" style={{ color: '#e3f2fd' }}></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='noteTitle'>
            <input type='text' className='form-control' placeholder='Titulo' required
              onChange={(e) => setNoteTitle(e.target.value)}
              value={noteTitle} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='noteContent'>
          <AddEditorText titleNote={noteTitle} contentHTML={note.contentHTMLNote}></AddEditorText>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
