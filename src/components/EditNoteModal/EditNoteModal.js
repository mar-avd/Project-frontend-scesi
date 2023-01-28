import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import editorNote from './prueba/editorNote';
import RichEditorExample from './prueba/editorNote';
import useTags from './useTags';
import SelectTags from './SelectTags';

export default function EditNoteModal({ idNote }) {
  const [tagsSelected, addTag, deleteTag] = useTags(idNote);
  //states
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({});
  const [tags, setTags] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
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
    /*api.get('noteToTags/tags?noteID=' + idNote, config).then((response) => {
      const tagsNote = response.data;
      let loadCheck = [];
      console.log('estos son los tags')
      console.log(tags)
      console.log("tagsNote", tagsNote)
      const checked = tags.map((tag, index) => {
        return !!(tagsNote.find(tagN => tagN.tags.nameTag === tag.nameTag))
      })
      console.log("checked:", checked)
      setCheckedState(checked);

    }).catch((error) => console.log(error))*/
    /*tags.forEach((tag, index) => {
      if (tagsNote.indexOf(tag.nameTag) !== -1) {
        loadCheck[index] = true;
      } else {
        loadCheck.push(false);
      }
    })*/
  }, []);

  //states
  const handleClose = () => setShow(false);
  /* const handleShow = () => setShow(true); */
  const handleShow = () => {
    loadNote();
    //loadTagsNote()

    setShow(true);
  };
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState)
  }
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
          <input defaultValue={note.titleNote}className='form-control' type='text' /* value={note.titleNote}  */
            onChange={(e) => setNoteTitle(e.target.value)}>
          </input>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <RichEditorExample noteTitle={noteTitle} noteID={idNote} contentHTML={note.contentHTMLNote}></RichEditorExample>
        </div>
           {/* <h4>Cambiar etiquetas:</h4>
            <select className='form-select'>
              <option defaultValue={'selecciona los tags'}>Selecciona los tags</option>
              {tags.map((tag, index) => {
                return(
                  <option value={tag.tagID} key={index} onClick={() => addTag({tagID: tag.tagID, tags: {nameTag: tag.nameTag}})}>{tag.nameTag}</option>
                )
              })}
            </select>
            <div className='my-3'>
              {tagsSelected.map((tagSelect, index) => {
                return(
                  <span className='badge text-bg-primary mx-1' key={index}>{tagSelect.tags.nameTag}
                    <button className='btn-close btn-close-white' onClick={() => deleteTag(tagSelect.tagID)}></button>
                  </span>
                )
              })}
            </div>*/}
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