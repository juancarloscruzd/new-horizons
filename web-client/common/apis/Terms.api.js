import Api from './Api';

class TermsAPI extends Api {
  apiUrl = `${this.baseUrl}/terms`;

  async getAll() {
    try {
      const res = await this.requestGET(this.apiUrl);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }

  async getById(id) {
    try {
      const res = await this.requestGET(`${this.apiUrl}/${id}`);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }

  async save(payload) {
    try {
      payload.non_working_days = payload.non_working_days.join(',');
      payload.status = 'active';
      const res = await this.requestPOST(this.apiUrl, payload);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }
}

export default new TermsAPI();
