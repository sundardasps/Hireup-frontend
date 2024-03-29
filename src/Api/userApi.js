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

export async function getAllJobs({ search, filter ,scroll}) {
  try {
    console.log( search, filter ,scroll);
    const response = await userCheck.get("/getAllJobs", {
      params: { search, filter ,scroll},
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

export async function getSingleJobData(jobId){
  try {
   const response = await userCheck.get(`/checkJobAppliedStatus/${jobId}`,)
   return response
  } catch (error) {
   console.log(error);
  }
} 

//--------------------------------User chat-----------------------------------//

export async function  createChat(ids){
  try {

   const response = await userCheck.post("/createChat",ids)
   return response
  } catch (error) {
   console.log(error);
  }
}

export async function userChats (currentUser){
   try {
    const response = await userCheck.get(`/chat${currentUser}`)
    return response
   } catch (error) {
    console.log(error);
   }
}

export async function  getSingleCompany (companyId){
  try {
   const response = await userCheck.get(`/getSingleCompany/${companyId}`)
   return response
  } catch (error) {
   console.log(error);
  }
}

export async function  getMessages(chatId){
  try {
   const response = await userCheck.get(`/getMessage/${chatId}`)
   return response
  } catch (error) {
   console.log(error);
  }
}

export async function  addMessage(newMessage){
  try {
   const response = await userCheck.post("/addMessage",newMessage)
   return response
  } catch (error) {
   console.log(error);
  }
}

//------------------------------job save---------------------------------//

export async function  saveJobs(jobId){
  try {
   const response = await userCheck.put(`/saveJobs/${jobId}`)
   return response
  } catch (error) {
   console.log(error);
  }
}

export async function  getSavedJobs(){
  try {
   const response = await userCheck.get("/getSavedJobs")
   return response
  } catch (error) {
   console.log(error);
  }
}

export async function  unsaveJobs(jobId){
  try {
   const response = await userCheck.get(`/unsaveJobs/${jobId}`)
   return response
  } catch (error) {
   console.log(error);
  }
}

export async function  addResume(formData){
  try {
   const response = await userCheck.post("/addResume",formData,{headers:{
    "Content-Type": "multipart/form-data",
   }})
   return response
  } catch (error) {
   console.log(error);
  }
}

export async function  resumeDelete(id){
  try {
   const response = await userCheck.delete(`/deleteResume/${id}`)
   return response
  } catch (error) {
   console.log(error);
  }
}


export async function  getUserResumes(){
  try {
   const response = await userCheck.get("/getUserResumes")
   return response
  } catch (error) {
   console.log(error);
  }
}

export async function jobDetails(id) {
  try {
    const response = await userCheck.get(`/jobDetails/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

//------------------------------- For landing page ------------------ //

export async function getJobsName() {

  try {
    const response = await userCheck.get(`/getJobsName`);
    return response;
  } catch (error) {
    console.log(error);
  }
}


export async function getJobs({ search}) {
  try {
    const response = await userCheck.get("/getJobs", {
      params: { search},
    });
    return response;
  } catch (error) {
    console.log(error); 
  }
}