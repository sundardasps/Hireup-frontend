import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { DocumentIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { resumeDelete } from "../../../Api/userApi";
import toast from "react-hot-toast";
import {  useQueryClient } from "@tanstack/react-query";
 
export function Delete({data}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const queryClient = useQueryClient();

async function deleteResume(){
    try {
        const response = await resumeDelete(data._id)
        if(response.data.deleted){
          queryClient.invalidateQueries("userProfile");
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error);  
    }
  }


  return (
    <>
      <XMarkIcon className="w-6 h-6 mt-1.5 cursor-pointer" onClick={handleOpen}></XMarkIcon>
 

      <Dialog open={open} size="xs" handler={handleOpen}>

        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-black"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="indigo" variant="h5">
            Are you sure to delete 
          </Typography>
          <span className="flex gap-1 text-white text-base border p-1 rounded-md bg-blue-500">  <DocumentIcon className="w-5 h-5"/>{data.resumeName}</span>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={deleteResume}>
            YES,Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}