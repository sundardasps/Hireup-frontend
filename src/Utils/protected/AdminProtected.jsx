import { Navigate, Outlet } from "react-router-dom"


function AdminProtected() {
   
  if(localStorage.getItem("adminToken")){
     return <Outlet/>
  }else{
     return <Navigate to='/admin/login'/>
  }

}

export default AdminProtected
