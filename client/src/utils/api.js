import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8989/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProjects = () => axiosInstance.get("/projects");
export const getProjectById = (id) => axiosInstance.get(`/projects/${id}`);
export const createProject = (data) => axiosInstance.post("/projects", data);
export const updateProject = (id, data) => axiosInstance.put(`/projects/${id}`, data);
export const deleteProject = (id) => axiosInstance.delete(`/projects/${id}`);

export const getArt = () => axiosInstance.get("/art");
export const getArtById = (id) => axiosInstance.get(`/art/${id}`);
export const createArt = (data) => axiosInstance.post("/art", data);
export const updateArt = (id, data) => axiosInstance.put(`/art/${id}`, data);
export const deleteArt = (id) => axiosInstance.delete(`/art/${id}`);

export const getContacts = () => axiosInstance.get("/contact");
export const createContact = (data) => axiosInstance.post("/contact", data);
export const deleteContact = (id) => axiosInstance.delete(`/contact/${id}`);

export const login = (data) => axiosInstance.post("/auth/login", data);