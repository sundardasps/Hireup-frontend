import axios from "axios";
import {toast} from 'react-hot-toast'
const baseURL =  import.meta.env.VITE_USER_BASE_URL;
console.log(baseURL);
export const userInterseption = axios.create({
  baseURL:baseURL,
});

userInterseption.interceptors.request.use((request) => {
  
  if (localStorage.getItem("token")) {
    request.headers.Authorization = "Bearer " + localStorage.getItem("token");
  }
  return request;
});


userInterseption.interceptors.response.use(
  (response) => response,
  (error)=>{
    if (error.response && error.response.status === 403){
          toast.error("User where blocked by admin!")
          localStorage.removeItem("token");
          setTimeout(()=>{
             window.location.reload()
          },1000)
      }
    return Promise.reject(error);
  }
)