import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import DeleteNoteModal from '../../components/DeleteNoteModal/DeleteNoteModal';

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
      .get('note/papelera', config)
      .then((response) => {
        setNotes(response.data)
      })
      .catch((error) => console.log(error));
  }, []);
  //handlers
  const handlerRestore = (noteID) => {};
  //render
  return (
    <div>
      <h3>Papelera</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo</th>
            <th scope="col">Overview</th>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Ultima modificación</th>
            <th scope="col">
              <i className="bi bi-check-square-fill"></i>
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
                <td>{note.creationDate}</td>
                <td>{note.modificationDate}</td>
                <td>
                  <div>
                    <button className="btn btn-secondary" onClick={handlerRestore(note.noteID)}>Recuperar</button>
                    <DeleteNoteModal idNote={note.noteID}/>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
