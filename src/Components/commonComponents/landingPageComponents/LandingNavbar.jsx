import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOutDetails } from "../../../Redux/storeSlices/userSlice";

import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";

function UserNavbar() {
  let [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();


  const myStyle = {
    zIndex: 999,
  };

  return (
    <div
      className="shadow-md w-full fixed top-0 left-0  relative"
      style={myStyle}
    >
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* Logo section */}
        <div className="font-extrabold text-2xl cursor-pointer text-blue-500  flex items-center gap-1">
          <span>HireUp</span>
        </div>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!isOpen)}
          className="md:hidden block absolute right-8 top-6 cursor-pointer w-7 h-7 "
        >
          {isOpen ? <XMarkIcon /> : <Bars3CenterLeftIcon />}
        </div>
        {/* Link items (responsive) */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 md:static bg-white md:z-auto z-[-1] w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            isOpen ? "top-12" : "hidden md:top-0 md:flex"
          }`}
        >
          <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <Menu>
                <MenuHandler>
                  <Button variant="outlined">Login</Button>
                </MenuHandler>
                <MenuList>
                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem className="flex items-center gap-2 ">
                    <Typography
                      onClick={() => {
                        navigate("/user/login");
                      }}
                      variant="small"
                      className="font-medium"
                    >
                      User Login
                    </Typography>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2 ">
                    <Typography
                      onClick={() => {
                        navigate("/company/login");
                      }}
                      variant="small"
                      className="font-medium"
                    >
                      Company Login
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            
          </li>
        </ul>
        {/* Button */}
      </div>
    </div>
  );
}

export default UserNavbar;
