import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Step,
  Stepper,
  Card,
} from "@material-tailwind/react";
import {
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  CloudArrowUpIcon,
  CogIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import {useQuery} from '@tanstack/react-query'
import { checkJobAppliedStatus, createChat, getSingleJobData } from "../../../Api/userApi";
import { jwtDecode } from "jwt-decode";
import {useNavigate} from 'react-router-dom'
export default function AppliedJobStatus(jobdata) {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const navigate = useNavigate()
  const handleOpen = () => setOpen(!open);
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  const token = localStorage.getItem("token")
  const decode = jwtDecode(token)
  const userId = decode.exist._id

  const {data} = useQuery({
    queryKey:["appliedStatus",{jobId:jobdata.jobData._id}],
    queryFn:async () =>{
      const response = await checkJobAppliedStatus(userId,jobdata.jobData._id)
      return response
    }
  })
 
  console.log(jobdata,"=====ddjonbdata");

  const tapToChat =async ()=>{
    try {
      const response = await createChat({userId,companyId:data.data.application.companyId})
      if(response){
        navigate("/user/chat")
      }
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <>
      <Button
        size="sm"
        className="flex p-1"
        onClick={handleOpen}
        variant="outlined"
      >
        Status
        <QuestionMarkCircleIcon className="w-5 h-4 " />
      </Button>
      <Dialog size="xs" open={open} handler={handleOpen} className="">
        <div className="flex flex-col items-center ">
        <Typography className="border-b-2 m-5 p-0 font-semibold">Application Status</Typography>
          <Stepper
            style={{width:"50%"}}
            activeStep={data && data.data.status === "submitted"&& 0 || data && data.data.status === "rejected" && 1 ||data && data.data.status === "viewed" && 1||data && data.data.status === "sheduled" && 2}
          >
            <Step>
            <CloudArrowUpIcon className="h-5 w-5 " />
              <div className="absolute -bottom-[1.5rem] w-min text-center ">
                <Typography
                  variant="small"
                  color= "green" 
                  className=""
                >
                Submitted
                </Typography>
              </div>
            </Step>
            <Step>
             {data && data.data.status != "submitted" && (
                <>
                  {data.data.status === "rejected" ? <ExclamationCircleIcon className="h-5 w-5" />:<EyeIcon className="h-5 w-5" />}
                  <div className="absolute -bottom-[1.5rem] w-max text-center">
                    <Typography
                      variant="small"
                      color={data.data.status === "rejected"  ? "red" : "green"}
                    >
                      <span>{data.data.status}</span>
                    </Typography>
                  </div>
                </>
              )}
            </Step>
            <Step>
              {activeStep === 2 && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5" />
                  <ClipboardDocumentCheckIcon c className="h-5 w-5" />

                  <div className="absolute -bottom-[2rem] w-max text-center">
                    <Typography
                      variant="small"
                      color={activeStep === 2 ? "blue-gray" : "gray"}
                    >
                      Step 3
                    </Typography>
                  </div>
                </>
              )}
            </Step>
          </Stepper>
          </div>
          <div className="mt-10 p-5 border "  >
            <Typography variant="h6" className="flex justify-center text-center text-blue-gray-400 font-thin">
              {data && data.data.status === "submitted"&& (<><CheckCircleIcon className="h-5 w-7 m-1 " />The applications submitted</>)}
              {data && data.data.status === "viewed"&& (<><EyeIcon className="h-5 w-7 m-1" />The application  reviewed</>)}
              {data && data.data.status === "rejected"&& (<><ExclamationCircleIcon color="" className="w-5 h-7 "/>Your application rejected !</>)}
              {data && data.data.status === "sheduled"&& (<><ExclamationCircleIcon color="" className="w-5 h-7 "/>Your interview schedule !</>)}
            </Typography>

            { data&&data.data.status === "sheduled" &&
            <Card
              className=" flex  sm:flex-row justify-between container  xl:w-[30rem] border bg-white  rounded-md hover:shadow-xl  "
            >
              <div className="m-2 mt-4 w-auto h-auto">
                <img
                  src={jobdata?.jobData.companyImage}
                  style={{ width: "80px", height: "50px" }}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col  w-full  m-5">
                <div className="">
                  <Typography color="blue" className="text-lg font-bold ">
                      {jobdata?.jobData?.job_title}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                  <Typography className="text-sm">
                  {jobdata?.jobData?.companyName}
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex justify-center gap-2 ">
                    <Typography className="font-serift text-sm text-gray-600">
                    {jobdata?.jobData?.companyLocation}
                    </Typography>
                  </div>
                  <div className="flex flex-col mt-2 sm:mt-0">
                    <Typography className="font-semibold text-gray-700"></Typography>
                    <span className="text-gray-500"></span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div
                    className=" cursor-pointer font-light hover:underline  "
                    style={{ userSelect: "none" }}
                  >
                    <Button onClick={tapToChat} color="blue"> Connect</Button>
                  </div>
                </div>
              </div>

            </Card> }

          </div>
      </Dialog>
    </>
  );
}
