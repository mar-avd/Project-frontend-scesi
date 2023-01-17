import AddModal from '../../components/AddModal/AddModal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect, useState } from 'react';
import { api } from '../../config/site.config';
import EditNoteModal from '../../components/EditNoteModal/EditNoteModal';
import DeleteNoteModal from '../../components/DeleteNoteModal/DeleteNoteModal';
import NoteModal from '../../components/NoteModal/NoteModal';

export default function HomePage() {
  //states
  const [notes, setNotes] = useState([]);
  //init
  useEffect(() => {
    /*api.get('note').then((response) => {
      console.log(response.data);
      //setNotes(response.data);
    }).catch((error) => console.log(error))*/
  }, [])
  //render
  return (
    <div className="container-fluid">
      <div className="row justify-content-between py-3">
        <div className="col-2">
          <DropdownButton variant="outline-primary" id="dropdown-item-button" title="Ordenar por">
            <Dropdown.Item as="button">Fecha de creación</Dropdown.Item>
            <Dropdown.Item as="button">Última modificación</Dropdown.Item>
            <Dropdown.Item as="button">Etiquetas</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="col-2">
          <div className="text-end">
            <AddModal />
          </div>
        </div>
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
                  <li><NoteModal/></li>
                  <li><EditNoteModal/></li>
                  <li><DeleteNoteModal/></li>
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
