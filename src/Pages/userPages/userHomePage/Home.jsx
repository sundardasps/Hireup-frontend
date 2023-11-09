
import JobCards from '../../../Components/userComponents/userHomeComponents/JobCards';
import { SideBarFilter } from '../../../Components/userComponents/userHomeComponents/SideBarFilter';


function Home() {
  return (
    <div className="flex">
      <div className="justify-start ">
        <SideBarFilter />
       </div>
       <div className="justify-center ">
        <JobCards />
      </div>
    </div>
  );
}

export default Home;
