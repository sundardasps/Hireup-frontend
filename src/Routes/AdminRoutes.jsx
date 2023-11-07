import  {Routes,Route}  from 'react-router-dom'
import AdminLoginComponent from '../Components/adminComponents/adminAuthComponents/AdminLoginComponent'
import DashboardPage from '../Pages/adminPages/dashboardPage/DashboardPage'
import AdminPublic from '../Utils/protected/AdminPublic'
import AdminLayout from '../Components/adminComponents/adminLayout/AdminLayout'
import AdminProtected from '../Utils/protected/AdminProtected'
import  { UserListComponent }     from '../Components/adminComponents/adminHomeComponents/UserListComponent'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<AdminPublic/>} >
        <Route index path='/login' element={<AdminLoginComponent/>}/> 
        </Route>
        
        <Route element={<AdminProtected/>}>
        <Route element={<AdminLayout/>}>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/users' element={<UserListComponent/>} />
        </Route>
        </Route>
        <Route/>
      </Routes>
    </div>
  )
}

export default AdminRoutes
