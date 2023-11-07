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


export async function usersData(){

  try {
    const response = await adminCheck.get('/users')
    return response
  } catch (error) {
    console.log(error);
  }

}