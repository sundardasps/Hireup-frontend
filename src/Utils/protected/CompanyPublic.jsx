import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'

function CompanyPublic(props) {
 

  if (localStorage.getItem("companyToken")) {
    return <Navigate to={"/company"} />;
  } else {
     <Navigate to={"/"} />;
    return props.children;
  }
}

export default CompanyPublic;
