import { Navigate } from "react-router-dom";

function CompanyPublic(props) {
  const company = localStorage.getItem("companyToken");

  if (company) {
    return <Navigate to={"/company"} />;
  } else {
    <Navigate to={"/"} />;
    return props.children;
  }
}

export default CompanyPublic;
