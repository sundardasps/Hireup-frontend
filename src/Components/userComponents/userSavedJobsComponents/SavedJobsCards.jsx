import {
  BookmarkSlashIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { Card, CardFooter, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
// import { JobFullDetails } from '../userHomeComponents/JobFullDetails';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavedJobs, unsaveJobs } from "../../../Api/userApi";
import { JobFullDetails } from "../userHomeComponents/JobFullDetails";
import toast from "react-hot-toast";
import MainLoadinig from "../../../Components/commonComponents/Loadings/MainLoding";
import defaultCompany from "../../../../public/istockphoto-1454186576-612x612.jpg";
import { useNavigate } from "react-router-dom";
function SavedJobsCards() {
  const [selectedJob, setSelectedJob] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: async () => {
      try {
        const res = await getSavedJobs().then((res) => res.data);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleUnsaveJobs = async (jobId) => {
    try {
      const response = await unsaveJobs(jobId);
      if (response.status === 200) {
        setSelectedJob(null);
        toast.success("Unsaved.");
        queryClient.invalidateQueries("userProfile");
      } else {
        toast.error("Something Error!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowDetails = (jobData) => {
    setSelectedJob(jobData);
  };

  if (error) {
    return <h1>errorr</h1>;
  }

  if (isLoading) {
    return <MainLoadinig />;
  }

  return (
    <div className="grid lg:grid-cols-6 lg:grid-rows-5 gap-4 container m-auto mt-5 ">
      
        {data && data.data && data.data.length > 0 ? (
          data.data.map((data, index) => (
            <Card
              onClick={(e) => {
                e.stopPropagation(),
                  navigate("/user/jobDetails", {
                    state: { jobId: data._id },
                  });
              }}
              key={index}
              className={`col-span-3 m-auto flex-row justify-between container mb-5 cursor-pointer border hover:border-blue-600 bg-white  rounded-md hover:shadow-xl  w-[19.4rem]   h-[7rem]  md:mx-10  md:w-[25rem]   xl:w-[30rem] ${
                selectedJob?._id === data._id && "bg-blue-gray-50"
              } `}
            >
              <div className="mx-3 mt-3 w-auto h-auto ">
                <img
                  src={data.companyImage ? data.companyImage : defaultCompany}
                  style={{ width: "80px", height: "50px" }}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col   w-full   my-2">
                <div className="">
                  <Typography
                    color="blue"
                    className="text-xs font-bold   md:text-base "
                  >
                    {data.job_title}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                  <Typography className="text-xs md:text-xs">
                    {data.companyName}
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex justify-center gap-2  ">
                    <Typography className="font-serift text-xs text-gray-600 md:text-xs">
                      {data.companyLocation}({data.job_type})
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography className="font-semibold text-gray-700"></Typography>
                    <span className="text-gray-500"></span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div
                    className={`flex ${
                      data.is_active ? " text-green-400" : " text-white"
                    }  my-3  font-normal text-xs `}
                  >
                    <CheckCircleIcon className="w-4 h-4 " /> Actively recruiting
                  </div>
                  <div
                      className="my-3  cursor-pointer  font-light hover:underline  text-xs  "
                      style={{ userSelect: "none" }}
                      onClick={(e) => {
                        e.stopPropagation(), handleShowDetails(data);
                      }}
                    >
                    </div>
                </div>
              </div>
              <CardFooter className=" ">
                <BookmarkSlashIcon
                  onClick={(e) => {
                    e.stopPropagation(), handleUnsaveJobs(data._id);
                  }}
                  className="w-5 h-5  cursor-pointer  underline"
                />
              </CardFooter>
            </Card>
          ))
        ) : (
          <Typography className="text-center text-gray-600  ">
            No saved jobs found.
          </Typography>
        )}
      </div>

 
  );
}

export default SavedJobsCards;
