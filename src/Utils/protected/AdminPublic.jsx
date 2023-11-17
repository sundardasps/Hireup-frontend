import { Navigate, Outlet } from 'react-router-dom'

function AdminPublic() {

    if(localStorage.getItem("adminToken")){
        return <Navigate to={'/admin/'}/>
    }else{
        return <Outlet/>
    }

}

export default AdminPublic
