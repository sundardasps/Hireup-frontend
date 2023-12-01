import { Outlet } from "react-router-dom"
import CompanyNavbar from '../companyCommonComponents/CompanyNavbar'
import CompanyFooter from '../companyCommonComponents/CompanyFooter'
import {ToastBar, Toaster} from 'react-hot-toast'
function CompanyLayout() {
  return (
           <div className=" bg-gray-100">
               <div >
               <CompanyNavbar/>
                </div>
                <div>
                <Outlet />
                </div>
           <div>
         <div className=" bg-white"></div>
           <CompanyFooter/>
      </div>
      <Toaster/>
    </div>
  )
}

export default CompanyLayout
