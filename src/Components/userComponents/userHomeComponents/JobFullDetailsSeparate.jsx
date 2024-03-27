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
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
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
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import DefaultImg from "../../../../public/istockphoto-1454186576-612x612.jpg";

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
    <>
      {/* <div className=" border m-auto container">
        <Card className="  container  my-3 w-screen   bg-white  h-auto border  rounded-none">
          <div className="flex  flex-col bg-blue-500">
            <div className="flex justify-between ">
              <ArrowLeftIcon
                className="w-10 h-6 m-4 cursor-pointer"
                onClick={() => navigate("/user")}
              />
              <text className="flex justify-around text-4xl m-2 text-white font-bold mx-5 ">
                {data ? data.data.jobDetails.job_title : ""}
                {data?.data?.isApproved && (
                  <CheckCircleIcon className="w-5 h-5 m-auto mx-2 " />
                )}
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
                    Save
                  </MenuItem>
                  <MenuItem>Cancel</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>

          <div className="flex flex-col gap-1 m-5 mb-3 ">
            <text className="flex bg-blue-gray-50 p-2 ">
              <ShoppingBagIcon className="w-5 h-5 " />
              {data ? data.data.jobDetails.job_type : ""}
            </text>
            <text className="flex p-2">
              <ComputerDesktopIcon className="w-5 h-5 " />
              {data ? data.data.jobDetails.experience : ""} year experience
              needed
            </text>
            <text className="flex bg-blue-gray-50 p-2">
              <CurrencyRupeeIcon className="w-5 h-5 " />
              Salary : {""}
              {data ? data.data.jobDetails.salery : ""} /-
            </text>
            <text className="flex p-2 ">
              <CalendarDaysIcon className="w-5 h-5  " />
              Application will closes on {""}
              {data ? data.data.jobDetails.end_time : ""}
            </text>
            <text className="flex bg-blue-gray-50 p-2 ">
              <CalendarDaysIcon className="w-5 h-5 " />
              Total applied: {""}
              {data ? data?.data?.count : ""}
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
      </div> */}

      <div className="container m-auto">
        <div className=" bg-blue-400  p-5">
          <ArrowLeftIcon
            className="w-20 h-6  cursor-pointer"
            onClick={() => navigate("/user")}
            color="white"
          />
          <div className="w-2/3  md:ml-16 md:mt-16  ">
            <Typography className="text-3xl  md:text-5xl " color="white" >
              {data ? data.data.jobDetails.job_title : ""} <br />
              <span className="md:flex">
                <span className=" mr-5">at</span>
                <div className="flex w-max ">
                {data?.data?.companyData?.companyName}
                {data?.data?.isApproved && (
                  <CheckCircleIcon className="w-10 h-10 m-auto mx-2 " />
                )}
                </div>
              </span>
            </Typography>
            <div className="my-5 text-blue-gray-900 md:w-1/2 ">
              <div className="text-xs my-4">
                <span>{data?.data?.companyData?.companyName}</span>,
                <span>{data?.data?.companyData?.address}</span>
                <br />
                <span className="text-base text-blue-gray-100">
                  Total applicants: {""}
                  {data ? data?.data?.count : ""}
                </span>
              </div>
              <div className="md:flex ">
              <Button className="border bg-transparent mr-5 mb-5 md:mb-0" onClick={()=>handleSaveJob(jobId)}>Save job</Button>
              {checkApplied ? (
                <Button className="bg-blue-gray-200">Applied.</Button>
              ) : (
                <Button
                  className={`text-sm w-max flex  ${
                    checkApplied ? "bg-blue-gray-600" : "bg-green-400"
                  }`}

                  onClick={()=>(<JobApply  data={{ jobdata: data?.data?.jobDetails }} />)}
                >
                  <CursorArrowRippleIcon className="w-6 h-6" />
                  <JobApply  data={{ jobdata: data?.data?.jobDetails }} />
                </Button>
              )}
              </div>
            </div>
          </div>
        </div>

        <div className=" md:grid grid-cols-5 grid-rows-5 gap-1 m-auto">
          <div className="col-span-3 p-10 ">
            <Typography className="my-1 text-blue-gray-400 text-lg font-semibold">
              About this role
            </Typography>
            <div className="col-span-3 row-start-2 md:flex gap-5 my-5">
              <img
                src={
                  data?.data?.companyData?.image
                    ? data?.data?.companyData?.image
                    : DefaultImg
                }
                className="h-[7rem] w-[8rem] border border-blue-gray-200 shadow-md shadow-blue-gray-700 rounded-lg"
                alt=""
              />
              <div className="md:w-3/5  p-1">
                <span className="text-base font-bold ">
                  {data ? data.data.jobDetails.job_title : ""}
                  <span className="font-light p-2">
                    {data ? data.data.jobDetails.job_type : ""}
                  </span>
                </span>
                <br />
                <div className="text-xs mt-2">
                  <span>{data?.data?.companyData?.companyName}</span>,
                  <span>{data?.data?.companyData?.address}</span>
                  <br />
                  <span className="text-xs mt-2 font-bold flex">
                    <CurrencyRupeeIcon className="w-5 h-5 " />
                    {""}
                    {data ? data.data.jobDetails.salery : ""} /-
                  </span>
                </div>
                {data?.data?.isApproved && (
                  <span className="flex">
                    Verified
                    <CheckCircleIcon
                      color="blue"
                      className="w-5 h-5 my-auto  "
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="col-span-3 row-start-3 my-5 font-normal">
              <p>{data ? data.data.jobDetails.responsibilities : ""}</p>
            </div>
            <div className="col-span-3 row-start-3 my-5  ">
              <Typography>Skills</Typography>
              <div className="flex flex-wrap">
                {data
                  ? data.data.jobDetails.required_skills
                      .split(",")
                      .map((value, i) => (
                        <p
                          key={i}
                          className="h-10 w-max  p-1 rounded-md m-1 border border-light-blue-500"
                        >
                          {value}
                        </p>
                      ))
                  : ""}
              </div>
            </div>
          </div>
          <div className="col-span-2 col-start-4 p-5  ">
            <div className="md:w-2/3">
              {!checkApplied ? (
                <h3 className="flex text-base hover:bg-green-300 rounded-md cursor-pointer border w-auto my-3 p-3 gap-1">
                  <CursorArrowRippleIcon className="w-6 h-6" />
                  <JobApply data={{ jobdata: data?.data?.jobDetails }} />
                </h3>
              ) : (
                <h3
                  onClick={() => navigate("/user/appliedJobs")}
                  className="flex text-sm cursor-pointer hover:bg-blue-100 rounded-md border w-auto my-3 p-3 gap-1"
                >
                  <CursorArrowRippleIcon className="w-6 h-6" />
                  Applied !
                </h3>
              )}
              {/* <h3 className="text-sm hover:bg-green-300 rounded-md border w-auto my-3 p-3 cursor-pointer">
                Apply for this job
              </h3>
              <h3 className="text-sm hover:bg-green-300 rounded-md border w-auto my-3 p-3 cursor-pointer">
                Apply for this job
              </h3> */}
            </div>
            {/* <div className="w-2/3 my-10">
              <Typography>Copy url</Typography>
              <Input value={window.location} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobFullDetailsSeparate;
