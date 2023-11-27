import React, { useState } from "react";
import banner from '../../../../public/banner.webp'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
  button,
  Spinner,
} from "@material-tailwind/react";
import { EyeIcon, PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import { imageEditSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import { editUserBgImg } from "../../../Api/userApi";
import { useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

export function UserBgImg({ bgImage }) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const queryClient = useQueryClient();
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
  const handleLoading = () => setLoading((currectValue) => !currectValue);
  const initialValue = {
    image: "",
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: imageEditSchema,
    onSubmit: async (value) => {
      handleLoading();
      const formData = new FormData();
      formData.append("image", value.image);
      const response = await editUserBgImg(formData);
      if (response.data.updated) {
        handleLoading();
        handleOpen();
        toast.success(response.data.message);
        queryClient.invalidateQueries("userProfile");
      } else {
        toast.error(response.data.message);
      }
    },
  });

  return (
    <>
      <EyeIcon color="gray" className="w-6 h-9 " onClick={handleOpen}>
        dfdf
      </EyeIcon>
      <Dialog size="xs" className="container  " open={open}>
              <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
            className="m-2"
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
        <form action="" onSubmit={handleSubmit} encType="multipart/data">
          <DialogHeader className="justify-between">
            <img
              alt="nature"
              className="h-[13rem] w-full rounded-lg object-cover object-center"
              src={bgImage.data.exist.userCoverDp?bgImage.data.exist.userCoverDp:banner}
              style={{ width: "100%", height: "150px" }}
            />
          </DialogHeader>
          <DialogBody>
            <div className="">
              <input
                className="  block    cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                id="formFileSm"
                name="image"
                type="file"
                onChange={(event) => {
                  const selectedFile = event.currentTarget.files[0];
                  setFieldValue("image", selectedFile);
                  setFile(URL.createObjectURL(event.target.files[0]));
                }}
                accept="image/*"
              />
              {file && (
                <div className="flex justify-center items-center">
                  <div className="text-center">
                    <h3>Selected image</h3>
                    <img
                      src={file}
                      alt=""
                      className="rounded-md outline"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
              )}
              {errors.image && touched.image && (
                <div className="m-5 font-medium text-lg   text-red-800">
                  {errors.image}
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="">
            <Button type="submit" variant="gradient" color="green" fullWidth>
              {loading === true ? (
                <div className="flex justify-center gap-2">
                  <Spinner className="h-5 w-5" />
                  <span>Updating..</span>
                </div>
              ) : (
                <span>Submit</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
      <Toaster />
    </>
  );
}
