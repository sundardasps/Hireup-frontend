import  CompanyRoutes from '../../Routes/CompanyRoutes'
import  UserRoutes from '../../Routes/UserRoutes'
import  AdminRoutes from '../../Routes/AdminRoutes'
import LandingPage from '../../Pages/commonPages/LandingPage';
import { Navigate } from 'react-router-dom';

function CommonProtected() {
    if(localStorage.getItem("token")){
        return(
          <UserRoutes/>
        )
    }else if(localStorage.getItem("companyToken")){
        return(
            <CompanyRoutes/>
        )
    }else if(localStorage.getItem("adminToken")){
        return(
            <AdminRoutes/>
        )
    }
 
}

export default CommonProtected