import Api from './Api';

class ProductsAPI extends Api {
  apiUrl = `${this.baseUrl}/products`;

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
      payload.available = true;
      payload.status = 'active';
      payload.theoretical_hours = parseFloat(payload.theoretical_hours);
      payload.practical_hours = parseFloat(payload.practical_hours);
      payload.price = parseFloat(payload.price);
      const res = await this.requestPOST(this.apiUrl, payload);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }

  async update(id, payload) {
    try {
      payload.id = id;
      payload.available = true;
      payload.status = 'active';
      payload.theoretical_hours = parseFloat(payload.theoretical_hours);
      payload.practical_hours = parseFloat(payload.practical_hours);
      payload.price = parseFloat(payload.price);
      const res = await this.requestPUT(`${this.apiUrl}/${id}`, payload);
      return res.data;
    } catch (error) {
      return this.validateError(error);
    }
  }
}

export default new ProductsAPI();
