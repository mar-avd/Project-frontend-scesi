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
import SearchComponent from './components/SearchComponent/SearchComponent';

function App() {
  const isLoggedIn = useSelector((state) => state.Auth.idToken)
  //options
  let sideBarOptions = [
    { option: 'Mis notas', icon: 'bi bi-grid-fill', to: '/' },
    { option: 'Etiquetas', icon: 'bi bi-bookmarks-fill', to: '/mis-etiquetas' },
    { option: 'Archivados', icon: 'bi bi-archive-fill', to: '/archivados' },
    { option: 'Papelera', icon: 'bi bi-trash-fill', to: '/papelera' },
  ];
  
  //render
  return (
    <BrowserRouter>
      <div className="container-fluid px-0">
        {isLoggedIn ? (<div className="row">
          <div className="col-3">
            <SideBar sideBarOptions={sideBarOptions} />            
          </div>
          <div className="col-9">
            <SearchComponent/>
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
