import { Route, Routes } from "react-router-dom";
import UserRegister from "../Pages/userPages/userRegisterPage/UserRegisterPage";
import LandingPage from "../Pages/commonPages/LandingPage";
import UserLogin from "../Pages/userPages/userLoginPage/UserLoginPage";
import UserLayOut from "../Components/userComponents/userLayout/userLayOut";
import UserVarification from "../Components/userComponents/userLoginComponents/UserVarification";
import UserHome from "../Pages/userPages/userHomePage/Home";
import UserPublic from "../Utils/protected/UserPublic.jsx";
import {useSelector}  from 'react-redux'
import { useEffect, useState } from "react";


function UserRoutes() {
  
  const [user,setUser]=useState("")
  const userStore = useSelector(state => state.user)
  console.log(userStore.role);
 useEffect(()=>{
    setUser(userStore.role)
 })
  
  return (
    <Routes>
        <Route path="/register" element={<UserPublic><UserRegister /></UserPublic>} />
        <Route path="/login" element={<UserPublic><UserLogin /></UserPublic>} />
        <Route path="/:userId/varification/:token" element={<UserPublic><UserVarification /></UserPublic>}/>
        <Route path="/" element={<UserLayOut></UserLayOut>}>
        <Route path="/" element={user?<UserHome />:<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
