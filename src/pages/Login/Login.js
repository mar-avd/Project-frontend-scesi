import authAction from '../../redux/auth/actions'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

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

  const {login} = authAction;
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
    if(user){
      dispatch(login(user));

    }else{
      dispatch((login()))
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-6">
          <h1 className="text-center">Notes</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-3">
              <label className="form-label">Nombre de usuario</label>
              <input type="text" className="form-control" {...register('username', { required: true })} />
              {errors.email && <span className="badge text-bg-danger">This field is required</span>}

            </div>
              <div className='mb-3'>
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" 
                {...register('password', {required: true})}/>
                {errors.password && (
                    <span className="badge text-bg-danger">This field is required</span>
                  )}
              </div>
          <div className="d-grid gap-2 d-md-block text-center">
            <RegisterModal/>
            <button className="btn btn-primary">Iniciar Sesión</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
