import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import DeleteNoteModal from '../../components/DeleteNoteModal/DeleteNoteModal';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

export default function TrashPage() {
  //states
  const [notes, setNotes] = useState([]);
  //init
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    api
      .get('note/statusNote?statusNote=papelera', config)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  //handlers
  let navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const config = {
    headers: { Authorization: `Bearer ${user.token}` },
  };
  const handlerRestore = (noteID) => {
    api
      .patch('note?noteID=' + noteID, { statusNote: 'main' }, config)
      .then(() => {
        window.location.reload()
        // navigate('/');
      })
      .catch((error) => console.log(error));
  };
  //render
  return (
    <div>
      <h3>Papelera</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo</th>
            <th scope="col">Vista previa</th>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Ultima modificación</th>
            <th scope="col">
              <i className="bi bi-check-square-fill"></i>
            </th>
            <th scope="col">
              <i className="bi bi-x-square-fill"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{note.titleNote}</td>
                <td>{note.contentNote.substr(0, 199)}</td>
                <td>{moment(note.creationDate).format('llll')}</td>
                <td>{moment(note.modificationDate).format('llll')}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handlerRestore(note.noteID)}
                  > Recuperar </button>
                </td>
                <td><DeleteNoteModal idNote={note.noteID} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
