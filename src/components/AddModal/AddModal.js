import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from "../../config/site.config";
import AuthService from '../../config/auth.service';
import { useNavigate } from "react-router-dom";

export default function AddModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // navegacion
  let navigate = useNavigate();

  // Verificacion de usr con Token
  const user = AuthService.getCurrentUser();
        const config = {
          headers: { Authorization: `Bearer ${user.token}` },
        };
  
  /* Set Datos imput */
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  function handleSubmit() {
    console.log(noteTitle,noteContent);
    setNoteTitle("") ;
    setNoteContent("");
  };

  const addNote = () => {
    console.log(noteTitle);
    console.log(noteContent);
    api.post('note', {
      titleNote: noteTitle,
      contentNote: noteContent
    }, config).then((response)=>{
        handleSubmit();
        // sdasdsa
        window.location.reload();
        return "nota creada";
    }).catch((error)=>console.log(error))
  }

  //render
  return (
    <div>
      <Button variant='light' onClick={handleShow}>
        <i className="bi bi-plus-circle-fill"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='noteTitle'>
              <input type='text' className='form-control' placeholder='titulo' required
              onChange={(e)=> setNoteTitle(e.target.value)}
              value={noteTitle}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='noteContent'>
            {/* recuperar dato intruducido */}
            <input type='text' className='form-control' placeholder='escriba aqui' required
            onChange={(e)=> setNoteContent(e.target.value)}
            value={noteContent}/>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btnClose' variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          {/* add note and handleDesarchivar desactive */}
          <Button variant="primary" onClick={() => addNote()}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
