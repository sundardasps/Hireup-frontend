import axios from "axios";

const url = "http://localhost:5000/admin";

export  const adminInterseptor = axios.create({
  baseURL: url,
});

adminInterseptor.interceptors.request.use((request) => {
  if (localStorage.getItem("adminToken")) {
    request.headers.Authorization = "Bearer " + localStorage.getItem("adminToken");
  }
  return request;
});
