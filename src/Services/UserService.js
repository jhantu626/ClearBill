import axios from 'axios';
import {API_URL} from '../utils/config';

class UserService {
  constructor() {
    this.baseUrl = API_URL;
  }

  // Get User Data
  async getProfile({authToken}) {
    const uri = `${this.baseUrl}/user`;
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

  // add staff generate otp
  async generateOtpForNewUser({authToken, email}) {
    const uri = `${this.baseUrl}/user/add-user/${email}`;
    try {
      const response = await axios.post(
        uri,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
  
  async generateOtpForUpdateUser({authToken, email}) {
    const uri = `${this.baseUrl}/user/update-user/verify/${email}`;
    try {
      const response = await axios.get(
        uri,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error)
      const data = await error.response.data;
      return data;
    }
  }

  async addUser({authToken, name, email, phone}) {
    const uri = `${this.baseUrl}/user/add-user/verify`;
    const payload = {
      name: name,
      email: email,
      phone: phone,
    };
    try {
      const response = await axios.post(uri, payload, {
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

  // Users by business
  async getUsersByBusiness({authToken}) {
    const uri = `${this.baseUrl}/user/business`;
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

  // Update user
  async updateUser({authToken, id, name,
     email, phone}) {
    const uri = `${this.baseUrl}/user`;
    const payload = {
      id: id,
      name: name,
      email: email,
      phone: phone,
    };
    console.log(uri, payload);
    try {
      const response = await axios.put(uri, payload, {
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

const userService = new UserService();

export {userService};
