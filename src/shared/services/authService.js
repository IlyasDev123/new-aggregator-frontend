import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const LoginUser = (params) => {
  return HTTP_CLIENT.post(Endpoint.auth.login, params);
};

const Register = (params) => {
  return HTTP_CLIENT.post(Endpoint.auth.register, params);
};

const Logout = () => {
  return HTTP_CLIENT.get('logout');
};

export { LoginUser, Logout, Register };
