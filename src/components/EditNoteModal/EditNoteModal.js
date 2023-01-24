import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import editorNote from './prueba/editorNote';
import RichEditorExample from './prueba/editorNote';

export default function EditNoteModal({ idNote }) {
  //states
  const [show, setShow] = useState(false);
  const [note, setNote] = useState({});
  const [tags, setTags] = useState([]);
  const [checkedState, setCheckedState] = useState([]);
  //
  /* Set Datos imput */
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
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
  /*const loadTagsNote = () => {
    api.get('noteToTags/tags?noteID=' + idNote, config).then((response) => {
      tagsNote = response.data;
    }).catch((error) => console.log(error))
  }*/
  // cargar todas las tags de un usuario
  /*const loadTags = () => {
    api
      .get('tag', config)
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => console.log(error));
  };*/
  const [allTags, setAllTags] = useState([]);
  const [noteTags, setNoteTags] = useState([]);
  const loadingTags = () => {
    let aux = [];
    api
      .get('tag', config)
      .then((response) => {
        setAllTags(response.data);
      })
      .catch((error) => console.log(error));
    api.get('noteToTags/tags?noteID=' + idNote, config).then((response) => {
      response.data.forEach(item => {
        aux.push(item.tagID);
      });
      setNoteTags(aux);
    }).catch((error) => console.log(error))
    allTags.forEach(tag => {
      if(noteTags.indexOf(tag.tagID) !== -1){
        tag['isChecked'] = true;
      }else{
        tag['isChecked'] = false;
      }
    })
  }
  useEffect(() => {
    loadingTags();
    setTags(allTags);
     console.log(noteTags)
    //setCheckedState(allTags)
    /*let loadCheck = [];
        tags.forEach((tag, index) => {
          if(tagsNote.indexOf(tag.nameTag) ===! -1){
            loadCheck[index] = true;
          }else{
            loadCheck.push(false);
          }
        })
        console.log(loadCheck)
        setCheckedState(loadCheck);*/
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
  const handleSaveTags = ()=>{
    //console.log(checkedState);
    checkedState.forEach((item, index) => {
      if(item === true){
        //console.log(tags[index].tagID)
        api.post('noteToTags',{noteID: idNote, tagID: tags[index].tagID}, config).then((response) => console.log('ok')).catch((error) => console.log(error))
      }else{
        api.delete('noteToTags', {noteID: idNote, tagID: tags[index].tagID}, config).then((response) => console.log('ok, eliminado')).catch((error) => console.log(error))
      }
    })
    window.location.reload();
  }
  //render
  return (<>
    <Button variant='btn dropdown-item' onClick={handleShow}>
      Editar
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <input className='form-control' type='text' defaultValue={note.titleNote}
            onChange={(e) => setNoteTitle(e.target.value)}>
          </input>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container'>
          <RichEditorExample noteID={idNote} contentHTML={note.contentHTMLNote}></RichEditorExample>
        </div>
        <div>
            <h4>Cambiar etiquetas:</h4>
            {tags.map((tag, index) => {
              return (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={tag.nameTag}
                    defaulChecked={tag.isChecked}
                    id={'defaultCheck' + index}
                    onChange={() => handleOnChange(index)}
                  />
                  <label className="form-check-label" htmlFor={'defaultCheck' + index}>
                    {tag.nameTag}
                  </label>
                </div>
              );
            })}
            <div className='text-end'>
              <button className='btn btn-sm btn-primary' onClick={handleSaveTags}><i className='bi bi-tag'></i> Asignar etiquetas</button>
            </div>
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
