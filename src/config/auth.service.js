import { api } from './site.config';
import { storageDelete, storageGet } from '../services/storage';
import { createBrowserHistory } from 'history';
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
      })
      .catch((error) => error.response.data);
  }
  logout() {
    storageDelete('user');
    storageDelete('id_token');
    history.push('/');
  }
  registro(user) {
    /*api.post('user', {
      username: user.username,
      password: user.password,
      salt: "abcdefgh",
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => console.log(error));
    //this.login(user);*/
  }
}

export default new AuthService();
