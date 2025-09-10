import axios from "axios";

const API_URL = "http://localhost:8123";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.access_token;
};

const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`
});

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
    const response = await axios.get(`${API_URL}/api/orders`, {
      headers: authHeader()
    });
    return response.data;
  },

  async getRawMaterials() {
    const response = await axios.get(`${API_URL}/api/raw-materials`, {
      headers: authHeader()
    });
    return response.data;
  },

  async getPredefinedProducts() {
    const response = await axios.get(`${API_URL}/api/predefined-products`);
    return response.data;
  },

  async getProducts() {
    const response = await axios.get(`${API_URL}/api/products`, {
      headers: authHeader()
    });
    return response.data;
  },

  async getPersonalizados() {
    const response = await axios.get(`${API_URL}/api/products?type=personalizado`, {
      headers: authHeader()
    });
    return response.data;
  },

  async createProduct(productData) {
    const response = await axios.post(`${API_URL}/api/products`, productData, {
      headers: authHeader()
    });
    return response.data;
  },

  async analyzeCustom({ image, height, width, color, quantity, length_cm, note }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("color", color);
    formData.append("quantity", quantity);
    if (length_cm !== undefined) formData.append("length_cm", length_cm);
    if (note !== undefined) formData.append("note", note);

    const response = await axios.post(`${API_URL}/api/analyze`, formData, {
      headers: {
        ...authHeader()
      }
    });
    return response.data;
  },

  async getQuotes() {
    const response = await axios.get(`${API_URL}/api/quotes`, {
      headers: authHeader()
    });
    return response.data;
  },

  async getAllQuotes() {
    const response = await axios.get(`${API_URL}/api/quotes`, {
      headers: {
        ...authHeader(),
        "Content-Type": "application/json"
      }
    });
    return response.data;
  },

  async getPendingQuotes() {
    const response = await axios.get(`${API_URL}/api/presupuestos`, {
      headers: authHeader()
    });
    return response.data;
  },

  async getQuoteById(id) {
    const response = await axios.get(`${API_URL}/api/quotes/${id}`, {
      headers: authHeader()
    });
    return response.data;
  },

  async updateQuote(id, data) {
    const response = await axios.put(`${API_URL}/api/quotes/${id}`, data, {
      headers: authHeader()
    });
    return response.data;
  },

  async isLoggedIn() {
    const token = getToken();
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

  async logout() {
    const token = getToken();
    if (token) {
      try {
        await axios.post(`${API_URL}/api/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {}
    }
    localStorage.removeItem("user");
  },

  // --- Carrito ---
  async getCartItems() {
    const response = await axios.get(`${API_URL}/api/cart`, {
      headers: authHeader()
    });
    return response.data;
  },

  async addToCart(variantId, quantity = 1, price_unit) {
    const response = await axios.post(`${API_URL}/api/cart/items`, {
      variant_id: variantId,
      quantity,
      price_unit
    }, {
      headers: authHeader()
    });
    return response.data;
  },

  async updateCartItem(variantId, quantity) {
    const response = await axios.put(`${API_URL}/api/cart/items/${variantId}`, {
      quantity
    }, {
      headers: authHeader()
    });
    return response.data;
  },

  async removeCartItem(variantId) {
    const response = await axios.delete(`${API_URL}/api/cart/items/${variantId}`, {
      headers: authHeader()
    });
    return response.data;
  },

  async clearCart() {
    const response = await axios.delete(`${API_URL}/api/cart`, {
      headers: authHeader()
    });
    return response.data;
  },

  async checkout(data) {
    const response = await axios.post(`${API_URL}/api/checkout`, data, {
      headers: authHeader()
    });
    return response.data;
  },

  async getUsers(filters = {}) {
    const params = new URLSearchParams(filters).toString();
    const response = await axios.get(`${API_URL}/api/users${params ? "?" + params : ""}`, {
      headers: authHeader()
    });
    return response.data;
  },

  async getUserById(id) {
    const response = await axios.get(`${API_URL}/api/users/${id}`, {
      headers: authHeader()
    });
    return response.data;
  },

  async updateUserRole(id, role) {
    const response = await axios.put(`${API_URL}/api/users/${id}/role`, { role }, {
      headers: {
        ...authHeader(),
        "Content-Type": "application/json"
      }
    });
    return response.data;
  },

  async getVentas(filtros = {}) {
    const params = new URLSearchParams(filtros).toString();
    const response = await axios.get(`${API_URL}/api/orders${params ? "?" + params : ""}`, {
      headers: authHeader()
    });
    return response.data;
  },

  async updateUserProfile(data) {
    const response = await axios.put(`${API_URL}/api/user`, data, {
      headers: authHeader()
    });
    return response.data;
  },

  async recuperarClave(email) {
    await axios.post(`${API_URL}/api/password/email`, { email });
  },

  async resetPassword(data) {
    await axios.post(`${API_URL}/api/password/reset`, data);
  },

  // --- Producción ---
  async getProductionBatches(status = "Pendiente,En produccion") {
    const response = await axios.get(`${API_URL}/api/produccion`, {
      params: { status },
      headers: authHeader()
    });
    return response.data;
  },

  async createProductionBatch(data) {
    const response = await axios.post(`${API_URL}/api/produccion`, data, {
      headers: authHeader()
    });
    return response.data;
  },

  async updateProductionBatch(id, data) {
    const response = await axios.put(`${API_URL}/api/produccion/${id}`, data, {
      headers: authHeader()
    });
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const token = JSON.parse(localStorage.getItem("user"))?.access_token;
    await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // --- Stock ---
  async getStock() {
    const response = await axios.get(`${API_URL}/api/stock`, {
      headers: authHeader()
    });
    return response.data;
  },

  async addRawMaterialStock(id, quantity) {
    const response = await axios.put(
      `${API_URL}/api/raw-materials/${id}/add-stock`,
      { quantity },
      {
        headers: {
          ...authHeader(),
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  },
};

export default AuthService;