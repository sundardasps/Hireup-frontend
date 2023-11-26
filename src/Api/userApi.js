import { checkbox } from "@material-tailwind/react";
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
    console.log(error);
  }
}

export async function userVarification(userData) {
  try {
    const response = await userCheck.post("/varification", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function userForgotPass(email) {
  try {
    const response = await userCheck.post("/forgetPassword", email);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function userResetPass(userData) {
  try {
    const response = await userCheck.post("/resetPassword", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function userRegisterGoogle(userData) {
  try {
    const response = await userCheck.post("/userRegisterWithGoole", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function categoryDataForUser() {
  try {
    const response = await userCheck.get("/categoryDataForUser");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllJobs({ search, filter }) {
  try {
    const response = await userCheck.get("/getAllJobs", {
      params: { search, filter },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getProfile() {
  try {
    const response = await userCheck.get("/profile");
    return response;
  } catch (error) {
    console.log(error);
  }
}


export async function editUserProfile(data) {
  try {
    const response = await userCheck.put("/EditProfile",data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editUserDp(formData) {
  try {
    const response = await userCheck.post("/EditDp",formData,{headers: {
      "Content-Type": "multipart/form-data",
    },});
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editUserBgImg(formData) {
  try {
    const response = await userCheck.post("/EditBgImg",formData,{headers: {
      "Content-Type": "multipart/form-data",
    },});
    return response;
  } catch (error) {
    console.log(error);
  }
}
