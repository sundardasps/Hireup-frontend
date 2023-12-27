import { BookmarkSlashIcon, BuildingOffice2Icon, CheckCircleIcon } from '@heroicons/react/20/solid';
import { Card, CardFooter, Typography } from '@material-tailwind/react';
import React, { useState } from 'react'
// import { JobFullDetails } from '../userHomeComponents/JobFullDetails';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSavedJobs, unsaveJobs } from '../../../Api/userApi';
import { JobFullDetails } from '../userHomeComponents/JobFullDetails';
import toast from 'react-hot-toast';
import MainLoadinig from '../../../Components/commonComponents/Loadings/MainLoding'
function SavedJobsCards() {
  const [selectedJob, setSelectedJob] = useState(null);
    const queryClient = useQueryClient();
  


  const {data,error, isLoading} = useQuery({
    queryKey:["savedJobs"],
    queryFn:async ()=>{
        try {
            const res = await getSavedJobs().then(res=>res.data)
            return res
        } catch (error) {
            console.log(error);
        }
    }
  })

  const handleUnsaveJobs =async (jobId)=>{
    try {
      const response = await unsaveJobs(jobId)
      if(response.status === 200){
        setSelectedJob(null)
        toast.success('Unsaved.')
        queryClient.invalidateQueries("userProfile");
      }else{
        toast.error('Something Error!')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleShowDetails = (jobData) => {
    setSelectedJob(jobData);
  };
  

  if(error){
    return (
        <h1>errorr</h1>
    )
  }

  if (isLoading ) {
    return <MainLoadinig/>;
  }

  return (
    <div className="flex justify-center  ">
    <div className="">
    </div>

    <div className=" mx-auto ">
      {data &&
        data.data &&
        data.data.length > 0 ?
        (data.data.map((data, index) => (
          <Card
            key={index}
            className=" flex  sm:flex-row justify-between container my-5   xl:w-[30rem] border bg-white  rounded-md hover:shadow-xl  "
          >
            <div className="m-2 mt-4 w-auto h-auto">
              <img
                src={data.companyImage}
                style={{ width: "80px", height: "50px" }}
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col  w-full  m-5">
              <div className="">
                <Typography color="blue" className="text-lg font-bold ">
                  {data.job_title}
                </Typography>
              </div>
              <div className="flex gap-1">
                <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                <Typography className="text-sm">
                  {data.companyName}
                </Typography>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="flex justify-center gap-2 ">
                  <Typography className="font-serift text-sm text-gray-600">
                    {data.companyLocation}({data.job_type})
                  </Typography>
                </div>
                <div className="flex flex-col mt-2 sm:mt-0">
                  <Typography className="font-semibold text-gray-700"></Typography>
                  <span className="text-gray-500"></span>
                </div>
              </div>
              <div className="flex justify-between">
                {data.is_active ? (
                  <div className=" flex text-green-400 mt-2 font-normal ">
                    <CheckCircleIcon className="w-5 h-5 mt-1 " /> Actively
                    recruiting
                  </div>
                ) : (
                  <div className=" flex  mt-2 font-normal ">
                  </div>
                )}
                <div
                  className="mt-2 cursor-pointer font-light hover:underline left-0 "
                  style={{ userSelect: "none" }}
                  onClick={() => handleShowDetails(data)}
                >
                  <span> Show details</span>
                </div>
              </div>
            </div>
            <CardFooter className=" ">
              <BookmarkSlashIcon
              onClick={()=>handleUnsaveJobs(data._id)}
              className="w-5 h-5  cursor-pointer  underline" />
            </CardFooter>
          </Card>
        ))
        ):(
          <Typography className="text-center text-gray-600 my-5">
            No saved jobs found.
          </Typography>
        )
        }

    </div>

    <div className="  m-5  hidden lg:block ">
      {selectedJob && (
        <JobFullDetails
          jobdata={selectedJob}
        />
      )}
    </div>
  </div>
);
}
  


export default SavedJobsCards