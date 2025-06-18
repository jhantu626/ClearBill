import axios from 'axios';
import { API_URL } from '../utils/config';

class AuthService {
  constructor() {
    this.baseUrl = API_URL;
  }

  // Loging with google -- (without otp)
  async loginWithGoogle({email}) {
    const uri = `${this.baseUrl}/auth/login/google/${email}`;
    console.log('uri ', uri);
    try {
      const response = await axios.post(uri);
      console.log('response ', response);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      const data = await error.response.data;
      return data;
    }
  }

  // Login with google -- with otp
  async login({email}) {
    const uri = `${this.baseUrl}/auth/login/${email}`;
    console.info(`login uri ${uri}`);
    try {
      const response = await axios.post(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }

  async verifyOtp({email, otp}) {
    const uri = `${this.baseUrl}/auth/verify-otp?email=${email}&otp=${otp}`;
    try {
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      const data = await error.response.data;
      return data;
    }
  }
}

const authService = new AuthService();

export {authService};
