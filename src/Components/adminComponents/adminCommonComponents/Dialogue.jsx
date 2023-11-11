import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
} from "@material-tailwind/react";
import { useQueryClient } from "@tanstack/react-query";
import { companyblockOrUnBlock, userblockOrUnBlock } from "../../../Api/adminApi";

export function Dialogue({ data }) {
  const [open, setOpen] = React.useState(false);
  const quaryClint = useQueryClient();
  const handleOpen = () => setOpen(!open);
 
 
  const handleActionUser = async () => {
    try {
      const response = await userblockOrUnBlock(data.id);
      if (response) {
        quaryClint.invalidateQueries("users");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
 

  const handleActionCompany = async () => {
    try {
      const response = await companyblockOrUnBlock(data.id);
      if (response) {
        quaryClint.invalidateQueries("company");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Tooltip content={data.is_blocked ? "UnBlock" : "Block"}>
        <Button
          fullWidth={true}
          onClick={handleOpen}
          size="sm"
          color={data.is_blocked ? "green" : "red"}
          variant="gradient"
        >
          {data.is_blocked ? "UnBlock" : "Block"}
        </Button>
      </Tooltip>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>
          {data.is_blocked ? "Do you want to unBlock" : " Do you want to Block"}{" "}
          : <span className="text-red-300">{data.name}</span>
        </DialogHeader>
        <DialogBody>{data.content}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={data.role === "user" ? handleActionUser : handleActionCompany}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
