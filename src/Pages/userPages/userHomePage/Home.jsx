
import JobCards from '../../../Components/userComponents/userHomeComponents/JobCards'
import { SideBarFilter } from '../../../Components/userComponents/userHomeComponents/SideBarFilter'


function Home() {
  return (
    <div className="flex bg-blue-100 p-10 gap-10 ">
      <SideBarFilter/>
       <JobCards/>
    </div>
  )
}

export default Home
