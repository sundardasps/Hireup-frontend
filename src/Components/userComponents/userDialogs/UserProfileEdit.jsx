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
import { PencilIcon } from "@heroicons/react/20/solid";
import { userEditSchema } from "../../../Utils/yupValidations/yupUserValidations";
import { editUserProfile } from "../../../Api/userApi";

export default function UserProfileEdit({ profileData, dpData }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(!open), setFile("");
  };
  const [file, setFile] = useState("");
  const queryClient = useQueryClient();

  console.log(profileData);

  const userInitialData = {
    name: profileData.data.exist.userName,
    title: profileData.data.exist.userTitle,
    place: profileData.data.exist.place,
    email: profileData.data.exist.email,
    number: profileData.data.exist.number,
  };

  //-----------------------------------Profile image edit--------------------------------//

  // const { handleBlur, handleSubmit, errors, touched, values, setFieldValue } =
  //   useFormik({
  //     initialValues: initialValue,
  //     validationSchema: imageEditSchema,
  //     onSubmit: async (value) => {
  //       const formData = new FormData();
  //       formData.append("image", value.image);
  //       setLoading(true);
  //       const response = await editProfileImage(formData);
  //       if (response.data.updated) {
  //         setLoading(false);
  //         toast.success(response.data.message);
  //         queryClient.invalidateQueries("companyProfile");
  //         handleOpen();
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     },
  //   });

  //-----------------------------------Profile  edit--------------------------------//

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: userInitialData,
      validationSchema: userEditSchema,
      onSubmit: async (values) => {
        console.log(values);
        const response = await editUserProfile(values);
        if (response.data.updated) {
          handleOpen();
          queryClient.invalidateQueries("userProfile");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      },
    });

  return (
    <>
      <Button
        variant="outlined"
        size="sm"
        onClick={handleOpen}
        className="flex gap-2"
      >
        Edit
        <PencilIcon className="w-5 h-4" />
      </Button>
      {dpData && (
        <Dialog open={open}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <DialogHeader>Edit profile image.</DialogHeader>
            <DialogBody>
              {/* <img
              src={datas?datas.size:""}
              alt=""
              style={{ width: "40%", height: "40%" }}
            /> */}

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
      )}

      {profileData && (
        <Dialog og open={open} handler={handleOpen} size="md">
          <section className=" p-3 mx-auto rounded-md shadow-md bg-light-blue-600 dark:bg-gray-800 ">
            <h1 className="text-xl font-bold text-white capitalize dark:text-white">
              Account settings
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">
                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="username"
                  >
                    name
                  </label>
                  <input
                    name="name"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  {errors.name && touched.name && (
                    <div className="font-medium text-sm   text-red-800">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="emailAddress"
                  >
                    Place
                  </label>
                  <input
                    name="place"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.place}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  {errors.place && touched.place && (
                    <div className="font-medium text-sm   text-red-800">
                      {errors.place}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="passwordConfirmation"
                  >
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  {errors.title && touched.title && (
                    <div className="font-medium text-sm   text-red-800">
                      {errors.title}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="passwordConfirmation"
                  >
                    number
                  </label>
                  <input
                    name="number"
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.number}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  {errors.number && touched.number && (
                    <div className="font-medium text-sm   text-red-800">
                      {errors.number}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="emailAddress"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    min={1}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                  {errors.email && touched.email && (
                    <div className="font-medium text-sm    text-red-800">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                >
                  Save
                </button>
              </div>
            </form>
          </section>
        </Dialog>
      )}

      <Toaster />
    </>
  );
}
