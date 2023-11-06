import {Route,Routes}    from 'react-router-dom'
import CompanyRegister from '../Pages/companyPages/companyRegisterPage/CompanyRegisterPage'
import CompanyLayout from '../Components/companyComponents/companyLayout/CompanyLayout'
import CompanyLogin from '../Components/companyComponents/companyLoginComponent/CompanyLogin'
import CompanyVarification from '../Components/companyComponents/companyLoginComponent/CompanyVarification'
// import { useSelector } from "react-redux";
// import { useEffect, useState } from 'react'
function CompanyRoutes() {

  // const [user, setUser] = useState("");
  // const userStore = useSelector((state) => state.company);
  // useEffect(() => {
  //   setUser(userStore.role);
  // },[userStore.role] );

  return (
    <div>
      <Routes>
         <Route path='/'  element={<CompanyLayout/>} >
         <Route path='/companyRegister' element={<CompanyRegister/>}/>
         <Route path="/:companyId/varification/:token" element={<CompanyVarification/>}/>
         <Route path='/login' element={<CompanyLogin/>}/>
         <Route path='/home' element={<CompanyLogin/>}/>
         </Route>
      </Routes>
      
    </div>
  )
}

export default CompanyRoutes

