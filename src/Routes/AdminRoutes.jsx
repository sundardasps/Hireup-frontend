import  {Routes,Route}  from 'react-router-dom'
import AdminLoginComponent from '../Components/adminComponents/adminAuthComponents/AdminLoginComponent'
import DashboardPage from '../Pages/adminPages/dashboardPage/DashboardPage'
import AdminPublic from '../Utils/protected/AdminPublic'
// import AdminLayout from '../Components/adminComponents/adminLayOut/AdminLayout'
import LayoutAdmin from '../Components/adminComponents/adminLayOut/LayoutAdmin'

import AdminProtected from '../Utils/protected/AdminProtected'
import  { UserListComponent }     from '../Components/adminComponents/adminHomeComponents/UserListComponent'
import { CompanyListComponent } from '../Components/adminComponents/adminHomeComponents/CompanyListComponent'
import { CategoriesTable } from '../Components/adminComponents/adminHomeComponents/CategoriesTable'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<AdminPublic/>} >
        <Route index path='/login' element={<AdminLoginComponent/>}/> 
        </Route>
        
        <Route element={<AdminProtected/>}>
        <Route element={<LayoutAdmin/>}>
        <Route path='/' element={<DashboardPage/>}/>
        <Route path='/users' element={<UserListComponent/>} />
        <Route path='/companies' element={<CompanyListComponent/>} />
        <Route path='/category' element={<CategoriesTable/>} />


        </Route>
        </Route>
        <Route/>
      </Routes>
    </div>
  )
}

export default AdminRoutes
