import { adminInterseptor } from "../Utils/interceptors/adminRequest";

const adminCheck = adminInterseptor;

export async function adminLogin(logindata) {
  try {
    const response =await adminCheck.post("/login",logindata);
    return response;
  } catch (error) {
    console.log(error);
  }
}
