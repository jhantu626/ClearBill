import axios from 'axios';
import {API_URL} from '../utils/config';
class ProductService {
  constructor() {
    this.baseUrl = API_URL;
  }

  async addProduct({
    authToken,
    name,
    description,
    isTaxable,
    hsnCode,
    unitType,
    price,
    discount,
    logo,
    igst,
    cgst,
    sgst,
  }) {
    const uri = `${this.baseUrl}/product`;
    const payload = {
      name: name,
      description: description,
      isTaxable: isTaxable,
      hsnCode: hsnCode,
      unitType: unitType,
      price: price,
      discount: discount,
      igst: igst,
      cgst: cgst,
      sgst: sgst,
    };

    console.log('uri,payload', uri, payload);

    try {
      const formData = new FormData();
      formData.append('product', JSON.stringify(payload));
      formData.append('image', logo);
      const resposne = await axios.post(uri, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await resposne.data;
      return data;
    } catch (error) {
      console.log(error);
      const data = await error.response.data;
      return data;
    }
  }

  // ALL PRODUCTS
  async getProducts({authToken}) {
    const uri = `${this.baseUrl}/product`;
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

  // Update without image
  async updateProduct({
    authToken,
    id,
    name,
    description,
    isTaxable,
    hsnCode,
    unitType,
    price,
    discount,
    igst,
    cgst,
    sgst,
  }) {
    const uri = `${this.baseUrl}/product`;
    const payload = {
      id: id,
      name: name,
      description: description,
      isTaxable: isTaxable,
      hsnCode: hsnCode,
      unitType: unitType,
      price: price,
      discount: discount,
      cgst: cgst,
      sgst: sgst,
      igst: igst,
    };
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

  // Update with image
  async updateProductWithImage({
    authToken,
    id,
    name,
    description,
    isTaxable,
    hsnCode,
    unitType,
    price,
    discount,
    igst,
    cgst,
    sgst,
    image,
  }) {
    const uri = `${this.baseUrl}/product/image`;
    const payload = {
      id: id,
      name: name,
      description: description,
      isTaxable: isTaxable,
      hsnCode: hsnCode,
      unitType: unitType,
      price: price,
      discount: discount,
      cgst: cgst,
      sgst: sgst,
      igst: igst,
    };
    const formData = new FormData();
    formData.append('product', JSON.stringify(payload));
    formData.append('image', image);
    try {
      const response = await axios.put(uri, formData, {
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

const productService = new ProductService();

export {productService};
