import axios from 'axios';
import {API_URL} from '../utils/config';

class CustomerService {
  constructor() {
    this.baseUrl = API_URL + '/customer';
  }

  async getCustomerByMobile({authToken, mobile}) {
    const uri = `${this.baseUrl}?mobile=${mobile}`;
    try {
        console.log(uri)
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
}

const customerService = new CustomerService();

export {customerService};
