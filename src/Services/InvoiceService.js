import axios from 'axios';
import {API_URL} from '../utils/config';

class InvoiceService {
  constructor() {
    this.baseUrl = API_URL + '/invoice';
  }

  async createInvoice({authToken, payload, customerNumber, customerName}) {
    const uri = `${this.baseUrl}?customer-mobile=${customerNumber}&customer-name=${customerName}`;
    try {
      const response = await axios.post(uri, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
      const data = await error.response.data;
      return data;
    }
  }

  async getInvoice({authToken, pageNo, pageSize}) {
    const uri = `${this.baseUrl}?size=${pageSize}&page=${pageNo}`;
    try {
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

  async getSalesOverview({authtToken, type}) {
    const uri = `${API_URL}/sales-overview?type=${type}`;
    try {
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authtToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
      const data = await error.response.data;
      return data;
    }
  }

  async getReportData({authToken}) {
    try {
      const uri = `${API_URL}/sales-overview/report`;
      const response = await axios.get(uri, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      const data = await error.response.data;
      return data;
    }
  }
}

const invoiceService = new InvoiceService();
export {invoiceService};
