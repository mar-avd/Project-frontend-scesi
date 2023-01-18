import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './RegisterModal.css';

const schema = yup
.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
})
.required();
export default function RegisterModal(){
  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
    const [show, setShow] = useState(false);
  //handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRegister = () => {};
  
  //render
    return(<span className=''>
        <Button className='BotonSignUp' variant='secondary' onClick={handleShow}>
        Sign Up
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Regístrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input type='email' className='form-control' {...register('email', { required: true })}/>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Contraseña</label>
              <input type='password' className='form-control' {...register('password', {required: true})}/>
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Registrarme
          </Button>
        </Modal.Footer>
      </Modal>
    </span>)
}