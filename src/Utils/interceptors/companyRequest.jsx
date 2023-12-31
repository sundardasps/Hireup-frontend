import axios from "axios";
import toast from "react-hot-toast";

const baseurl = import.meta.env.VITE_COMPANY_BASE_URL;
export const companyInterseptor = axios.create({
  baseURL: baseurl,
});

companyInterseptor.interceptors.request.use((request) => {
  if (localStorage.getItem("companyToken")) {
    request.headers.Authorization = "Bearer " + localStorage.getItem("companyToken");
  }

  return request;
});


companyInterseptor.interceptors.response.use(
  (response) => response,
  (error)=>{
    if (error.response && error.response.status === 403){
          toast.error("User where blocked by admin!")
          localStorage.removeItem("companyToken");
          setTimeout(()=>{
             window.location.reload()
          },1000)
      }else if(error.response.status === 404){
        window.location = '/error'
      }
    return Promise.reject(error);
  }
)