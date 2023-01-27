import authAction from '../../redux/auth/actions'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
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

  const { login } = authAction;
  let navigate = useNavigate();
  //redux
  const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const dispatch = useDispatch()
  //effects
  useEffect(() => {
    if (isLoggedIn) {
      return navigate('/archivados')
    }
  }, [isLoggedIn, navigate])
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
                  <input type="text" className="form-control" placeholder="username"
                    {...register('username', { required: true })} />
                  {errors.email && <span className="badge text-bg-danger">This field is required</span>}
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" placeholder="password"
                    {...register('password', { required: true })} />
                  {errors.password && (<span className="badge text-bg-danger">This field is required</span>)}
                </div>
              </div>
              <div className="botones mb-3">
                <div className="d-grid gap-2 d-md-block text-center">
                  <RegisterModal className='BotonSignUp large'></RegisterModal>
                </div>
                <div className="d-grid gap-2 d-md-block text-center">
                  <button className="BotonLogin large">Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
