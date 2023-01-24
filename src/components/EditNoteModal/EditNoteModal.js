import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import moment from 'moment/moment';
import { useState } from 'react';
import editorNote from './prueba/editorNote'
import RichEditorExample from './prueba/editorNote';

export default function EditNoteModal({ idNote }) {

  //states
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({});
  const [tags, setTags] = useState([]);
  //
  /* Set Datos imput */
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  // 
  const user = AuthService.getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  // cargar notas
  const loadNote = () => {
    api.get('note/oneNote?noteID=' + idNote, config)
      .then((response) => {
        setNote(response.data);
      }).catch((error) => console.log(error))
  }
  //

  // cargar tahs
  const loadTags = () => {
    api.get('noteToTags/tags?noteID=' + note.noteID, config).then((response) => {
      setTags(response.data)
    }).catch((error) => console.log(error))
  }
  //states
  const handleClose = () => setShow(false);
  /* const handleShow = () => setShow(true); */
  const handleShow = () => {
    loadNote();
    loadTags();
    setShow(true);
  };
  //render
  return (<>
    <Button variant='btn dropdown-item' onClick={handleShow}>
      Editar
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <input className='form-control' type='text' value={note.titleNote}
            onChange={(e) => setNoteTitle(e.target.value)}>
          </input>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <RichEditorExample noteID={idNote} contentHTML={note.contentHTMLNote}></RichEditorExample>
        </div>
        <div>
          {tags.map((tag, index) => {
            return (<span className="badge text-bg-primary mx-1" key={index}>{tag.tags.nameTag}</span>)
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="col text-center">
          <small className="">
            <p >
              Ultima modificación &nbsp;
              {moment(note.modificationDate).format('llll')}
            </p>
          </small>
        </div>
      </Modal.Footer>
    </Modal>
  </>)
}