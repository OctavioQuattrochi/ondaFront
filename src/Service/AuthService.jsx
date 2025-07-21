import axios from "axios";

const API_URL = "http://localhost:8123";

const AuthService = {
  async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        username,
        password,
      });
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }
    ,
    async register(name, email, password, lastname, password_confirmation) {
    try {
      const response = await axios.post(`${API_URL}/api/register`, {
        name,
        email, 
        password, 
        lastname, 
        password_confirmation
      });
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
}
};
export default AuthService;