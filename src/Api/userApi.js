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
    const response = await userCheck.put("/EditProfile", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editUserDp(formData) {
  try {
    const response = await userCheck.post("/EditDp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editUserBgImg(formData) {
  try {
    const response = await userCheck.post("/EditBgImg", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addSkills(skillForm) {
  try {
    const response = await userCheck.post("/addSkill", skillForm);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSkill(skill) {
  try {
    console.log(skill);
    const response = await userCheck.post("/deleteSkill", skill);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addExperience(value) {
  try {
    const response = await userCheck.post("/addExperience", value);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function experienceEdit(value, edited) {
  try {
    const response = await userCheck.put("/editExperience", { value, edited });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function experienceDelete(value) {
  try {
    const response = await userCheck.post(`/deleteExperience/${value}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getCompanies() {
  try {
    const response = await userCheck.get("/getAllCompany");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addEducation(eduData) {
  try {
    const response = await userCheck.post("/addEducation", eduData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editEducation(prevData, editData) {
  try {
    const response = await userCheck.patch("/editEducation", {
      prevData,
      editData,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEducation(prevData) {
  try {
    const response = await userCheck.put("/deleteEducation", prevData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function applyJob(formData) {
  try {
    const response = await userCheck.post("/applyJOb", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function appliedList({ filter, search }) {
  try {
    const response = await userCheck.get("/getAppliedJobs", {
      params: { filter, search },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function checkJobAppliedOrNot(userId,jobId){
     try {
      const response = await userCheck.get("/checkJobAppliedOrNot",{params:{userId,jobId}})
      return response
     } catch (error) {
      console.log(error);
     }
} 

export async function checkJobAppliedStatus(userId,jobId){
  try {
   const response = await userCheck.get("/checkJobAppliedStatus",{params:{userId,jobId}})
   return response
  } catch (error) {
   console.log(error);
  }
} 

