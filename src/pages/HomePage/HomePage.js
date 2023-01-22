import AddModal from '../../components/AddModal/AddModal';
import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import NoteCard from '../../components/NoteCard/NoteCard';

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

  //handlers

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
      <div className="row row-cols-md-3">
        <h3 className="pb-3">Notas importantes</h3>
        {importantNotes.map((impNote, index) => {
          return <NoteCard key={index} note={impNote} />;
        })}
      </div>
      <hr />
      <div className="row row-cols-md-3">
        {notes.map((note, index) => {
          return <NoteCard key={index} note={note} />;
        })}
      </div>
    </div>
  );
}
