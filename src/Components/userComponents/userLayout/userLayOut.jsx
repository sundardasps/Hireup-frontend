import UserNavbar from "../../userComponents/userCommonComponents/UserNavbar";
import UserFooter from "../../userComponents/userCommonComponents/UserFooter";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function UserLayout() {
  return (
    
      <div >
        <div className="mb-16">
          <UserNavbar />
        </div>
        <div className="min-h-screen p-0.5">
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
