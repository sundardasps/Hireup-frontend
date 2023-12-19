import UserNavbar from "../../userComponents/userCommonComponents/UserNavbar";
import UserFooter from "../../userComponents/userCommonComponents/UserFooter";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function UserLayout() {
  return (
    
      <div >
        <div className="mb-20">
          <UserNavbar />
        </div>
        <div className="min-h-screen ">
          <Outlet  />
        </div>
        <div>
          {/* <UserFooter /> */}
        </div>
        <Toaster/>
      </div>
    
  );
}

export default UserLayout;
