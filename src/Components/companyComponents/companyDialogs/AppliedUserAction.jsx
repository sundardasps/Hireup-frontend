import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import { AtSymbolIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { getSingleUserApplication } from "../../../Api/companyApi";
import { useQuery } from "@tanstack/react-query";
import { UserResume } from "./UserResume";
 
export function AppliedUserAction({data:{value,jobId}}){
  const [open, setOpen] = React.useState(false);
  const [applyDetails,setApplyDetails] = useState([])
  const handleOpen = () => setOpen((cur) => !cur);



const {data} = useQuery({
   queryKey:["singleUserApplication",value._id,jobId],
   queryFn: async ()=>{
    const response = await getSingleUserApplication(value._id,jobId)
    return response
   }
})



  return (
    <>
      <Button variant="outlined" size="sm" onClick={handleOpen}>View application</Button>
       <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div >
            <Typography variant="h5">
            Applicant Name :  <span className="uppercase text-blue-600">{value.userName}</span>
            </Typography>
           <span className="text-base"> {value.userTitle}</span>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody className="overflow-y-scroll m-3 border border-black ">
          <div className="mb-1">
            <ul className="mt-1 -ml-2 flex flex-col  ">
            <li className="flex gap-2"><AtSymbolIcon className="w-5 h-7"/>Email:<span className="text-blue-600">{value.email}</span></li>
            <li className="flex gap-2"><PhoneIcon className="w-5 h-7"/>Number:<span className="text-blue-600">{value.number}</span></li>
            <li className="flex gap-2"><MapPinIcon className="w-5 h-7"/>Place:<span className="text-blue-600">{value.place}</span></li>
            </ul>
          </div>
          <div>
            <Typography
              variant="paragraph"
              color="blue-gray"
              className="m-1 font-semibold uppercase opacity-70"
            >
              Resume/cv
            </Typography>
            <div className=" flex flex-col  h-40  ">
                <UserResume resume={data && data.data.jobApplication.resume} resumeType={data && data.data.resumeType} />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="justify-end gap-2">
          <Button variant="outlined" size="sm" className="hover:bg-blue-gray-300">
           Shedule a interview
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}