import { Navigate, Outlet } from "react-router-dom"


function CompanyProtected() {
 
    if(localStorage.getItem("companyToken")){
          return <Outlet/>
    }else{
        return <Navigate to='/'/>
    }
}

export default CompanyProtected
