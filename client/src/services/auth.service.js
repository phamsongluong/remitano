import axios from "axios";
const API_URL = "https://luongpham-remitano.herokuapp.com/api/auth/";
class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    return axios
      .get("https://luongpham-remitano.herokuapp.com/")
      .then((response) => {
        
      });
  }
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}
export default new AuthService();