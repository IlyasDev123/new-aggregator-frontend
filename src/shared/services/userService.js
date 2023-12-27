import { Endpoint } from 'shared/utils/endpoints';
import { HTTP_CLIENT } from 'shared/utils/interceptor';

const updateProfile = (params) => {
  return HTTP_CLIENT.post(Endpoint.profile.updateProfile, params);
};

const changePassword = (params) => {
  return HTTP_CLIENT.post(Endpoint.profile.changePassword, params);
};

const setPreferences = (params) => {
  return HTTP_CLIENT.post(Endpoint.preferences.setPreferences, params);
};

export { updateProfile, changePassword, setPreferences };
