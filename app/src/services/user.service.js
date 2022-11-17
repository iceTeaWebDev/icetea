import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost/project1/api/v1/';

class UserService {
  getHotelBySearch() {
    return axios.post(API_URL + "hotel.php", {
      action: "SEARCH_HOTEL",
      data: {
        "address": "",
        "check_in_date": "",
        "check_out_date": ""
      }
    })
  }
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
