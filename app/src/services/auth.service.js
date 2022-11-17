import axios from "axios";

const API_URL = "http://localhost/icetea/api/v1/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "user.php", {
        action: "LOGIN",
        data: {
            username,
            password
        }
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, tel, address, password) {
    return axios.post(API_URL + "user.php", {
      action: "CREATE_USER",
      data: {
        username,
        email,
        tel,
        address,
        password
      }
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
