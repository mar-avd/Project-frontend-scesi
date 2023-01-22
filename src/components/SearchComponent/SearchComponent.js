import { useState } from 'react';
import { api } from '../../config/site.config';
import AuthService from '../../config/auth.service';
import NoteCard from '../NoteCard/NoteCard';

export default function SearchComponent() {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState(<></>);

  const loadNotes = () => {
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    api
      .get('note/search?search=' + searchInput, config)
      .then((response) => {
        let notes = response.data;
        setResults(
            <div className="row justify-content-between">
              <div className="col">
                <h3>Resultados de la búsqueda</h3>
              </div>
              <div className="col text-end">
                <button className="btn-close" onClick={handlerClose}></button>
              </div>
              {notes.length > 0 ? (
                <div className="row row-cols-md-3">
                  {notes.map((note, index) => {
                    return <NoteCard note={note} key={index} />;
                  })}
                </div>
              ) : (
                <div className='text-center'>No se encontraron resultados</div>
              )}
            </div>,
          );
      })
      .catch((error) => console.log(error));
  };
  //handlers
  const handlerSearch = () => {
    loadNotes();
    setSearchInput('');
  };
  const handlerClose = () => {
    setResults(<></>);
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
              />
              <button className="btn btn-outline-success" onClick={handlerSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </nav>

      {results}
    </>
  );
}
