import AddModal from '../../components/AddModal/AddModal';
import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal';
import NoteModal from '../../components/NoteModal/NoteModal';
import AuthService from '../../config/auth.service';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';


export default function HomePage() {
  //states
  const [notes, setNotes] = useState([]);
  const [importantNotes, setImportantNotes] = useState([]);
  //init
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    api
      .get('note/statusNote?statusNote=main', config)
      .then((response) => {
        console.log(response.data)
        setNotes(response.data);
      })
      .catch((error) => console.log(error));
    api
      .get('note/statusNote?statusNote=importante', config)
      .then((response) => {
        
        setImportantNotes(response.data);
      })
      .catch((error) => console.log(error));
    
    
  }, []);
  const user = AuthService.getCurrentUser();
  const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
  let navigate = useNavigate();
  //handlers
  const handlerArchivar = (noteID) => {
    api.patch('note?noteID=' + noteID, {statusNote: "archivado"}, config).then((response)=>{
      navigate('/archivados')
  }).catch((error)=>console.log(error))
  }
  const handlerMoveTrash = (noteID) =>{
    api.patch('note?noteID=' + noteID, {statusNote: "papelera"}, config).then((response)=>{
      navigate('/papelera')
  }).catch((error)=>console.log(error))
  }
  const handlerFijar = (noteID, status) => {
    api.patch('note?noteID=' + noteID, {statusNote: status}, config).then((response)=>{
      window.location.reload()

  }).catch((error)=>console.log(error))
  } 
  //render
  return (
    <div className="container-fluid">
      <div className="row justify-content-end py-3">
        
        <div className="col-2">
          <div className="text-end">
            <AddModal />
          </div>
        </div>
      </div>
      <div className='row row-cols-md-3'>
        <h3 className='pb-3'>Notas importantes</h3>
        {importantNotes.map((impNote, index) => {
          return(
            <div className='col py-3' key={index}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">{impNote.titleNote}</h3>
                </div>
                <div className="card-body">
                  <p className="card-text">{impNote.contentNote.substr(0,239)}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <div>
                    <small className='text-muted'>
                      Creado el&nbsp; 
                      {moment(impNote.creationDate).format('L')}
                    </small>
                  </div>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
                    <ul className="dropdown-menu">
                      <li>
                        <NoteModal idNote={impNote.noteID}/>
                      </li>
                      <li>
                        <EditNoteModal idNote={impNote.noteID}/>
                      </li>
                      <li>
                        <button className='btn' onClick={() => handlerFijar(impNote.noteID, "main")}>Desfijar</button>
                      </li>
                      <li>
                        <button className='btn' onClick={() => handlerArchivar(impNote.noteID)}>Archivar</button>
                      </li>
                      <li>
                        <button className='btn' onClick={() => handlerMoveTrash(impNote.noteID)}>Eliminar</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
        <hr/>
      <div className="row row-cols-md-3">
        {notes.map((note, index) => {
          return (
            <div className="col py-3" key={index}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">{note.titleNote}</h3>
                </div>
                <div className="card-body">
                  <p className="card-text">{note.contentNote.substr(0,239)}</p>
                </div>
                <div className="card-footer d-flex justify-content-between ">
                  <div className='d-flex align-items-center'>
                    <small className='text-muted'>
                      Creado el&nbsp;{moment(note.creationDate).format('L')}
                    </small>
                  </div>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
                    <ul className="dropdown-menu">
                      <li>
                        <NoteModal idNote={note.noteID}/>
                      </li>
                      <li>
                        <EditNoteModal idNote={note.noteID}/>
                      </li>
                      <li>
                        <button className='btn' onClick={() => handlerFijar(note.noteID, "importante")}>Fijar</button>
                      </li>
                      <li>
                        <button className='btn' onClick={() => handlerArchivar(note.noteID)}>Archivar</button>
                      </li>
                      <li>
                        <button className='btn' onClick={() => handlerMoveTrash(note.noteID)}>Eliminar</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
