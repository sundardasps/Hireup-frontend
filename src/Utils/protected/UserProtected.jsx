import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function UserProtected() {
    
    if(localStorage.getItem("userToken")){
             return <Outlet/>
    }else{
        return <Navigate to={'/login'}  />
    } 
}

export default UserProtected
