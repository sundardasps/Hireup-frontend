import { Route, Routes } from "react-router-dom";
import UserRegister from "../Pages/userPages/userRegisterPage/UserRegisterPage";
import LandingPage from "../Pages/commonPages/LandingPage";
import UserLogin from "../Pages/userPages/userLoginPage/UserLoginPage";
import UserLayOut from "../Components/userComponents/userLayout/userLayOut";
import UserVarification from "../Components/userComponents/userLoginComponents/UserVarification";
import UserHome from "../Pages/userPages/userHomePage/Home";
import UserPublic from "../Utils/protected/UserPublic.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserResetPass from "../Components/userComponents/userLoginComponents/UserResetPass.jsx";
import UserForgotPass from "../Components/userComponents/userLoginComponents/UserForgotPass.jsx";
import UserProtected from "../Utils/protected/UserProtected.jsx";
import Profile from "../Pages/userPages/userHomePage/Profile.jsx";
import AppliedList from "../Components/userComponents/userHomeComponents/AppliedList.jsx";
import UserChat from "../Pages/userPages/userChatPage/UserChat.jsx";
import SavedJobsPage from "../Pages/userPages/savedJobsPage/SavedJobsPage.jsx";
import UserVideoChatpage from '../Pages/userPages/userChatPage/UserVideoChat.jsx'
import JobFullDetilsSeperateDiv from '../Components/userComponents/userHomeComponents/JobFullDetailsSeparate.jsx'
import ErrorComponent from '../Components/commonComponents/errorHandling/ErrorComponent.jsx'
function UserRoutes() {


  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem('token'));
  },[user]);

  return (
    <Routes>
      <Route element={<UserPublic/>}>
      <Route path="/register"element={<UserRegister /> }/>
      <Route path="/login"element={<UserLogin />}/>
      <Route path="/:userId/varification/:token"element={ <UserVarification /> } />
      <Route path="/:userId/resetPassword/:token" element={   <UserResetPass />   }/>
      <Route path="/forgotePassword" element={ <UserForgotPass />} />
      </Route>

      
      <Route element={<UserProtected/>}>
      <Route element={<UserLayOut/>}>
      <Route path="/" element={<UserHome/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/appliedJobs" element={<AppliedList/>}/>
      <Route path="/chat" element={<UserChat/>}/>
      <Route path="/savedJobs" element={<SavedJobsPage/>}/>
      <Route path='/room/:recieverId' element={<UserVideoChatpage/>}/>
      <Route path="/jobDetails" element={<JobFullDetilsSeperateDiv/>}/>
      <Route path="*" element={<ErrorComponent/>}/>
      </Route>
      </Route>
      

    </Routes>
  );
}

export default UserRoutes;
