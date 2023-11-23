import React, { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { editProfileImage } from "../../../Api/companyApi";
import { useFormik } from "formik";
import { imageEditSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileImageEdit({ datas }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(!open), setFile("");
  };
  const [file, setFile] = useState("");
  const queryClient = useQueryClient();

  const initialValue = {
    image: file,
  };

  const { handleBlur, handleSubmit, errors, touched, values, setFieldValue } =
    useFormik({
      initialValues: initialValue,
      validationSchema: imageEditSchema,
      onSubmit: async (value) => {
        const formData = new FormData();
        formData.append("image", value.image);
        setLoading(true);
        const response = await editProfileImage(formData);
        if (response.data.updated) {
          setLoading(false);
          toast.success(response.data.message);
          queryClient.invalidateQueries("companyProfile");
          handleOpen();
        } else {
          toast.error(response.data.message);
        }
      },
    });

  return (
    <>
      <p onClick={handleOpen}>Click here to change image</p>
      <Dialog open={open} size={datas.size}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <DialogHeader>Edit profile image.</DialogHeader>
          <DialogBody>
            <img
              src={datas.image}
              alt=""
              style={{ width: "40%", height: "40%" }}
            />

            <div className="mt-5">
              <label>Add new profile</label>
              <input
                id="file-upload"
                name="image"
                type="file"
                onBlur={handleBlur}
                onChange={(event) => {
                  const selectedfield = event.currentTarget.files[0];
                  setFieldValue("image", selectedfield);
                  setFile(URL.createObjectURL(event.target.files[0]));
                }}
                accept="image/*"
                className="block w-auto text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
              />
              <img
                src={file}
                hidden={file ? false : true}
                className="m-4"
                style={{ width: "20%", height: "20%" }}
              />
            </div>
            {errors.image && touched.image && (
              <div className="font-semibold text-xs  text-red-500">
                {errors.image}
              </div>
            )}
          </DialogBody>
          <DialogFooter className="gap-4">
            <Button variant="outlined" color="red" onClick={handleOpen}>
              <span>close</span>
            </Button>
            <Button type="submit" variant="gradient" color="green">
              {loading === true ? (
                <span>
                  <Spinner className="h-5 w-5" />
                </span>
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
