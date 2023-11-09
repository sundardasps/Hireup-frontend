
import UserDetails from '../../../Components/userComponents/userProfiieComponents/UserDetails'
import Sidebar from '../../../Components/userComponents/userProfiieComponents/ProfileSidebar'


function Profile() {
  return (
     <div className='flex bg-gray-100 '>
     <Sidebar/>
     <UserDetails/>
     </div>
  )
}

export default Profile
