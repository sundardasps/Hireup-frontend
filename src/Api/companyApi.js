import { companyInterseptor } from "../Utils/interceptors/companyRequest.jsx";

const companyCheck = companyInterseptor;

export async function companySingup(companyData) {

  try {
    const response = await companyCheck.post("/register", companyData);
    return response;
  } catch (error) {
    console.log(error.message);
  }
}

export async function companyVarification(companyData) {
  try {
    const response = await companyCheck.post("/varification", companyData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function companyLogin(loginData) {
  try {
    const response = await companyCheck.post("/login",loginData);
    return response;
  } catch (error) {
    console.log(error);
  }
}


export async function companyForgotPassword(email) {
  try {
    const response = await companyCheck.post("/forgetPassword", email);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function companyResetPassword(email) {
  try {
    const response = await companyCheck.post("/resetPassword", email);
    return response;
  } catch (error) {
    console.log(error);
  }
}