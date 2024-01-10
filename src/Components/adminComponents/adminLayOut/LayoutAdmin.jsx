import { Outlet } from "react-router-dom"
import { AdminNavbar } from "../adminCommonComponents/AdminNavbar"
import {AdminSidebar} from '../adminCommonComponents/AdminSidebar'
import { AdminFooter } from "../adminCommonComponents/AdminFooter"

function LayoutAdmin() {
  return (
    <div  className='h-screen grid grid-rows-[5rem] '>
      <div>
              <AdminNavbar/>
      </div>  
      <div className='md:grid md:grid-cols-[18.7rem,1fr] '>   
          <div className='invisible md:visible m-5'>
              <AdminSidebar/>
          </div>    
          <div>
            <div className='h-screen m-5 '>
              <Outlet/>
              </div>  
              <div>
                <AdminFooter/>
              </div>
          </div>    
      </div>           
  </div>
  )
}

export default LayoutAdmin
