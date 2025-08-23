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

  getRawMaterials: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get("http://localhost:8123/api/raw-materials", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  },

  getPredefinedProducts: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await fetch("http://localhost:8123/api/predefined-products", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) throw new Error("No autorizado");
    return await response.json();
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
  },

  async analyzeCustom({ image, height, width, color, quantity }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("color", color);
    formData.append("quantity", quantity);

    return await axios.post(`${API_URL}/api/analyze`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
  },

  getQuotes: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/quotes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getPendingQuotes: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get("http://localhost:8123/api/presupuestos", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  },

  getQuoteById: async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await fetch(`http://localhost:8123/api/quotes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) throw new Error("No autorizado");
    return await response.json();
  },

  updateQuote: async (id, data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await fetch(`http://localhost:8123/api/quotes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("No autorizado");
    return await response.json();
  },
};

export default AuthService;