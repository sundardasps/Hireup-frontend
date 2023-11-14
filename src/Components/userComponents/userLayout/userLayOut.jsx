import UserNavbar from "../../userComponents/userCommonComponents/UserNavbar";
import UserFooter from "../../userComponents/userCommonComponents/UserFooter";
import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <>
      <div>
        <div>
          <UserNavbar />
        </div>

        <div className="">
          <Outlet />
        </div>
        <div>
          <UserFooter />
        </div>
      </div>
    </>
  );
}

export default UserLayout;
