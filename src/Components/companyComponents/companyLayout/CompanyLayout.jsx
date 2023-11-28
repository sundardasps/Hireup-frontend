import { Outlet } from "react-router-dom"
import CompanyNavbar from '../companyCommonComponents/CompanyNavbar'
import CompanyFooter from '../companyCommonComponents/CompanyFooter'
import {ToastBar} from 'react-hot-toast'
function CompanyLayout() {
  return (
    <div className="grid grid-rows-[5rem] overflow-x-hidden  bg-gray-100">
      <div className="sticky  top-0 z-50 ">
               <CompanyNavbar/>
                </div>
                <div>
                <Outlet />
                </div>
           <div>
         <div className=" bg-white"></div>
           <CompanyFooter/>
      </div>
    </div>
  )
}

export default CompanyLayout
