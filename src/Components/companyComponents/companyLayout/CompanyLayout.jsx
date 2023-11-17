import { Outlet } from "react-router-dom"
import CompanyNavbar from '../companyCommonComponents/CompanyNavbar'
import CompanyFooter from '../companyCommonComponents/CompanyFooter'
function CompanyLayout() {
  return (
    <div className="grid grid-rows-[5rem] overflow-x-hidden">
      <div className="sticky  top-0 z-50">
               <CompanyNavbar/>
                </div>
                <div>
                <Outlet/>
                </div>
           <div>
         <div className="h-screen w-screen bg-white"></div>
           <CompanyFooter/>
      </div>
    </div>
  )
}

export default CompanyLayout
