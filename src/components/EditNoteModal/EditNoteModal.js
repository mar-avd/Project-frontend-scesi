import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import SetEditorText from './SetEditorText';
import SelectTags from './SelectTags';

export default function EditNoteModal({ idNote }) {
  //states
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({});
  const [tags, setTags] = useState([]);
  const [checkedState] = useState([]);
  const [tagsNote, setTagsNote] = useState([])
  //
  /* Set Datos imput */
  const [noteTitle, setNoteTitle] = useState('');
  //const [noteContent, setNoteContent] = useState('');
  //

  const user = AuthService.getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  // cargar notas

  const loadNote = () => {
    api
      .get('note/oneNote?noteID=' + idNote, config)
      .then((response) => {
        setNote(response.data);
      })
      .catch((error) => console.log(error));
  };
  //cargar las etiquetas de una nota
  //let tagsNote = []
  const loadTagsNote = () => {
    api.get('noteToTags/tags?noteID=' + idNote, config).then((response) => {
      setTagsNote(response.data);
    }).catch((error) => console.log(error))
  }
  // cargar todas las tags de un usuario
  const loadTags = () => {
    api
      .get('tag', config)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    loadTags();
    loadTagsNote();
  }, []);

  //states
  const handleClose = () => setShow(false);
  const handleShow = () => {
    loadNote();
    setShow(true);
  };

  const handleSaveTags = () => {
    checkedState.forEach((item, index) => {
      if (item) {
        api.post('noteToTags', { noteID: idNote, tagID: tags[index].tagID }, config).catch((error) => console.log(error))
      } else {
        api.delete('noteToTags', { noteID: idNote, tagID: tags[index].tagID }, config).catch((error) => console.log(error))
      }
    })
  }
  //render
  return (<>
    <Button variant='btn dropdown-item' onClick={handleShow}>
      Editar
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <input defaultValue={note.titleNote} className='form-control' type='text' /* value={note.titleNote}  */
            onChange={(e) => setNoteTitle(e.target.value)}>
          </input>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <SetEditorText noteTitle={noteTitle} noteID={idNote} contentHTML={note.contentHTMLNote}></SetEditorText>
        </div>
        <div className='text-end'>
          <button className='btn btn-sm btn-primary' onClick={handleSaveTags}><i className='bi bi-tag'></i> Asignar etiquetas</button>
        </div>
        <SelectTags idNote={idNote} tagsInitial={tagsNote}></SelectTags>
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