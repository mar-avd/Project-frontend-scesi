import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RegisterModal from '../../components/RegisterModal/RegisterModal';

const schema = yup
  .object({
    email: yup.string().email().required(),
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

  //handlers
  const handleLogin = (data) => {};

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-6">
          <h1 className="text-center">Notes</h1>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" {...register('email', { required: true })} />
              {errors.email && <span className="badge text-bg-danger">This field is required</span>}
              <div className='mb-3'>
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" 
                {...register('password', {required: true})}/>
                {errors.password && (
                    <span className="badge text-bg-danger">This field is required</span>
                  )}

              </div>
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
