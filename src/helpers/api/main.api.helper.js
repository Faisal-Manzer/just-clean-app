import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import {saveToken} from 'actions/auth.action';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

const REFRESH_ACCESS_TOKEN = 'auth/token/refresh/';

const signInAgainNotification = () => {};
const errorGettingUserInfoNotification = () => {};

export const loadOpenUrl = async (url, config = {}) => {
  return new Promise((resolve, reject) => {
    axios(url, config)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response));
  });
};

const getAccessToken = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const data = reactLocalStorage.getObject('API_TOKENS');
    console.log(data, 'DATA Token');

    if (!data) return reject('No User found');

    let accessToken = '';
    const expires = new Date(data.expires);
    const currentTime = new Date();
    console.log(expires, currentTime, 'Expires');

    if (expires > currentTime) {
      accessToken = data.access;

    } else {
      try {
        console.log('Getting new token');
        const newToken = await loadOpenUrl(REFRESH_ACCESS_TOKEN, {
          method: 'post',
          data: {
            refresh: data.refresh,
          },
        });
        accessToken = newToken.access;

        saveToken(data);

      } catch (e) {
        try {
          if (e.data.code === 'token_not_valid') signInAgainNotification();
          else errorGettingUserInfoNotification();
        } catch (er) {
          // pass
        }

        return reject('Error refreshing token');
      }
    }

    return resolve(accessToken);
  });
};

export const loadSecureUrl = (url, config = {}) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const data = await loadOpenUrl(url, {
        ...config,
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      });
      return resolve(data);
    } catch (e) {
      return reject(e);
    }
  });
};


export const signInWithOtp = (username, otp) => loadOpenUrl('/auth/sign-in/otp/', {
  method: 'POST',
  data: {
    username,
    otp
  }
});

export const signInWithPassword = (username, password) => loadOpenUrl('/auth/sign-in/password/', {
  method: 'POST',
  data: {
    username,
    password
  }
});

export const userMeta = () => loadSecureUrl('/auth/meta/');
