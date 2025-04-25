import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-nhmf.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401 && (message === "Token expired" || message === "Invalid token")) {
      localStorage.removeItem("token");

      // Optional: Display a user-friendly message
      alert("Session expired. Please log in again.");

      // Redirect to login page
      window.location.href = "/login"; // or use navigate() if using React Router in components
    }

    return Promise.reject(error);
  }
);

// Projects
export const getProjects = () => axiosInstance.get("/projects");
export const getProjectById = (id) => axiosInstance.get(`/projects/${id}`);
export const createProject = (data) => axiosInstance.post("/projects", data);
export const updateProject = (id, data) => axiosInstance.put(`/projects/${id}`, data);
export const deleteProject = (id) => axiosInstance.delete(`/projects/${id}`);

// Art
export const getArt = () => axiosInstance.get("/art");
export const getArtById = (id) => axiosInstance.get(`/art/${id}`);
export const createArt = (data) => axiosInstance.post("/art", data);
export const updateArt = (id, data) => axiosInstance.put(`/art/${id}`, data);
export const deleteArt = (id) => axiosInstance.delete(`/art/${id}`);

// Contacts
export const getContacts = () => axiosInstance.get("/contact");
export const createContact = (data) => axiosInstance.post("/contact", data);
export const deleteContact = (id) => axiosInstance.delete(`/contact/${id}`);

// Auth
export const login = (data) => axiosInstance.post("/auth/login", data);

export default axiosInstance;
