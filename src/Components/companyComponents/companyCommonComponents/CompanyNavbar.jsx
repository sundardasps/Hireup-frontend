import { Bars3CenterLeftIcon, Bars3Icon, BookmarkIcon, ChatBubbleLeftRightIcon, HomeIcon, NewspaperIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Collapse,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutDetails2 } from "../../../Redux/storeSlices/companyslice";
import toast from "react-hot-toast";
import { TableCellsIcon } from "@heroicons/react/24/outline";

function CompanyNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const completed = useSelector((state) =>{
    return state.company.completed
   })
   

   useEffect(()=>{
     console.log(completed);
   },[completed])

  const handleLogOut = () => {
    dispatch(
      logOutDetails2({
        companyName:"",
        email: "",
        role: "",
        id:""
      })
      );
    localStorage.removeItem("companyToken");
    navigate("/");
  };
  function NavList() {
    return (
      <ul className="my-2 flex  flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-10 ">
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="font-medium cursor-pointer "
          onClick={()=>navigate('/company')}
        >
          <HomeIcon className="h-8 w-7" />
          <a
           
            className="flex items-center hover:text-blue-500 transition-colors "
          >
            Home
          </a>
        </Typography>
        <a
           onClick={() => navigate("/company/posts") }
          className="flex items-center hover:text-blue-500 transition-colors cursor-pointer"
        >
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className=" font-medium "
        > <NewspaperIcon  className="h-8 w-7 "/>Posts
        </Typography>
        </a>
        <a
          onClick={()=>navigate('/company/chat')}
          className="flex items-center hover:text-blue-500 transition-colors cursor-pointer"
        >
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className=" font-medium "
        > <ChatBubbleLeftRightIcon  className=" h-8 w-7 "/>Chat
        </Typography>
        </a>

        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          {localStorage.getItem("companyToken") ? (
            <Menu>
              <MenuHandler>
                <Avatar
                  variant="circular"
                  alt="tania andrew"
                  className="cursor-pointer"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={()=>completed ? navigate("/company/profile") : toast.error("Please update your profile first!")} className="flex items-center gap-2">

                  <Typography
                    variant="small"
                    className="font-medium"
                   
                  >
                  Profile
                  </Typography>
                </MenuItem>

                {/* <MenuItem className="flex items-center gap-2">
                  <Typography variant="small" className="font-medium">
                    Inbox
                  </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <Typography variant="small" className="font-medium">
                    Help
                  </Typography>
                </MenuItem> */}
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2 ">
                  <Typography
                    onClick={handleLogOut}
                    variant="small"
                    className="font-medium"
                  >
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Menu>
              <MenuHandler>
                <Button variant="outlined">Login</Button>
              </MenuHandler>
              <MenuList>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2 ">
                  <Typography
                    onClick={() => {
                      navigate("/login");
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
          )}
        </Typography>
      </ul> 
    );
  }

  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  },[]);

  return (
    <Navbar className=" fixed top-0 left-0 right-0 z-50  h-auto max-w-screen-xxl px-6 py-3 rounded-none">
     <div className="flex items-center justify-between text-blue-gray-900">
      <Typography
        as="a"

        variant="h3"
        className="mr-4 cursor-pointer py-1.5"
      >
         <div className="font-extrabold text-xl cursor-pointer text-blue-500  flex items-center gap-1">
          <img src="/public/logo.png" className="min-w-fit h-10"/><span>HireUp</span>
        </div>
      </Typography>
      <div className="hidden lg:block">
        <NavList />
      </div>
      <IconButton
        variant="text"
        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
        ripple={false}
        onClick={() => setOpenNav(!openNav)}
      >
        {openNav ? (
          <XMarkIcon className="h-6 w-6" strokeWidth={2} />
        ) : (
          <Bars3Icon className="h-6 w-6" strokeWidth={2} />
        )}
      </IconButton>
    </div>
    <Collapse open={openNav}>
      <NavList />
    </Collapse>
    
  </Navbar>
  );
}

export default CompanyNavbar;
