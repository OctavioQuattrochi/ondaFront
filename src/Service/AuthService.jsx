import axios from "axios";

const API_URL = "http://localhost:8123";

const AuthService = {
  // Login: guarda el usuario completo (token + datos)
  async login(email, password) {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    if (!response.data.access_token) throw new Error("Login failed");
    const token = response.data.access_token;

    const meResp = await axios.get(`${API_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const userData = meResp.data;

    localStorage.setItem("user", JSON.stringify({ access_token: token, ...userData }));

    return { access_token: token, ...userData };
  },

  async register(name, email, password, lastname, password_confirmation) {
    const response = await axios.post(`${API_URL}/api/register`, {
      name,
      email,
      password,
      lastname,
      password_confirmation
    });
    return response.data;
  },

  async getOrders() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getRawMaterials: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/raw-materials`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getPredefinedProducts: async () => {
    const response = await axios.get(`${API_URL}/api/predefined-products`);
    return response.data;
  },

  async getProducts() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getPersonalizados() {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/products?type=personalizado`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createProduct(productData) {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.post(`${API_URL}/api/products`, productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
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

    const response = await axios.post(`${API_URL}/api/analyze`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  },

  getQuotes: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/quotes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAllQuotes: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await fetch("http://localhost:8123/api/quotes", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  },

  getPendingQuotes: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/presupuestos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getQuoteById: async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/quotes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateQuote: async (id, data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.put(`${API_URL}/api/quotes/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  isLoggedIn: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    if (!token) return false;
    try {
      const response = await axios.get(`${API_URL}/api/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status !== 200) {
        localStorage.removeItem("user");
        return false;
      }
      return true;
    } catch {
      localStorage.removeItem("user");
      return false;
    }
  },

  logout: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    if (token) {
      try {
        await axios.post(`${API_URL}/api/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
        // Si hay error igual limpiamos el localStorage
      }
    }
    localStorage.removeItem("user");
  },

  // --- Carrito ---
  getCartItems: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  addToCart: async (productId, quantity = 1, price_unit) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await fetch("http://localhost:8123/api/cart/items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        product_id: productId,
        quantity,
        price_unit
      })
    });
    if (!response.ok) throw new Error("No autorizado");
    return await response.json();
  },

  updateCartItem: async (productId, quantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.post(`${API_URL}/api/cart/items`, {
      product_id: productId,
      quantity
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  removeCartItem: async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.delete(`${API_URL}/api/cart/items/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  clearCart: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.delete(`${API_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  checkout: async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.post(`${API_URL}/api/checkout`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getUsers: async (filters = {}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}/api/users${params ? "?" + params : ""}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getUserById: async (id) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.put(`${API_URL}/api/users/${id}/role`, { role }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return response.data;
  },

  getVentas: async (filtros = {}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const params = new URLSearchParams(filtros).toString();
    const response = await axios.get(`${API_URL}/api/orders${params ? "?" + params : ""}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateUserProfile: async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.put(`${API_URL}/api/user`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  recuperarClave: async (email) => {
    await axios.post(`${API_URL}/api/password/email`, { email });
  },

  resetPassword: async (data) => {
    await axios.post(`${API_URL}/api/password/reset`, data);
  },

  // --- Producción ---
  getProductionBatches: async (status = "Pendiente,En produccion") => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/produccion`, {
      params: { status },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  createProductionBatch: async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.post(`${API_URL}/api/produccion`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateProductionBatch: async (id, data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.put(`${API_URL}/api/produccion/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  // --- Stock ---
  getStock: async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.get(`${API_URL}/api/stock`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  addRawMaterialStock: async (id, quantity) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.access_token;
    const response = await axios.put(
      `${API_URL}/api/raw-materials/${id}/add-stock`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  },
};

export default AuthService;