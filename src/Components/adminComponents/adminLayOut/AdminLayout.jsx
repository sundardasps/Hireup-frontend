import { Outlet } from "react-router-dom"
import { AdminNavbar } from "../adminCommonComponents/AdminNavbar"


function AdminLayout() {
  return (
    <div className="grid grid-rows-[4rem] overflow-x-hidden">
    <div className="sticky  top-0 z-50">
             <AdminNavbar/>
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

export default AdminLayout
