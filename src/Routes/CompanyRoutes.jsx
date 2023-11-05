import {Route,Routes}    from 'react-router-dom'
import CompanyRegister from '../Pages/companyPages/companyRegisterPage/CompanyRegisterPage'
import CompanyLayout from '../Components/companyComponents/companyLayout/CompanyLayout'
import CompanyLogin from '../Components/companyComponents/companyLoginComponent/CompanyLogin'
function CompanyRoutes() {
  return (
    <div>
      <Routes>
         <Route path='/'  element={<CompanyLayout/>} >
         <Route path='/register' element={<CompanyRegister/>}/>
         <Route path='/login' element={<CompanyLogin/>}/>

         </Route>
      </Routes>
      
    </div>
  )
}

export default CompanyRoutes

