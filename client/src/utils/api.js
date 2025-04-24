import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProjects = () => api.get("/projects");
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post("/projects", data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getArt = () => api.get("/art");
export const getArtById = (id) => api.get(`/art/${id}`);
export const createArt = (data) => api.post("/art", data);
export const updateArt = (id, data) => api.put(`/art/${id}`, data);
export const deleteArt = (id) => api.delete(`/art/${id}`);

export const createContact = (data) => api.post("/contact", data);
export const getContacts = () => api.get("/contact");
export const getContactById = (id) => api.get(`/contact/${id}`);
export const updateContact = (id, data) => api.put(`/contact/${id}`, data);
export const deleteContact = (id) => api.delete(`/contact/${id}`);

export const login = (data) => api.post("/auth/login", data);