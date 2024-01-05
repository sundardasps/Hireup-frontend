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
    const response = await adminCheck.post(`/companyBlockOrUnblock/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

//-----------------------------------------------Category section----------------------------------------//

export async function categoryTitleAdd(title) {
  try {
    const response = await adminCheck.post("/addTile", title);
    return response;
  } catch (error) {
    console.error(error);
  }
}


export async function addCategory(data) {
  try {
    console.log(data);
    const response = adminCheck.post("/addCategory", data);
    return response;
  } catch (error) {
    console.error(error);
  }
}


export async function getCategoryTitle() {
  try {
    const response = adminCheck.get("/getTitle");
    return response;
  } catch (error) {
    console.error(error);
  }
}


export async function categoryData({ search, filter, page }) {
  try {
    const response = await adminCheck.get("/categoryData", {
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


export async function categoryblockOrUnBlock(id) {
  try {
    const response = await adminCheck.put(`/catgoryBlockOrUnblock/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}


export async function subCategoryDelete(value, id) {
  try {
    const response = await adminCheck.post("/deleteSubcategory", { value, id });
    return response;
  } catch (error) {
    console.error(error);
  }
}


export async function companyApprovel(companyid){
    try {
      const response = await adminCheck.put(`/companyApprovel/${companyid}`)
      return response 
    } catch (error) {
      console.log(error);
    }
}

//-----------------------------------------------dashboard section----------------------------------------//

export async function getDashboard() {
  try {
    const response = await adminCheck.get("/getDashboard");
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getjobdetails(id) {
  try {
    const response = await adminCheck.get(`/jobDetails/${id}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

