import React, { useState } from "react";
import banner from "../../../../public/banner.webp";
import dp from "../../../../public/user.png";
import { useQueryClient } from "@tanstack/react-query";
import { getjobdetails } from "../../../Api/adminApi";
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
  Card,
  CardFooter,
  AccordionHeader,
  ListItem,
  Accordion,
  List,
} from "@material-tailwind/react";
import {
  CalendarDaysIcon,
  ComputerDesktopIcon,
  CurrencyRupeeIcon,
  EllipsisVerticalIcon,
  ShoppingBagIcon,
  CursorArrowRippleIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { companyApprovel } from "../../../Api/adminApi";
import { toast, Toaster } from "react-hot-toast";
export function UserFulldetails({ userData, companyData }) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(0);
  const [jobDetails, setJobDetails] = useState(null);
  const handleOpen2 = (value) => {
    setOpen2(open2 === value ? 0 : value);
  };
  const handleOpen = () => {
    setOpen(!open), setJobDetails(null);
  };
  const quaryClient = useQueryClient();
  const companyApprovelHandling = async () => {
    try {
      const response = await companyApprovel(companyData._id);
      if (response.data.approved) {
        toast.success(response.data.message);
        quaryClient.invalidateQueries("company");
      } else {
        toast.success(response.data.message);
        quaryClient.invalidateQueries("company");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobs = async (id) => {
    try {
      const response = await getjobdetails(id);
      if (response.data.fetched) {
        setJobDetails(response.data.jobDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p onClick={handleOpen} className="cursor-pointer">
        {userData ? userData.userName : companyData.companyName}
      </p>

      {userData && (
        <Dialog size="xl" open={open} handler={handleOpen}>
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
          <Toaster />
        </Dialog>
      )}

      {companyData && (
        <Dialog
          size="xl"
          className="scrollable"
          open={open}
          handler={handleOpen}
        >
          <div className="flex  justify-around  ">
            <div className="bg-white  shadow-md w-1/2 m-3 border">
              <div className="relative mb-20">
                {/* Background Image */}
                <div className="bgimage relative">
                  <img
                    src={banner}
                    className="inline-block w-full h-32 border-2 border-white  object-cover object-center"
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
                <div className=" gap-5 p-3 w-auto ">
                  <span className="text-center">
                    Jobs num (Click to get details)
                  </span>
                  <List className="scrollable h-16  border-2 ">
                    {companyData?.jobs.map((value, index) => (
                      <Accordion key={index} open={open2 === index + 1}>
                        <ListItem
                          className="p-1 hover:bg-gray-200 border "
                          selected={open === index + 1}
                        >
                          <AccordionHeader
                            onClick={() => handleJobs(value)}
                            className="border-b-0 p-0"
                          >
                            <Typography
                              color="blue-gray"
                              className="m-auto font-small "
                            >
                              {index + 1}
                            </Typography>
                          </AccordionHeader>
                        </ListItem>
                      </Accordion>
                    ))}
                  </List>
                </div>
                <Typography className="mx-5">
                  total jobs : {companyData?.jobs.length}
                </Typography>
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

                <div className="flex justify-center p-3">
                  <Button
                    variant="gradient"
                    color={companyData.is_approved === true ? "red" : "green"}
                    onClick={() => companyApprovelHandling()}
                  >
                    {companyData.is_approved === true
                      ? "Cancel approvel"
                      : "Approve"}
                  </Button>
                </div>
              </ul>
            </div>

            <Card className=" m-3  h-30rem rounded-none   right-0  p-1 w-1/2 bg-blue-gray-50 border">
              {jobDetails != null ? (
                <>
                  <div className="flex flex-col  m-1 ">
                    <text className="flex  text-xl  text-light-blue-700 font-bold   m-1">
                      {jobDetails ? jobDetails.job_title : ""}
                    </text>
                    <div>
                      <text className="flex gap-2 text-sm  text-gray-500 font-bold  m-1">
                        <BuildingOffice2Icon className="h-5 w-5 text-teal-500" />
                        {jobDetails ? jobDetails.companyName : ""}
                      </text>
                    </div>
                  </div>

                  <div className=" ">
                    <div className="flex flex-col  m-2  ">
                      <text className="flex ">
                        <ShoppingBagIcon className="w-5 h-5 mx-1" />
                        {jobDetails ? jobDetails.job_type : ""}
                      </text>
                      <text className="flex ">
                        <ComputerDesktopIcon className="w-5 h-5 mx-1" />
                        {jobDetails ? jobDetails.experience : ""} year
                        experience needed
                      </text>
                      <text className="flex ">
                        <CurrencyRupeeIcon className="w-5 h-5 mx-1" />
                        Salary : {""}
                        {jobDetails ? jobDetails.salery : ""} /-
                      </text>
                      <text className="flex ">
                        <CalendarDaysIcon className="w-5 h-5 mx-1" />
                        Application will closes on {""}
                        {jobDetails ? jobDetails.end_time : ""}
                      </text>
                    </div>

                    <div className="flex flex-col h-80   scrollable ">
                      <div className="mx-4">
                        <p className="bg-blue-gray-100">Skills required</p>
                        <span className="text-sm ">
                          {jobDetails ? jobDetails.required_skills : ""}
                        </span>
                      </div>
                      <div className="mx-4  ">
                        <p className="bg-blue-gray-100">Responsibilities</p>
                        <span className="text-sm ">
                          {jobDetails ? jobDetails.responsibilities : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <span className="m-auto">Select a job</span>
              )}
            </Card>
          </div>
          <Toaster />
        </Dialog>
      )}
    </>
  );
}
