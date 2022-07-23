import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
export default class ApiService {
  public API_NEST_URL = "http://localhost:4000/";

  http: AxiosInstance = axios.create({
    timeout: 50000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${Cookies.get('token')}`
    },
    baseURL: this.API_NEST_URL,
  });
}

// export const api = new ApiService();
