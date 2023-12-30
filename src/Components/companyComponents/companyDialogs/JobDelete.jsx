import React, { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Spinner, Tooltip, Typography } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteJob } from "../../../Api/companyApi";
import toast, { Toaster } from "react-hot-toast";

export function JobDelete({data}) {
  const [open, setOpen] = React.useState(false);
  const [isLoading,setLoading] =  useState(false)
  const handleLoading = () => setLoading((curr)=>!curr);
  const handleOpen = () => setOpen(!open);

  const handledelete = async () => {
    try {
        handleLoading()
       const respone = await deleteJob(data._id)
       if(respone.data.updated){
           toast.success(respone.data.message)
           handleLoading()
           handleOpen()
          // window.location.reload()
       }else{
        toast.error(respone.data.message)
       }
    } catch (error) {
       console.log(error);
    }
  
    };
 
  return (
    <>
       <Tooltip content="Delete post"><TrashIcon onClick={handleOpen} className="w-5 h-5  cursor-pointer  underline">.</TrashIcon></Tooltip>
      
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader className="justify-center">
          <Typography variant="h5" color="blue-gray" >
            Your Attention is Required!
          </Typography>
        </DialogHeader>
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
          <Typography  variant="h4">
            You should read this!
          </Typography>
          <Typography className="text-center font-normal">
          Ensure proper deletion of sensitive information to maintain data security and privacy.
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient"  onClick={()=>handledelete()} >
            {isLoading === true ? (
                <span>
                  <Spinner className="h-5 w-5" />
                </span>
              ) : (
                <span>Ok,submit</span>
              )}
          </Button>
      
        </DialogFooter>
        <Toaster/>
      </Dialog>
    </>
  );
}