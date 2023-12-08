import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { subCategoryDelete } from "../../../Api/adminApi";

export function SubcategoryList({ Subcategories }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const queryClint = useQueryClient();

  async function handleDeleteSkill(value) {
    try {
      const response = await subCategoryDelete(value, Subcategories._id);
      if (response.data.update) {
        handleOpen();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <p onClick={handleOpen} className="cursor-pointer">
        {Subcategories.title}
      </p>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <div>
            <Typography variant="h5" color="blue-gray">
              {Subcategories.title}
            </Typography>
          </div>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
        <DialogBody className="overflow-y-scroll max-h-48 ">
          {Subcategories &&
            Subcategories.category.map((value, index) => (
              <div className="mb-1" key={index}>
                <ul className=" mt-1 -ml-2 flex flex-col gap-1">
                  <MenuItem className="mb-1 flex items-center justify-between gap-1 !py-3 shadow-md ">
                    <Typography
                      className="uppercase"
                      color="blue-gray"
                      variant="h6"
                    >
                      {value}
                    </Typography>
                    <TrashIcon
                      className=" w-5 h-5"
                      onClick={() => handleDeleteSkill(value)}
                    />
                  </MenuItem>
                </ul>
              </div>
            ))}
        </DialogBody>
        <Toaster />
      </Dialog>
    </>
  );
}
