import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import moment from 'moment/moment';
import 'moment/locale/es';
import DeleteNoteModal from '../DeleteNoteModal/DeleteNoteModal';
import EditNoteModal from '../EditNoteModal/EditNoteModal';

export default function NoteModal({ idNote }) {
  moment.locale('es');
  //states
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({});
  const [tags, setTags] = useState([]);
  //
  const user = AuthService.getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  useEffect(() => {
    loadNote()
  }, [])
  const loadNote = () => {
    api
      .get('note/oneNote?noteID=' + idNote, config)
      .then((response) => {
        setNote(response.data);
      })
      .catch((error) => console.log(error));
  };
  const loadTags = () => {
    api.get('noteToTags/tags?noteID=' + note.noteID, config).then((response) => {
      setTags(response.data)
    }).catch((error) => console.log(error))
  }
  //states
  const handleClose = () => setShow(false);
  const handleShow = () => {
    loadTags();
    setShow(true);
  };
  const handleDelete =() => {
    api
      .patch('note?noteID=' + idNote, { statusNote: 'papelera' }, config)
      .then((response) => {
        setTimeout(() => { window.location.reload() }, 3000);
        // navigate('/papelera');
      })
      .catch((error) => console.log(error));
  }
  //render
  return (
    <>
      <Button variant="btn dropdown-item" onClick={handleShow}>
        Ver nota
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{note.titleNote}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p dangerouslySetInnerHTML={{ __html: note.contentHTMLNote }}></p>
          <div>
            {tags.map((tag, index) => {
              return(<span className="badge text-bg-primary mx-1" key={index}>{tag.tags.nameTag}</span>)
            })}
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="row justify-content-between">
            <div className="col-12">
              <small className="">
                <p>
                  Ultima modificación &nbsp;
                  {moment(note.modificationDate).format('llll')}
                </p>
              </small>
            </div>
            <div className="col text-end">
              <button className='btn btn-secondary' onClick={handleDelete}>Eliminar</button>
              <EditNoteModal idNote={idNote} type={'primary'}/>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
