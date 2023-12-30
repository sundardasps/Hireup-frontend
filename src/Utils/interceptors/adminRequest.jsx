import axios from "axios";

const url = import.meta.env.VITE_ADMIN_BASE_URL;

export  const adminInterseptor = axios.create({
  baseURL: url,
});

adminInterseptor.interceptors.request.use((request) => {
  if (localStorage.getItem("adminToken")) {
    request.headers.Authorization = "Bearer " + localStorage.getItem("adminToken");
  }
  return request;
});
