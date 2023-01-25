import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from "../../config/site.config";
import AuthService from '../../config/auth.service';
import { useNavigate } from "react-router-dom";

export default function ConfirmDelete(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // navegacion
    // let navigate = useNavigate(); No lo uso

    // Verificacion de usr con Token
    const user = AuthService.getCurrentUser();
    const config = {
        headers: { Authorization: `Bearer ${user.token}` },
    };

    /* Set Datos imput */
    const [nameTag, deleteElement] = useState("");

    function handleSubmit() {
        deleteElement("");
    };

    const confirmDelete = (elementID) => {
        api.delete(`tag?tagID=${elementID}`, config).then(() => {
            window.location.reload()
        }).catch((error) => console.log(error))
    }

    //render
    return (
        <div>
            <Button variant='light' onClick={handleShow}>
                <i class="bi bi-x-octagon-fill"></i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='nameTag'>
                        <h5>
                            Recuerda que al borrar esta etiqueta, también se eliminará
                            de las notas en las que estaba asignada <b>¿Estás seguro de eliminar la etiqueta?</b>
                        </h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button className='btnClose' variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="btn btn-warning" onClick={() => confirmDelete(props.elementID)}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
