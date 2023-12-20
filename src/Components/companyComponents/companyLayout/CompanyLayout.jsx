import { Outlet } from "react-router-dom"
import CompanyNavbar from '../companyCommonComponents/CompanyNavbar'
import CompanyFooter from '../companyCommonComponents/CompanyFooter'
import {ToastBar, Toaster} from 'react-hot-toast'
function CompanyLayout() {
  return (
           <div >
               <CompanyNavbar/>
               <Outlet  />
               <Toaster/>
               <CompanyFooter/>
              </div>
  )
}

export default CompanyLayout
