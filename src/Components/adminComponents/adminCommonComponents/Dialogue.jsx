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
import { toast, Toaster } from "react-hot-toast";
import {
  companyblockOrUnBlock,
  userblockOrUnBlock,
  categoryblockOrUnBlock,
} from "../../../Api/adminApi";

export function Dialogue({ data }) {
  const [open, setOpen] = React.useState(false);
  const quaryClint = useQueryClient();
  const handleOpen = () => setOpen(!open);

//---------------- user block or unblock -------------------//


  const handleActionUser = async () => {
    try {
      const response = await userblockOrUnBlock(data.id);
      if (response) {
        quaryClint.invalidateQueries("users");
        setOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

//---------------- company block or unblock -------------------//


  const handleActionCompany = async () => {
    try {
      const response = await companyblockOrUnBlock(data.id);
      if (response) {
        quaryClint.invalidateQueries("company");
        setOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

//---------------- category block or unblock -------------------//


  const handleActionCategory = async () => {
    try {
      const response = await categoryblockOrUnBlock(data.id);
      if (response.data.updated) {
        quaryClint.invalidateQueries("category");
        setOpen(false);
      } else {
        toast.error(response.data.message);
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
          className="w-[7rem]"
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
          {data.role ? (
            <Button
              variant="gradient"
              color="green"
              onClick={
                data.role === "user" ? handleActionUser : handleActionCompany
              }
            >
              <span>Confirm</span>
            </Button>
          ) : (
            <Button
              variant="gradient"
              color="green"
              onClick={handleActionCategory}
            >
              <span>Confirm</span>
            </Button>
          )}
        </DialogFooter>
        <Toaster />
      </Dialog>
    </>
  );
}
