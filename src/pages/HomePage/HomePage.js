import AddModal from '../../components/AddModal/AddModal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal';
import DeleteNoteModal from '../../components/DeleteNoteModal/DeleteNoteModal';
import NoteModal from '../../components/NoteModal/NoteModal';
import AuthService from '../../config/auth.service';

export default function HomePage() {
  //states
  const [notes, setNotes] = useState([]);
  //init
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    api
      .get('note', config)
      .then((response) => {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  //render
  return (
    <div className="container-fluid">
      <div className="row justify-content-between py-3">
        <div className="col-2">
          <DropdownButton variant="outline-primary" id="dropdown-item-button" title="Ordenar por">
            <Dropdown.Item as="button">Fecha de creación</Dropdown.Item>
            <Dropdown.Item as="button">Última modificación</Dropdown.Item>
            <Dropdown.Item as="button">Etiquetas</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="col-2">
          <div className="text-end">
            <AddModal />
          </div>
        </div>
      </div>

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
                <div className="card-footer d-flex justify-content-between">
                  <div>

                <span className="badge text-bg-dark">etiqueta1</span>
                  </div>
                  <div className="dropdown">
                    <button className="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
                    <ul className="dropdown-menu">
                      <li>
                        <NoteModal />
                      </li>
                      <li>
                        <EditNoteModal />
                      </li>
                      <li>
                        <DeleteNoteModal idNote={note.noteID}/>
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
