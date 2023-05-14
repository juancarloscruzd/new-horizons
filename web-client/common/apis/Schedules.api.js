import Api from './Api';

class SchedulesAPI extends Api {
  apiUrl = `${this.baseUrl}/schedules`;

  async getAll() {
    try {
      const res = await this.requestGET(`${this.apiUrl}/calendar`);
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
      payload.termId = parseInt(payload.termId, 10);
      payload.productId = parseInt(payload.productId, 10);
      payload.teacherId = parseInt(payload.teacherId, 10);
      payload.iteration = parseInt(payload.iteration, 10);
      const res = await this.requestPOST(this.apiUrl, payload);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }

  async getCalendar() {
    try {
      const res = await this.requestGET(`${this.apiUrl}/calendar`);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }
}

export default new SchedulesAPI();
