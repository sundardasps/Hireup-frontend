import { Navigate, Outlet } from "react-router-dom";


function userPublic(props) {
  if (localStorage.getItem("token")) {
     return <Navigate to={"/user"} />;

  } else {
    return <Outlet/>
  }
}

export default userPublic;
