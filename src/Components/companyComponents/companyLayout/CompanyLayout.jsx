import { Outlet } from "react-router-dom"
import CompanyNavbar from '../companyCommonComponents/CompanyNavbar'
function CompanyLayout() {
  return (
    <div className="grid grid-rows-[4rem] overflow-x-hidden">
      <div className="sticky  top-0 z-50">
               <CompanyNavbar/>
                </div>
                <div>
                <Outlet/>
                </div>
           <div>
      <div className="h-28 w-screen bg-white"></div>
         
      </div>
    </div>
  )
}

export default CompanyLayout
