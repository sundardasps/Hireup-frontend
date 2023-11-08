
import { Navigate, Outlet } from 'react-router-dom'

function UserProtected() {
    if(localStorage.getItem("token")){
        return <Outlet/>
    }else{
        return <Navigate to={'/user/login'}  />
    } 
}

export default UserProtected
