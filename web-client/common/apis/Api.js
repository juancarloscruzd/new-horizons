import axios from 'axios';

export default class Api {
  _authData = null;

  baseUrl = '/api/new-horizons/services';

  get accessToken() {
    return this.authData?.AccessToken;
  }

  get refreshToken() {
    return this.authData?.RefreshToken;
  }

  get authData() {
    if (!this._authData) {
      const authData = localStorage.getItem('dmc.auth');
      if (authData) {
        this._authData = JSON.parse(atob(authData));
      }
    }

    return this._authData;
  }

  set authData(val) {
    this._authData = val;
    if (val) {
      localStorage.setItem('dmc.auth', btoa(JSON.stringify(val)));
    } else {
      localStorage.removeItem('dmc.auth');
    }
  }

  validateError(error) {
    console.log(error.message);

    if (error.response && error.response.status === 401) {
      localStorage.clear();
    }

    return Promise.reject({
      status: (error.response && error.response.status) || -1,
      message: error.message,
    });
  }

  request({ method, url, payload }) {
    if (!this.accessToken) {
      return Promise.reject({
        status: -1,
        message: 'Access token is required!',
      });
    }

    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };

    return axios({
      method,
      url,
      data: payload,
      headers,
    });
  }

  requestGET(url, options) {
    return this.request({ method: 'get', url });
  }

  requestPOST(url, payload, options) {
    return this.request({ method: 'post', url, payload });
  }

  requestPUT(url, payload, options) {
    return this.request({ method: 'put', url, payload });
  }
}
