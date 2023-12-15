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
} from "@material-tailwind/react";
import {
  BuildingLibraryIcon,
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
import { checkJobAppliedStatus } from "../../../Api/userApi";
import { jwtDecode } from "jwt-decode";

export default function AppliedJobStatus(jobdata) {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

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
        <DialogHeader className="border-b-2 m-5 p-0 font-light">Application Status</DialogHeader>
          <Stepper
            style={{width:"50%"}}
            activeStep={data && data.data.status === "submitted"&& 0 || data && data.data.status === "rejected" && 1 ||data && data.data.status === "viewed" && 1}
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
            </Typography>
          </div>
      </Dialog>
    </>
  );
}
