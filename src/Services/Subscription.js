import axios from 'axios';
import {API_URL} from '../utils/config';

class Subscription {
  constructor() {
    this.baseUrl = API_URL;
  }

  // GET CURRENT SUBSCRIPTION
  async getCurrentSubscription({authToken}) {
    const uri = `${this.baseUrl}/subscription`;
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

  // UPGRADE SUBSCRIPTION
  async upgradeSubscription({authToken, payload, type}) {
    const uri = `${this.baseUrl}/subscription?type=${type}`;
    console.log(uri, payload);
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
}

const subscription = new Subscription();
export {subscription};
