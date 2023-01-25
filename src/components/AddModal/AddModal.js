import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from "../../config/site.config";
import AuthService from '../../config/auth.service';
import AddEditorText from './AddEditorText';

export default function AddModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  /* Set Datos imput */
  const [note, setNote] = useState({});
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  //render
  return (
    <div>
      <Button variant='light' onClick={handleShow}>
        <i className="bi bi-plus-circle-fill"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='noteTitle'>
              <input type='text' className='form-control' placeholder='Titulo' required
              onChange={(e)=> setNoteTitle(e.target.value)}
              value={noteTitle}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='noteContent'>
          <AddEditorText titleNote= {noteTitle} contentHTML={note.contentHTMLNote}></AddEditorText>
        </Modal.Body>
        <Modal.Footer>
          {/* add note and handleDesarchivar desactive */}
          {/* <Button variant="primary" onClick={() => addNote()}>
            Agregar
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
