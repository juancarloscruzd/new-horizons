import Api from './Api';

class StaffAPI extends Api {
  apiUrl = `${this.baseUrl}/employees`;

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
      if (res.data && res.data.dob) {
        res.data.dob = res.data.dob.split('T')[0];
      }
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }

  async save(payload) {
    try {
      const res = await this.requestPOST(this.apiUrl, payload);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }

  async update(id, payload) {
    try {
      payload.id = id;
      const res = await this.requestPUT(`${this.apiUrl}/${id}`, payload);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }
}

export default new StaffAPI();
