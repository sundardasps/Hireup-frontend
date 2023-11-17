import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
 
export function AddPostForm() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);


  
 
  return (
    <>
      <p onClick={handleOpen} >
        Add post
      </p>
      <Dialog open={open} handler={handleOpen} size="">

        <DialogBody className="">
        <form className="flex flex-col gap-4 p-3">
          <Typography variant="h6" color="blue-gray" className="-mb-1">
            Your Email
          </Typography>
          <Input type="text" label="job tile" />
          <Input label="Experience" />
          
          <div className="flex w-72 gap-2">
           <Select label="job type ">
           <Option>Material Tailwind HTML</Option>
           <Option>Material Tailwind React</Option>
           <Option>Material Tailwind Vue</Option>
           <Option>Material Tailwind Angular</Option>
           <Option>Material Tailwind Svelte</Option>
            </Select>
          <Input label="Date"  type="date"/>
        </div>
          <Textarea rows={1} label="Required skills" />
          <Textarea rows={5} label="Job responsibilities" />
          <Button>Send Message</Button>
        </form>
        </DialogBody>

      </Dialog>
    </>
  );
}