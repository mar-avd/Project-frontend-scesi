//import './App.css';
import './assets/scss/stylesheet.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import TagsPage from './pages/TagsPage/TagsPage';
import ArchivePage from './pages/ArchivePage/ArchivePage';
import TrashPage from './pages/TrashPage/TrashPage';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid px-0">
        <div className="row">
          <SideBar/>
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
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </nav>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="mis-etiquetas" element={<TagsPage />} />
              <Route path="archivados" element={<ArchivePage />} />
              <Route path="papelera" element={<TrashPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
