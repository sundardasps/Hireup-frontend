import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

function CompanyPublic(props) {
  const completed = useSelector((state) => {
    return state.company.completed;
  });



  if (localStorage.getItem("companyToken")) {
    if (completed === 0) {
      return <Navigate to="/company/fulldetails" />;
    }
    return <Navigate to={"/company"} />;
  } else {
    <Navigate to={"/"} />;
    return props.children;
  }
}

export default CompanyPublic;
