import axios from "axios";

const API_URL = "http://localhost:8123";

const AuthService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
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
  },

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
  },

  async getOrders() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.access_token;
      const response = await axios.get(`${API_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      throw error;
    }
  },

  async getRawMaterials() {
    try {
      const response = await axios.get(`${API_URL}/api/raw-materials`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener materias primas:", error);
      throw error;
    }
  },

  async getPredefinedProducts() {
    try {
      const response = await axios.get(`${API_URL}/api/predefined-products`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos predefinidos:", error);
      throw error;
    }
  },

  async getProducts() {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  },

  async getPersonalizados() {
    // Si tienes un endpoint para personalizados, usa ese.
    // Si no, filtra los productos por algún campo especial en el frontend.
    try {
      const response = await axios.get(`${API_URL}/api/products?type=personalizado`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener personalizados:", error);
      throw error;
    }
  },

  async createProduct(productData) {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.access_token;
      const response = await axios.post(`${API_URL}/api/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  }
};

export default AuthService;