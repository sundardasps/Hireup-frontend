import React, { useEffect, useState } from "react";
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
  Spinner,
  IconButton,
  DialogFooter,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useFormik } from "formik";
import { imageEditSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import { Document, Page } from "react-pdf";
import {
  addEducation,
  addResume,
  deleteEducation,
  editEducation,
} from "../../../Api/userApi";
import toast, { Toaster } from "react-hot-toast";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export function Resume({ bgImage }) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const queryClient = useQueryClient();
  const handleOpen = () => setOpen((cur) => !cur);
  const handleIsFavorite = () => setIsFavorite((cur) => !cur);
  const handleLoading = () => setLoading((currectValue) => !currectValue);
  const [fileType, setFileType] = useState("");



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
      formData.append("pdfFile", value.image);
        const response = await addResume(formData);
      if (response.data.created) {
        setFile()
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
      <PlusIcon
        onClick={handleOpen}
        className="w-10 h-6 m-3 cursor-pointer"
      ></PlusIcon>

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
        <Typography variant="h5" className="text-center "  >
          Add resume
        </Typography>
        <form action="" onSubmit={handleSubmit} encType="multipart/data">
          <DialogHeader className="justify-between">
            {/*showing pdf */}
          
          </DialogHeader>
          <DialogBody>
            <div className="flex justify-center">
              <input
                className="  block    cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                id="formFileSm"
                name="image"
                type="file"
                onChange={(event) => {
                  const selectedFile = event.currentTarget.files[0];
                  setFileType(selectedFile.type);
                  setFieldValue("image", selectedFile);
                  setFile(URL.createObjectURL(event.target.files[0]));
                }}
                accept=".pdf"
              />
               {file && (
                <>
                  {fileType === "application/pdf" ? (
                    <iframe
                      src={file}
                      width="100%"
                      height="200px"
                      loading="lazy"
                      title="PDF-file"
                      className=""
                    ></iframe>
                  ) : (
                    <div className="w-24 h-auto border-2 ">
                      <img
                        src={file}
                        style={{ width: "100%", height: "100px" }}
                        alt=""
                      />
                    </div>
                  )}
                </>
              )}
              {errors.image && touched.image && (
                <div className="m-5 font-medium text-lg   text-red-800">
                  {errors.image}
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="">
            <Button type="submit" variant="gradient" color="blue" fullWidth>
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
    </>
  );
}
