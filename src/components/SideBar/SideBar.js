import { Link } from "react-router-dom";

export default function SideBar(){
    let isActive = '';
    return(
        <div>
            <div className="col-3 container">
            <div className="d-flex flex-column flex-shrink-0 p-2 text-bg-secondary">
              <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-4">Notes</span>
              </a>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to='/'>
                    Mis notas
                  </Link>
                </li>
                <li>
                  <Link to="mis-etiquetas" className="nav-link text-white">
                    Etiquetas
                  </Link>
                </li>
                <li>
                  <Link to="archivados" className="nav-link text-white">
                    Archivados
                  </Link>
                </li>
                <li>
                  <Link to='papelera' className="nav-link text-white">
                    Papelera
                  </Link>
                </li>
              </ul>
              <hr />
              <div className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li>
                    <a className="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    )
}