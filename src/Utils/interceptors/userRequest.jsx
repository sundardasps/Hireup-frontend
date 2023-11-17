import axios from "axios";


const baseURL =  "http://localhost:5000/user"

export const userInterseption = axios.create({
  baseURL:baseURL,
});

userInterseption.interceptors.request.use((request) => {
  
  if (localStorage.getItem("token")) {
    console.log("hiii");
    request.headers.Authorization = localStorage.getItem("token");
  }
  return request;
});
