import { Navigate } from "react-router-dom";


function userPublic(props) {
 const token = localStorage.getItem("token")


  if (token) {
    return <Navigate to={"/"} />;
  } else {
    <Navigate to={"/login"} />;
    return props.children;
  }
}

export default userPublic;
