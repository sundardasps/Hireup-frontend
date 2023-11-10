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


export async function usersData({search,filter,page}){
  try {
    const response = await adminCheck.get('/users',{
      params:{
        page,search,filter
      }
    })
    return response
  } catch (error) {
    console.log(error);
  }
}

export async function userblockOrUnBlock(id) {

  try {
    console.log(id,"=========isinefifhslkrhfsdlhfldshfsdjhfkh");
    const response = await adminCheck.put(`/userBlockOrUnblock/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}
