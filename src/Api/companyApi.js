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
    const response = await companyCheck.post("/login", loginData);
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

export async function companyRegisterGoogle(userData) {
  try {
    const response = await companyCheck.post(
      "/companyRegisterWithGoole",
      userData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function companyProfile() {
  try {
    const response = await companyCheck.get("/companyDetails");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addCompanyfullDetails(formData, id) {
  try {
    console.log(formData, id);
    const response = await companyCheck.post(
      `/companyFullDetails/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addCompanyPost(formData) {
  try {
    const response = await companyCheck.post("/addpost", formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function companyPosts({ page, filter, search }) {
  try {
    const response = await companyCheck.get("/getPost", {
      params: { page, filter, search },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function postDetails(id) {
  try {
    const response = await companyCheck.get(`/postDetails/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editProfileDetails(values) {
  try {
    const response = await companyCheck.post("/editProfile", values);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editProfileImage(formData) {
  try {
    const response = await companyCheck.post("/changeProfileImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function editPostDetails(values, postId) {
  try {
    console.log(postId);
    const response = await companyCheck.put(`/editPost/${postId}`, values);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserList({ search, filter, page }) {
  try {
    const response = await companyCheck.get("/getUserList", {
      params: { search, filter, page },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function checkCompleted() {
  try {
    const response = await companyCheck.get("/checkCompleted");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteJob(id) {
  try {
    console.log(id);
    const response = await companyCheck.get(`/deleteJob/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function categoryDataForCompany() {
  try {
    const response = await companyCheck.get("/categoryDataForCompany");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function companyUserProfile(id) {
  try {
    const response = await companyCheck.get(`/getUserProfile/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function jobAppliedUsers({ jobId, filter, search }) {
  try {
    const response = await companyCheck.get("/getAppliedUsers", {
      params: { jobId, filter, search },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleUserApplication(userId, jobId) {
  try {
    const response = await companyCheck.put("/getSingleUserApplication", {
      userId,
      jobId,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function rejectUserApplication(userId, jobId) {
  try {
    const response = await companyCheck.put("/rejectUserapplication", {
      userId,
      jobId,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function scheduleInterview(data) {
  try {
    const response = await companyCheck.post("/scheduleInterview", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function scheduleInterviewList() {
  try {
    const response = await companyCheck.get("/getscheduleInterview");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function interviewReSchedule(data) {
  try {
    const response = await companyCheck.patch("/reScheduleInterview", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function stripePayment(price) {
  try {
    const response = await companyCheck.post("/create-checkout-session", {
      price,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

//--------------------------------Company chat-----------------------------------//

export async function companyCreateChat(ids) {
  try {
    const response = await companyCheck.post("/companyCreateChat", ids);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function companyChats(currentUser) {
  try {
    const response = await companyCheck.get(`/chat/${currentUser}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleUser(userId) {
  try {
    const response = await companyCheck.get(`/getSingleUser/${userId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function companyGetMessages(chatId) {
  try {
    const response = await companyCheck.get(`/companyGetMessages/${chatId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function companyAddMessage(newMessage) {
  try {
    const response = await companyCheck.post("/companyAddMessage", newMessage);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function cancelInterview(interviewId) {
  try {
    const response = await companyCheck.put(`/cancelInterview/${interviewId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
