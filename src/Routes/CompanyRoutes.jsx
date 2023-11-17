import {Route,Routes}    from 'react-router-dom'
import CompanyRegister from '../Pages/companyPages/companyRegisterPage/CompanyRegisterPage'
import CompanyLayout from '../Components/companyComponents/companyLayout/CompanyLayout'
import CompanyLogin from '../Components/companyComponents/companyLoginComponent/CompanyLogin'
import CompanyVarification from '../Components/companyComponents/companyLoginComponent/CompanyVarification'
import CompanyHomePage from '../Pages/companyPages/companyHomePage/CompanyHomePage'
import CompanyPublic from '../Utils/protected/CompanyPublic'

import CompanyForgotPass from '../Components/companyComponents/companyLoginComponent/CompanyForgotPass'
import CompanyResetPassword from '../Components/companyComponents/companyLoginComponent/CompanyResetPass'

import CompanyProtected from '../Utils/protected/CompanyProtected'
import CompanyProfilePage from '../Pages/companyPages/companyProfilePage/CompanyProfilePage'
import CompanyFullDetails from '../Components/companyComponents/companyRegister/CompanyFullDetails'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import CompanyPostPage from '../Pages/companyPages/companyPostsPage/CompanyPostPage'
function CompanyRoutes() {
   const completed = useSelector((state) =>{
    return state.company.completed
   })

   useEffect(()=>{
     console.log(completed);
   },[completed])
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
         <Route path='/' element={completed ? <CompanyHomePage/> : <CompanyFullDetails/> }/>
         <Route path='/profile' element={<CompanyProfilePage/>}/>
         <Route path='/posts' element={<CompanyPostPage/>}/>

         </Route>
         </Route>
      </Routes>
      
    </div>
  )
}

export default CompanyRoutes

