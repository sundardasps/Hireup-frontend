import UserNavbar from '../../userComponents/userCommonComponents/UserNavbar'
import UserFooter from '../../userComponents/userCommonComponents/UserFooter'
import {Outlet} from 'react-router-dom'

function UserLayout() {
  return (
    <div className="grid grid-rows-[4rem] overflow-x-hidden">
      <div className="sticky  top-0 z-50">
               <UserNavbar/>
                </div>
                <div>
                <Outlet/>
                </div>
           <div>
      <div className="h-28 w-screen bg-white"></div>
         <UserFooter/>
      </div>
    </div>
  )
}

export default UserLayout
