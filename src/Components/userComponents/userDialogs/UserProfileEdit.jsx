import React, { useEffect, useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types"; // Import prop-types library
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

export default function UserProfileEdit({ profileData }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(!open), setFile("");
  };
  const [file, setFile] = useState("");
  const queryClient = useQueryClient();


  const userInitialData = {
    name: profileData.data.exist.userName,
    title: profileData.data.exist.userTitle,
    place: profileData.data.exist.place,
    number: profileData.data.exist.number,
  };
  
  const handleLoding = () =>{
    setLoading((currentLoading)=>!currentLoading)
  }
 


  //-----------------------------------Profile  edit--------------------------------//

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: userInitialData,
      validationSchema: userEditSchema,
      onSubmit: async (values) => {
        handleLoding()
        const response = await editUserProfile(values);
        if (response.data.updated) {
          queryClient.invalidateQueries("userProfile");
          handleLoding()
          handleOpen();
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
                {/* <div>
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
                </div> */}
              </div>

              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
                >
                     {loading === true ? (
                  <div className="flex justify-center gap-2">
                    <Spinner className="h-5 w-5" />
                    <span>Updating..</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
                </button>
              </div>
            </form>
          </section>
        </Dialog>


      <Toaster />
    </>
  );
}

UserProfileEdit.propTypes = {
  profileData: PropTypes.shape({
    data: PropTypes.shape({
      exist: PropTypes.shape({
        userName: PropTypes.string,
        userTitle: PropTypes.string,
        place: PropTypes.string,
        email: PropTypes.string,
        number: PropTypes.string,
      }),
    }),
  }),
};