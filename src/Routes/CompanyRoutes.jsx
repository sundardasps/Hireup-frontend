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
import PostFullDetails from '../Components/companyComponents/companyPostsComponents/PostFullDetails'
import PostFullDetailsPage from '../Pages/companyPages/companyPostsPage/PostFullDetailsPage'
import UserFullDetailsPage from '../Pages/companyPages/companyHomePage/UserFullDetailsPage'
import AppliedUsersPage from '../Pages/companyPages/companyHomePage/AppliedUsersPage'
import CompanyPayment from '../Pages/companyPages/companyPaymentPage/CompanyPayment'
import InterviewList from '../Pages/companyPages/companyHomePage/InterviewList'
import CompanyChatPage from '../Pages/companyPages/companyChatPage/CompanyChatPage'
import PaymentSuccessPage from '../Pages/companyPages/companyPaymentPage/SuccessPage'
import PaymentFailuerPage from '../Pages/companyPages/companyPaymentPage/FailuerPage'

function CompanyRoutes(){

   return (
    <div>
      <Routes>
         <Route path='/companyRegister' element={<CompanyPublic><CompanyRegister/></CompanyPublic>}/>
         <Route path="/:companyId/varification/:token" element={<CompanyPublic><CompanyVarification/></CompanyPublic>}/>
         <Route path="/:companyId/resetPassword/:token" element={<CompanyPublic><CompanyResetPassword/></CompanyPublic>}/>
         <Route path='/login' element={<CompanyPublic><CompanyLogin/></CompanyPublic>}/>
         <Route path='/forgotePassword' element={<CompanyPublic><CompanyForgotPass/></CompanyPublic>}/>
         
         <Route element={<CompanyProtected/>}>
         <Route path='/fulldetails' element={<CompanyFullDetails/>}/>
         <Route element={<CompanyLayout/>} >
         <Route path='/' element={<CompanyHomePage/>}/>
         <Route path='/profile' element={<CompanyProfilePage/>}/>
         <Route path='/posts' element={<CompanyPostPage/>}/>
         <Route path='/post/details' element={<PostFullDetailsPage/>}/>
         <Route path='/userProfile' element={<UserFullDetailsPage/>}/>
         <Route path='/posts/appliedUsers' element={<AppliedUsersPage/>}/>
         <Route path='/payment' element={<CompanyPayment/>}/>
         <Route path='/interviewsList' element={<InterviewList/>}/> 
         <Route path='/chat' element={<CompanyChatPage/>}/>
         <Route path='/status' element={<PaymentSuccessPage/>}/>



         </Route>
         </Route>
      </Routes>
      
    </div>
  )
}

export default CompanyRoutes

