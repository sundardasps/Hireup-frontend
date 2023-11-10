import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { QueryClient,useQueryClient } from "@tanstack/react-query";
import { userblockOrUnBlock } from "../../../Api/adminApi";
 
export function Dialogue({data}) {
    console.log(data.id,"=============-000000000");
  const [open, setOpen] = React.useState(false);
  const quaryClint = useQueryClient()
  const handleOpen = () => setOpen(!open);
  const handleAction = async ()=>{
     try {
      const response =  await userblockOrUnBlock(data.id)
      console.log(response,"====================");
      if(response){
          quaryClint.invalidateQueries("users")
          setOpen(false)
        }
     } catch (error) {
        console.error(error);
     }
  }

  return (
    <>
     <Tooltip   content={data.is_blocked ? "UnBlock" : "Block"} >
      <Button onClick={handleOpen} size="sm" color={data.is_blocked ? "green" : "red"} variant="gradient">
        {
            data.is_blocked ? "UnBlock" : "Block"
        }
      </Button>
      </Tooltip>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient"  color="green" onClick={handleAction}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}