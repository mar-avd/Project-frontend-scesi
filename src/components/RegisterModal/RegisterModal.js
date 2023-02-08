import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './RegisterModal.css';
import { useDispatch } from 'react-redux';
import authAction from '../../redux/auth/actions';
import { api } from '../../config/site.config';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
export default function RegisterModal() {
  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { login } = authAction;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  //handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRegister = (data) => {
    if(data.username !== null && data.password !== null){
      const user = {
        username: data.username,
        password: data.password,
      }
      api.post('user', {
        username: user.username,
        password: user.password
      }).then((response) => {
        dispatch(login(user))
      }).catch((error) => console.log(error));
    }
  };

  //render
  return (
    <span className="">
      <Button className='BotonSignUp' variant='secondary' onClick={handleShow}>
        Sign Up
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title >Regístrate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleRegister)}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                {...register('username', { required: true })}

              />
                <span className='badge text-bg-danger mt-3 mb-0'>{errors.username?.message}</span>
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                {...register('password', { required: true })}
              />
            </div>
            <span className='badge text-bg-danger mt-3 mb-0'>{errors.password?.message}</span>
            <div className='text-end'>
              <button className='btn btn-primary'>Registrarme</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </span>
  );
}
