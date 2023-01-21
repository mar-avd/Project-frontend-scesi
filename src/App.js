//import './App.css';
import './assets/scss/stylesheet.scss';
import Boot from './redux/boot';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TagsPage from './pages/TagsPage/TagsPage';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import TrashPage from './pages/TrashPage/TrashPage';
import SideBar from './components/SideBar/SideBar';
import Login from './pages/Login/Login';
import PrivateRoute from './utility/PrivateRoute';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { api } from './config/site.config';
import AuthService from './config/auth.service';

function App() {
  const isLoggedIn = useSelector((state) => state.Auth.idToken)
  //options
  let sideBarOptions = [
    { option: 'Mis notas', icon: 'bi bi-grid-fill', to: '/' },
    { option: 'Etiquetas', icon: 'bi bi-bookmarks-fill', to: '/mis-etiquetas' },
    { option: 'Archivados', icon: 'bi bi-archive-fill', to: '/archivados' },
    { option: 'Papelera', icon: 'bi bi-trash-fill', to: '/papelera' },
  ];
  const [notesSearch, setNotesSearch] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  //handlers
  const handlerSearch = () => {
    const user = AuthService.getCurrentUser();
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    api.get('note/search?search=' + searchInput, config).then((response) => {
      console.log(response.data)
      setNotesSearch(response.data)
    }).catch((error) => console.log(error))
  }
  //render
  return (
    <BrowserRouter>
      <div className="container-fluid px-0">
        {isLoggedIn ? (<div className="row">
          <div className="col-3">
            <SideBar sideBarOptions={sideBarOptions} />            
          </div>
          <div className="col-9">
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
                      onChange={(e) => {setSearchInput(e.target.value)}}
                    />
                    <button className="btn btn-outline-success" onClick={handlerSearch}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </nav>
            {notesSearch.map((noteSearch, index) => {
              return(
                <div key={index}>
                  <h3>Resultado de la búsqueda</h3>
                  <p>{noteSearch.contentNote}</p>
                  <hr/>
                </div>
              )
            })}
            <Routes>
              <Route index element={<PrivateRoute>
                
                <HomePage />
              </PrivateRoute>
              } />
              <Route path="login" element={<Login />} />
              <Route path="mis-etiquetas" element={<PrivateRoute>

                <TagsPage />
              </PrivateRoute>
              } />
              <Route path="archivados" element={
              <PrivateRoute>

                <ArchivePage />
              </PrivateRoute>
              } />
              <Route
                path="papelera"
                element={
                  <PrivateRoute>
                    <TrashPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>) : (<Login/>)}
        
      </div>
    </BrowserRouter>
  );
}
Boot()
  .then(() => App())
  .catch((error) => console.error(error));

export default App;
