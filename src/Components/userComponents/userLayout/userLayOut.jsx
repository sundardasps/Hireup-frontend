import UserNavbar from "../../userComponents/userCommonComponents/UserNavbar";
import UserFooter from "../../userComponents/userCommonComponents/UserFooter";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function UserLayout() {
  return (
    <>
      <div>
        <div>
          <UserNavbar />
        </div>

        <div className="bg-gray-100 ">
          <Outlet />
        </div>
        <div>
          <UserFooter />
        </div>
        <Toaster/>
      </div>
    </>
  );
}

export default UserLayout;
