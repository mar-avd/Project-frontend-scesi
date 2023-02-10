import authAction from '../../redux/auth/actions'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './Login.css';

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function Login() {
  //form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [errores, setErrores] = useState(<></>)
  const { login } = authAction;
  //redux
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch()
  const error = () => {
    setErrores(<div className='badge text-bg-danger mt-3 mb-0'>Credenciales no válidas, usuario o contraseña incorrectas</div>)
    setTimeout(() => setErrores(<></>), 3500)
  }
  
  //handlers
  const handleLogin = (data) => {
    const user = {
      username: data.username,
      password: data.password
    }
    if (user) {
      dispatch(login(user));

    } else {
      dispatch((login()))
    }
    if(!isLoggedIn){
      setTimeout(() => error(), 400)
    }
  };

  return (
    <form className='bodyLogin' onSubmit={handleSubmit(handleLogin)}>
      <div className="container-fluid">
        <div className="container d-flex vh-100 justify-content-center align-items-center">
          <div className="text center">
            <div className="form car header text-center">
              <h3 className="titulo">MaiwaNote</h3>
              <div className="entradas">
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Nombre de usuario"
                    {...register('username', { required: true })} />
                  <span className='badge text-bg-danger mt-3 mb-0'>{errors.username?.message}</span>
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="Contraseña"
                    {...register('password', { required: true })} />
                  {/*errors.password && (<span className="badge text-bg-danger">This field is required</span>)*/}
                  <span className='badge text-bg-danger mt-3 mb-0'>{errors.password?.message}</span>
                </div>
              </div>
              <div className="botones mb-3">
                <div className="d-grid gap-2 d-md-block text-center">
                  <RegisterModal className='BotonSignUp large'></RegisterModal>
                </div>
                <div className="d-grid gap-2 d-md-block text-center">
                  <button className="BotonLogin large">Iniciar sesión</button>
                </div>
              </div>
              {errores}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
