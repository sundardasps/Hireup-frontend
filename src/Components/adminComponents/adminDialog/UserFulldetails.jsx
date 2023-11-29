import React from "react";
import banner from "../../../../public/banner.webp";
import dp from "../../../../public/user.png";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  Typography,
  Chip,
  Select,
  Option,
} from "@material-tailwind/react";

export function UserFulldetails({ userData,companyData }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  console.log(userData);
  return (
    <>
      <p onClick={handleOpen}  className="cursor-pointer">
        {userData?userData.userName:companyData.companyName}
      </p>

      {userData && <Dialog size="xs" open={open} handler={handleOpen}>
        <div className="w-full ">
          <div className="bg-white  shadow-md">
            <div className="relative mb-20">
              {/* Background Image */}
              <div className="bgimage relative">
                <img
                  src={userData ? userData.userCoverDp : banner}
                  className="inline-block w-full h-48 border-2 border-white  object-cover object-center"
                  alt="Background"
                />
                <div className="absolute bottom-4 right-5 rounded-lg cursor-pointer">
                  {/* Any content you want to add inside the absolute positioned div */}
                </div>
              </div>
              {/* Profile Image */}
              <div className="absolute bottom-[-50%] left-24 transform -translate-x-1/2 mb-5">
                <a onClick={handleOpen}>
                  <img
                    src={userData ? userData.userDp : dp}
                    className="relative inline-block h-40 w-40 rounded-full outline-double object-cover object-center cursor-pointer"
                    alt="Profile"
                  />
                </a>
              </div>
            </div>
            <div>
              <div className="m-1">
                <h1 className="text-gray-900 font-semibold text-3xl leading-8 my-1">
                  {userData ? userData.userName : ""}
                </h1>
                <div>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6 cursor-pointer hover:text-light-blue-500">
                    {userData ? userData.userTitle : ""}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 cursor-pointer">
                  {userData ? userData.place : ""}
                </p>
              </div>
              <div className="flex justify-between gap-5 p-3 w-min ">
                <Select size="md" label="Skills " name="title">
                  {userData.skills.map((value, index) => (
                    <Option key={index}>{value.skill}</Option>
                  ))}
                </Select>
                <Select size="md" label="experience" name="title2">
                  <Option>
                    {userData.experience.map((value, index) => (
                      <Option key={index}>
                        {index}:{value}
                      </Option>
                    ))}
                  </Option>
                </Select>
              </div>
            </div>

            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3  divide-y rounded shadow-sm">
              <li className="flex items-center py-1">
                <span>Email</span>
                <span className="ml-auto">
                  {userData ? userData.email : ""}
                </span>
              </li>
              <li className="flex items-center py-1">
                <span>Phone</span>
                <span className="ml-auto">
                  {userData ? userData.number : ""}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Dialog>}

     
      {companyData && <Dialog size="xs" open={open} handler={handleOpen} >
        <div className="w-full ">
          <div className="bg-white  shadow-md">
            <div className="relative mb-20">
              {/* Background Image */}
              <div className="bgimage relative">
                <img
                  src={ banner}
                  className="inline-block w-full h-48 border-2 border-white  object-cover object-center"
                  alt="Background"
                />
                <div className="absolute bottom-4 right-5 rounded-lg cursor-pointer">
                  {/* Any content you want to add inside the absolute positioned div */}
                </div>
              </div>
              {/* Profile Image */}
              <div className="absolute bottom-[-50%] left-24 transform -translate-x-1/2 mb-5">
                <a onClick={handleOpen}>
                  <img
                    src={companyData ? companyData.image : dp}
                    className="relative inline-block h-40 w-40 rounded-full outline-double object-cover object-center cursor-pointer"
                    alt="Profile"
                  />
                </a>
              </div>
            </div>
            <div>
              <div className="m-1">
                <h1 className="text-gray-900 font-semibold text-3xl leading-8 my-1">
                  {companyData ? companyData.companyName : ""}
                </h1>
                <div>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6 cursor-pointer hover:text-light-blue-500">
                    {companyData ? companyData.location : ""}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 cursor-pointer">
                  {companyData ? companyData.address : ""}
                </p>
              </div>
              <div className="flex justify-between gap-5 p-3 w-auto ">
                <Select size="md" label="Job id's " name="title">
                  {companyData.jobs.map((value, index) => (
                    <Option key={index}>{value}</Option>
                  ))}
                </Select>
  
              </div>
            </div>

            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3  divide-y rounded shadow-sm">
              <li className="flex items-center py-1">
                <span>Email</span>
                <span className="ml-auto">
                  {companyData ? companyData.email : ""}
                </span>
              </li>
              <li className="flex items-center py-1">
                <span>Phone</span>
                <span className="ml-auto">
                  {companyData ? companyData.number : ""}
                </span>
              </li>
              <li className="flex items-center py-1">
                <span>Gst number</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    {companyData ? companyData.gst_number : ""}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Dialog>}


    </>
  );
}
