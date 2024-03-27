import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

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
      className="shadow-md w-full  top-0 left-0  relative"
      style={myStyle}
    >
      <div className="md:flex  items-center justify-between bg-white py-4 md:px-10 px-7">
        {/* Logo section */}
        <Typography
        as="a"

        variant="h4"
        className="mr-4 cursor-pointer py-1.5"
      >
         <div className="font-extrabold text-2xl cursor-pointer text-blue-500  flex items-center gap-1">
          <span>HireUp</span>
        </div>
      </Typography>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!isOpen)}
          className="md:hidden block absolute right-8 top-6 cursor-pointer w-7 h-7 "
        >
          {isOpen ? <XMarkIcon /> : <Bars3CenterLeftIcon />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 md:static bg-white md:z-auto z-[-1] w-full md:w-auto md:pl-0 transition-all duration-500 ease-in ${
            isOpen ? "top-12 transition-all duration-500 ease-in delay-100" : "hidden md:top-0 md:flex"
          }`}
        >
          <li className=" font-normal ">
           <span className="m-1">Already Registered?</span>
            <Menu>
              <MenuHandler>
                <Button className="border shadow" color="white">
                  Login
                </Button>
              </MenuHandler>
              <MenuList>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2 "  onClick={() => {
                    navigate("/user/login");
                  }}>
                  <Typography variant="small" className="font-medium">
                    User
                  </Typography>
                </MenuItem>
                <MenuItem
                  className="flex items-center gap-2 "
                  onClick={() => {
                    navigate("/company/login");
                  }}
                >
                  <Typography variant="small" className="font-medium">
                    Company
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
            <span className="m-1">here.</span>
          </li>
        </ul>
        {/* Button */}
      </div>
    </div>
  );
}

export default UserNavbar;
