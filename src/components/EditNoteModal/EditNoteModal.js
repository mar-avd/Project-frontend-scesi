import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import RichEditorExample from './prueba/editorNote';
import SelectTags from './SelectTags';

export default function EditNoteModal({ idNote, type }) {
  //states
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({});
  const [tagsNote, setTagsNote] = useState([]);

  /* Set Datos imput */
  const [noteTitle, setNoteTitle] = useState('');

  const user = AuthService.getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  // cargar nota
  const loadNote = () => {
    api
      .get('note/oneNote?noteID=' + idNote, config)
      .then((response) => {
        setNote(response.data);
      })
      .catch((error) => console.log(error));
  };
  //cargar las etiquetas de una nota
  const loadTagsNote = () => {
    api
      .get('noteToTags/tags?noteID=' + idNote, config)
      .then((response) => {
        setTagsNote(response.data);
      })
      .catch((error) => console.log(error));
  };
  // cargar todas las tags de un usuario
  useEffect(() => {
    loadTagsNote();
  }, []);

  //states
  const handleClose = () => setShow(false);
  const handleShow = () => {
    loadNote();
    setShow(true);
  };
  //render
  return (
    <>
      <Button variant={type} onClick={handleShow}>
        Editar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <input
              defaultValue={note.titleNote}
              className="form-control"
              type="text" /* value={note.titleNote}  */
              onChange={(e) => setNoteTitle(e.target.value)}
            ></input>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <RichEditorExample
              noteTitle={noteTitle}
              noteID={idNote}
              contentHTML={note.contentHTMLNote}
            ></RichEditorExample>
          </div>
          <SelectTags idNote={idNote} tagsInitial={tagsNote}></SelectTags>
        </Modal.Body>
        <Modal.Footer>
          <div className="col text-center">
            <small className="">
              <p>
                Ultima modificación &nbsp;
                {moment(note.modificationDate).format('llll')}
              </p>
            </small>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
