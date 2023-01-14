import { Modal } from 'bootstrap';
import ModalButton from '../../components/Modal/ModalButton';
import ModalB from '../../components/ModalB/ModalB';

export default function HomePage() {
  //modal Delete footer
  const modalFooter = (
    <>
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
        Cerrar
      </button>
      <button type="button" className="btn btn-primary">
        Eliminar Producto
      </button>
    </>
  );

  //render
  return (
    <div className="container-fluid">
      <div className="row justify-content-between py-3">
        <div className="col-2">
          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown-order"
              aria-expanded="false"
            >
              Ordenar por
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" href="/">
                  Action
                </button>
              </li>
              <li>
                <button className="dropdown-item" href="/">
                  Another action
                </button>
              </li>
              <li>
                <button className="dropdown-item" href="/">
                  Something else here
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-2">
          <div className="text-end">
            <button className="btn">
              <i className="bi bi-plus-circle-fill"></i>
            </button>
          </div>
        </div>
      </div>
      <div>
        <ModalB/>
      </div>
      <div className="row row-cols-md-3">
        <div className="col py-3">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Titulo</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam perferendis
                voluptas itaque sed maiores saepe, nulla vel eaque vero. Facere consectetur, laborum
                doloremque eos deserunt voluptates autem accusamus corporis iste?
              </p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-primary">Etiqueta</button>
              <div className="dropdown">
                <button className="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
                <ul className="dropdown-menu">
                  <li>
                    Editar
                  </li>
                  <li>
                    Eliminar
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col py-3">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Titulo</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam perferendis
                voluptas itaque sed maiores saepe, nulla vel eaque vero. Facere consectetur, laborum
                doloremque eos deserunt voluptates autem accusamus corporis iste?
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Etiqueta</button>
            </div>
          </div>
        </div>
        <div className="col py-3">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Titulo</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam perferendis
                voluptas itaque sed maiores saepe, nulla vel eaque vero. Facere consectetur, laborum
                doloremque eos deserunt voluptates autem accusamus corporis iste?
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Etiqueta</button>
            </div>
          </div>
        </div>
        <div className="col py-3">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Titulo</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam perferendis
                voluptas itaque sed maiores saepe, nulla vel eaque vero. Facere consectetur, laborum
                doloremque eos deserunt voluptates autem accusamus corporis iste?
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Etiqueta</button>
            </div>
          </div>
        </div>
        <div className="col py-3">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Titulo</h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam perferendis
                voluptas itaque sed maiores saepe, nulla vel eaque vero. Facere consectetur, laborum
                doloremque eos deserunt voluptates autem accusamus corporis iste?
              </p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary">Etiqueta</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
