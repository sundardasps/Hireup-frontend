import {Route,Routes}    from 'react-router-dom'
import CompanyRegister from '../Pages/companyPages/companyRegisterPage/CompanyRegisterPage'
import CompanyLayout from '../Components/companyComponents/companyLayout/CompanyLayout'
import CompanyLogin from '../Components/companyComponents/companyLoginComponent/CompanyLogin'
import CompanyVarification from '../Components/companyComponents/companyLoginComponent/CompanyVarification'
import CompanyHomePage from '../Pages/companyPages/companyHomePage/CompanyHomePage'
import CompanyPublic from '../Utils/protected/CompanyPublic'
import LandingPage from '../Pages/commonPages/LandingPage'
import CompanyForgotPass from '../Components/companyComponents/companyLoginComponent/CompanyForgotPass'
import CompanyResetPassword from '../Components/companyComponents/companyLoginComponent/CompanyResetPass'

import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import CompanyProtected from '../Utils/protected/CompanyProtected'
function CompanyRoutes() {

  const [company, setCompany] = useState("");
  const userStore = useSelector((state) => state.company);
  useEffect(() => {
    setCompany(userStore.role);
  },[userStore.role] );

  return (
    <div>
      <Routes>
        
         <Route path='/companyRegister' element={<CompanyPublic><CompanyRegister/></CompanyPublic>}/>
         <Route path="/:companyId/varification/:token" element={<CompanyPublic><CompanyVarification/></CompanyPublic>}/>
         <Route path="/:companyId/resetPassword/:token" element={<CompanyPublic><CompanyResetPassword/></CompanyPublic>}/>
         <Route path='/login' element={<CompanyPublic><CompanyLogin/></CompanyPublic>}/>
         <Route path='/forgotePassword' element={<CompanyPublic><CompanyForgotPass/></CompanyPublic>}/>

        
         <Route element={<CompanyProtected/>}>
         <Route element={<CompanyLayout/>} >
         <Route path='/' element={company?<CompanyHomePage/>:<LandingPage/>}/>
         </Route>
         </Route>
      </Routes>
      
    </div>
  )
}

export default CompanyRoutes

