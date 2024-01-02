import React from "react";
import Errorpage from "../../../../public/404.jpg";
import Logo from "../../../../public/logo.png";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
function ErrorComponent() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <img src={Errorpage} className="w-1/2 h-[33rem] " alt="" />
        <Button variant="outlined" onClick={() => navigate("/")}>
          back to home
        </Button>
      </div>
    </div>
  );
}

export default ErrorComponent;
