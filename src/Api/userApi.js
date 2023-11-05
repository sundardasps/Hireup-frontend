import { userInterseption } from "../Utils/interceptors/userRequest";

const userCheck = userInterseption;

export async function userSignIn(userData) {
  try {
    const response = await userCheck.post("/sigUp", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function userLogin(userData) {
  try {
    const response = await userCheck.post("/login", userData);
    return response;
  } catch (error) {
    alert(error.message);
  }
}

export async function userVarification(userData) {
  try {
    const response = await userCheck.post("/varification",userData);
    return response;
  } catch (error) {
    alert(error);
  }
}
