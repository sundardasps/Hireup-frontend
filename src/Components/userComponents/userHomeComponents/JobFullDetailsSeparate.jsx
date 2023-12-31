import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  checkJobAppliedOrNot,
  jobDetails,
  saveJobs,
} from "../../../Api/userApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  ComputerDesktopIcon,
  CurrencyRupeeIcon,
  CursorArrowRippleIcon,
  EllipsisVerticalIcon,
  ShoppingBagIcon,
} from "@heroicons/react/20/solid";
import JobApply from "../userDialogs/JobApply";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

function JobFullDetailsSeparate() {
  const location = useLocation();
  const { jobId } = location.state;
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.exist._id;
  const navigate = useNavigate();
  const [checkApplied, SetCheckApplied] = useState();

  useEffect(() => {
    const jobJobAppliedOrNot = async () => {
      try {
        const response = await checkJobAppliedOrNot(userId, jobId);
        if (response.data.exist) {
          SetCheckApplied(response.data.exist);
        }
      } catch (error) {
        console.log(error);
      }
    };
    jobJobAppliedOrNot();
  });

  const { data } = useQuery({
    queryKey: ["jobFulldetails"],
    queryFn: async () => {
      const response = await jobDetails(jobId);
      return response;
    },
  });

  const handleSaveJob = async (jobId) => {
    try {
      const response = await saveJobs(jobId);
      if (response.data.saved) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="  container mx-2 my-5 max-w-3xl   bg-white  h-auto border  rounded-none">
        <div className="flex  flex-col bg-blue-gray-200  ">
          <div className="flex justify-between ">
            <ArrowLeftIcon
              className="w-10 h-6 m-4 cursor-pointer"
              onClick={() => navigate("/user")}
            />
            <text className="flex justify-around text-4xl m-2 text-blue-gray-600 font-bold mx-5 ">
              {data ? data.data.jobDetails.job_title : ""}
            </text>
            <Menu>
              <MenuHandler>
                <EllipsisVerticalIcon className="w-10 h-8 m-4 cursor-pointer" />
              </MenuHandler>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    handleSaveJob(jobId);
                  }}
                >
                  Save job
                </MenuItem>
                <MenuItem>Cancel</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <div className="flex flex-col gap-1 m-5 mb-3 ">
          <text className="flex ">
            <ShoppingBagIcon className="w-5 h-5 " />
            {data ? data.data.jobDetails.job_type : ""}
          </text>
          <text className="flex ">
            <ComputerDesktopIcon className="w-5 h-5 " />
            {data ? data.data.jobDetails.experience : ""} year experience needed
          </text>
          <text className="flex ">
            <CurrencyRupeeIcon className="w-5 h-5 " />
            Salary : {""}
            {data ? data.data.jobDetails.salery : ""} /-
          </text>
          <text className="flex ">
            <CalendarDaysIcon className="w-5 h-5 " />
            Application will closes on {""}
            {data ? data.data.jobDetails.end_time : ""}
          </text>
        </div>

        <div className="mx-4">
          <p>Skills required</p>
        </div>
        <CardBody className="flex flex-col sm:flex-row justify-between w-auto h-auto bg-white m-2 first-letter shadow-inner rounded border">
          {data ? data.data.jobDetails.required_skills : ""}
        </CardBody>
        <div className="mx-4">
          <p>Responsibilities</p>
        </div>
        <CardBody className="flex flex-col sm:flex-row justify-between w-auto h-auto bg-white m-2 first-letter shadow-inner rounded border">
          {data ? data.data.jobDetails.responsibilities : ""}
        </CardBody>
        <CardFooter className="">
          {checkApplied ? (
            <Button
              size="sm"
              color="green"
              className="flex"
              onClick={() => navigate("/user/appliedJobs")}
            >
              <CursorArrowRippleIcon className="w-4 h-4" />
              Application submitted.
            </Button>
          ) : (
            <Button
              size="sm"
              color="blue"
              className="flex border shadow-xl shadow-blue-gray-200"
            >
              <CursorArrowRippleIcon className="w-4 h-4" />
              <JobApply data={{ jobdata: data?.data?.jobDetails }} />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default JobFullDetailsSeparate;
