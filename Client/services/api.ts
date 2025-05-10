import axios from "axios";
import { getIdToken } from "firebase/auth";
import { auth } from "../firebase";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await getIdToken(user);
      // ✅ Use set() instead of replacing headers
      config.headers?.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
