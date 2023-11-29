import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Progress,
} from "@material-tailwind/react";

function JobApply() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

     

    const initialOne = {
       name:"",
       email:"",
       number:"",
       title:"",
    }
    

  return (
    <div>
       <p onClick={handleOpen}>Apply</p>
      <Dialog
        size="xs"
        open={open}
        className="bg-transparent shadow-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.5, y: -100 },
        }}
      >
        <Card >

          <CardBody className="grid grid-cols-1 gap-2 ">
            <Typography variant="h6" color="blue-gray">
              Apply for job
            </Typography>
            <div className="flex w-full flex-col mb-5">
           <Progress value={5} color="blue" />
             </div>
            <Typography className="-mb-2" variant="small">
              Your Name
            </Typography>
            <Input  size="lg" />
            <Typography className="-mb-2" variant="small">
              Your Email
            </Typography>
            <Input  size="lg" />
            {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
             <Typography className="-mb-2" variant="small">
              Your Number
            </Typography>
            <Input  size="lg" />
            <Typography className="-mb-2" variant="small">
              Your Title
            </Typography>
            <Input  size="lg" />
          </CardBody>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="gradient" onClick={handleOpen} >
              Discard
            </Button>
            <Button variant="gradient" color="blue" onClick={handleOpen} >
              Next
            </Button>
          </CardFooter>
        </Card>


      </Dialog>
    </div>
  )
}

export default JobApply