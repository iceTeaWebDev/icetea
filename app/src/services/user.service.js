import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost/icetea/api/v1/";

class UserService {
  getHotelBySearch(address, check_in_date, check_out_date, rooms) {
    return axios.post(API_URL + "hotel.php", {
      action: "SEARCH_HOTEL",
      data: {
        address,
        check_in_date,
        check_out_date,
        rooms
      }
    })
  }

  getHotelById(hotel_id) {
    return axios.post(API_URL + "hotel.php", {
      action: "GET_ONE_HOTEL",
      data: {
        hotel_id
      }
    }, { headers: authHeader() })
  }

  getUserBoard() {
    return axios.post(API_URL + 'user.php', { action: "GET_ALL_USER" }, { headers: authHeader() });
  }

  getHotelBoard() {
    return axios.post(API_URL + 'hotel.php', { action: "GET_ALL_HOTEL" }, { headers: authHeader() });
  }

  getRoomBoard() {
    return axios.post(API_URL + 'room.php', { action: "GET_ALL_ROOM" }, { headers: authHeader() });
  }

  getServiceBoard() {
    return axios.post(API_URL + 'service.php', { action: "GET_ALL_SERVICE" }, { headers: authHeader() });
  }

  getBillBoard() {
    return axios.post(API_URL + 'bill.php', { action: "GET_ALL_BILL" }, { headers: authHeader() });
  }

  getCommentBoard() {
    return axios.post(API_URL + 'comment.php', { action: "GET_ALL_COMMENT" }, { headers: authHeader() });
  }

  createHotel(hotel_name, hotel_rate, hotel_address, hotel_image, hotel_description) {
    let formData = new FormData();
    formData.append("hotel_image", hotel_image);
    formData.append("hotel_name", hotel_name);
    formData.append("hotel_rate", hotel_rate);
    formData.append("hotel_address", hotel_address);
    formData.append("hotel_description", hotel_description);
    formData.append("action", 'CREATE_HOTEL');
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(API_URL + 'hotel.php',formData, { headers: {"Content-Type": "multipart/form-data" } });
  }


}

export default new UserService();
