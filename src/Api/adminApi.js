import { adminInterseptor } from "../Utils/interceptors/adminRequest";

const adminCheck = adminInterseptor;

export async function adminLogin(logindata) {
  try {
    const response = await adminCheck.post("/login", logindata);
    return response;
  } catch (error) {
    console.log(error);
  }
}


//--------------------------------------------------Users section----------------------------------------//


export async function usersData({ search, filter, page }) {
  try {
    const response = await adminCheck.get("/users", {
      params: {
        page,
        search,
        filter,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function userblockOrUnBlock(id) {
  try {
    const response = await adminCheck.put(`/userBlockOrUnblock/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}


//--------------------------------------------------Companies section----------------------------------------//

export async function companiesData({ search, filter, page }) {
  try {
    console.log(search,filter,page,'==================Admin apissss');
    const response = await adminCheck.get("/companies", {
      params: {
        page,
        search,
        filter,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}


export async function companyblockOrUnBlock(id) {
  try {
    const response = await adminCheck.put(`/companyBlockOrUnblock/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}