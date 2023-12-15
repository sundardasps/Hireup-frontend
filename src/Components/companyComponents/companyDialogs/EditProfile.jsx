import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { companyFullDetailsEditSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import { useFormik } from "formik";
import { editProfileDetails } from "../../../Api/companyApi";
import {toast,Toaster} from "react-hot-toast"
import { useQueryClient} from '@tanstack/react-query'
export function EditProfile({ data }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const queryClient = useQueryClient()

  const initialValue = {
    companyName: data.companyName,
    companyLocation: data.location,
    companyAddress: data.address,
    size: data.size,
    gstNumber: data.gstNumber,
    companyRoles: data.roles,
    number:data.number,
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: companyFullDetailsEditSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await editProfileDetails(values)
      if(response.data.updated){
         handleOpen()
         queryClient.invalidateQueries("companyProfile")
         toast.success(response.data.message)
        
      }else{
        toast.error(response.data.message)
      }
    },
  });

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        edit
      </Button>
      <Dialog og open={open} handler={handleOpen} size="xl">
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
                  Company name
                </label>
                <input
                  name="companyName"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyName}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.companyName && touched.companyName && (
                  <div className="font-medium text-sm   text-red-800">
                    {errors.companyName}
                  </div>
                )}
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  comapany Location
                </label>
                <input
                  name="companyLocation"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyLocation}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.companyLocation && touched.companyLocation && (
                  <div className="font-medium text-sm   text-red-800">
                    {errors.companyLocation}
                  </div>
                )}
              </div>

              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Address
                </label>
                <input
                  name="companyAddress"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyAddress}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.companyAddress && touched.companyAddress && (
                  <div className="font-medium text-sm   text-red-800">
                    {errors.companyAddress}
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
                  company Size
                </label>
                <input
                  name="size"
                  type="number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.size}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.size && touched.size && (
                  <div className="font-medium text-sm    text-red-800">
                    {errors.size}
                  </div>
                )}
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  company Gst number
                </label>
                <input
                  name="gstNumber"
                  type="text"
                  min={1}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gstNumber}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
                {errors.gstNumber && touched.gstNumber && (
                  <div className="font-medium  text-sm   text-red-800">
                    {errors.gstNumber}
                  </div>
                )}
              </div>
              <div>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor="passwordConfirmation"
                >
                  Company roles
                </label>
                <textarea
                  name="companyRoles"
                  type="text"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.companyRoles}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                ></textarea>
                {errors.companyRoles && touched.companyRoles && (
                  <div className="font-medium text-sm    text-red-800">
                    {errors.companyRoles}
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
      <Toaster/>
    </>
  );
}
