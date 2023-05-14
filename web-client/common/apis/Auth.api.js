import axios from 'axios';

import Api from './Api';

class AuthAPI extends Api {
  apiUrl = 'https://cognito-idp.us-east-1.amazonaws.com';

  async login(username, password) {
    // const payload = {
    //   AuthParameters: {
    //     USERNAME: username,
    //     PASSWORD: password,
    //   },
    //   AuthFlow: 'USER_PASSWORD_AUTH',
    //   ClientId: '2n1fcan8iievk9nrl1td3c5aq4',
    // };

    // const headers = {
    //   'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
    //   'Content-Type': 'application/x-amz-json-1.1',
    // };

    try {
      // const res = await axios.post(this.apiUrl, payload, { headers });
      // if (!res.data.AuthenticationResult) {
      //   throw new Error('Login failed!');
      // }

      this.authData = { AccessToken: 'dummy', RefreshToken: 'dummy' };
      localStorage.setItem('dmc.user', JSON.stringify({ username }));

      return true;
    } catch (error) {
      return this.validateError(error);
    }
  }

  async logout() {
    this.authData = null;
    localStorage.clear();
  }
}

export default new AuthAPI();
