import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { api } from "../../config/site.config";
import AuthService from '../../config/auth.service';
import { useNavigate } from "react-router-dom";

export default function EditTagModal(props) {
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
    const [nameTag, setNameTag] = useState("");

    function handleSubmit() {
        console.log(nameTag);
        setNameTag("");
    };

    const newNameTag = (tagID) => {
        api.patch(`tag?tagID=${tagID}`, {
            nameTag: nameTag,
        }, config).then((response) => {
            // console.log(response);
            handleSubmit();
            window.location.reload();
        }).catch((error) => console.log(error))
    }

    //render
    return (
        <div>
            <Button variant='light' onClick={handleShow}>
                <i className="bi bi-magic"></i>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='nameTag'>
                        <input type='text' className='form-control' placeholder='Nombre de etiqueta' required
                            onChange={(e) => setNameTag(e.target.value)}
                            value={nameTag} />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button className='btnClose' variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => newNameTag(props.tagID)}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
