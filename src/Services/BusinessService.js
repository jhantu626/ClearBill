import axios from 'axios';
import {API_URL} from '../utils/config';
import { jsx } from 'react/jsx-runtime';

class BusinessService {
  constructor() {
    this.baseUrl = API_URL;
  }

  // Add Business
  async addBusiness({authToken, name, address, gstNo, stateCode, logoImage}) {
    const uri = `${this.baseUrl}/business`;
    const payload = {
      name: name,
      gstNo: gstNo,
      address: address,
      stateCode: stateCode,
    };
    console.log(uri, payload);
    try {
      const formData = new FormData();
      formData.append('businessDetails', JSON.stringify(payload));
      formData.append('logo', logoImage);
      console.log('formData ', formData);
      const response = await axios.post(uri, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
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

  // Update Business
  async updateBusiness({
    authToken,
    id,
    name,
    address,
    gstNo,
    stateCode,
    image = null,
  }) {
    console.log("image",image)
    const params = {
      id: id,
      name: name,
      address: address,
      gstNo: gstNo,
      stateCode: stateCode,
    };
    const uri = `${this.baseUrl}/business`;
    const payload = new FormData();
    payload.append("business",JSON.stringify(params))
    console.log(authToken)
    if (image) {
      payload.append('logo', image);
    }
    console.log("payload",payload)
    try {
      const response = await axios.patch(uri, payload, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
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

const businessService = new BusinessService();

export {businessService};
