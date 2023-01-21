import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import authService from "../../config/auth.service";
import authAction from '../../redux/auth/actions';

export default function SideBar({sideBarOptions}){
    let location = useLocation();

    const dispatch = useDispatch();
    const {logout}=authAction;
    const user = authService.getCurrentUser();
    //render
    return(
        <div>
            <div className=" container">
            <div className="d-flex flex-column flex-shrink-0 p-2 text-bg-dark">
              <a
                href="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
              >
                <span className="fs-4">Notes</span>
              </a>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                {sideBarOptions.map((sideBarOption, index) => (
                    <li className="nav-item" key={index}>
                    <Link className={"nav-link " + (sideBarOption.to===location.pathname ? 'active' : '')} to={sideBarOption.to}>
                        <i className={sideBarOption.icon}></i> {sideBarOption.option}
                    </Link>
                    </li>
                ))}
              </ul>
              <hr />
              <div className="dropdown">
                <a
                  href="/"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i> &nbsp;
                  <strong>{user.usernameID}</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li>
                    <button className="dropdown-item" onClick={() => {dispatch(logout())}}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    )
}