import axios from "axios";

const baseurl = "http://localhost:5000/company";

export const companyInterseptor = axios.create({
  baseURL: baseurl,
});

companyInterseptor.interceptors.request.use((request) => {
  if (localStorage.getItem("companyToken")) {
    request.headers.Authorization = "Bearer " + localStorage.getItem("companyToken");
  }

  return request;
});
