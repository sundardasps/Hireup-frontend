import { Outlet } from "react-router-dom"
import CompanyNavbar from '../companyCommonComponents/CompanyNavbar'
import CompanyFooter from '../companyCommonComponents/CompanyFooter'
import {ToastBar, Toaster} from 'react-hot-toast'
function CompanyLayout() {
  return (
    <div >
    <div className="mb-16">
      <CompanyNavbar />
    </div>
    <div className="min-h-screen p-0.5">
      <Outlet  />
    </div>
    <div>
      <CompanyFooter />
    </div>
    <Toaster/>
  </div>
  )
}

export default CompanyLayout
