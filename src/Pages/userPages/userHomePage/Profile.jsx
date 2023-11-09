
import UserDetails from '../../../Components/userComponents/userProfiieComponents/UserDetails'
import Sidebar from '../../../Components/userComponents/userProfiieComponents/profileSideBar'


function Profile() {
  return (
     <div className='flex '>
     <Sidebar/>
     <UserDetails/>
     </div>
  )
}

export default Profile
