import { api } from './site.config';
import { storageDelete, storageGet } from '../services/storage';
import { createBrowserHistory } from 'history';
import Axios from 'axios';
const history = createBrowserHistory();

/**
 * Manages login/register functions at the API
 */
class AuthService {
  getCurrentUser() {
    return { ...storageGet('user'), token: storageGet('id_token') };
  }
  /**
   * Logs in a user
   * @param user
   * @returns {Promise<AxiosResponse<any>>}
   */
  login(user) {
    return api
      .post('auth/singIn', {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        console.log(response.data)
        return response.data;
      });
  }
  logout() {
    storageDelete('user');
    storageDelete('id_token');
    history.push('/');
  }
  register(user) {
    return api.post('auth/register', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
