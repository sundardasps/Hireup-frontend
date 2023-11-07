import { AdminSidebar } from "../../../Components/adminComponents/adminCommonComponents/AdminSidebar"
import { UserListComponent } from "../../../Components/adminComponents/adminHomeComponents/UserListComponent"


function DashboardPage() {
  return (
    <div className="flex justify-between" >  
       
           <AdminSidebar/>
           <UserListComponent/>
           
           
    </div>
  )
}

export default DashboardPage
