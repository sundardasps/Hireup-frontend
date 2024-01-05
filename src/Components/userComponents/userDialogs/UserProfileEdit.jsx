import React, { useEffect, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, List, ListItem, Option, Select, Spinner, Typography } from "@material-tailwind/react";
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
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/20/solid";
import { userEditSchema } from "../../../Utils/yupValidations/yupUserValidations";
import { categoryDataForUser, editUserProfile } from "../../../Api/userApi";

export default function UserProfileEdit({ profileData }) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [loading, setLoading] = useState(false);
  const handleOpen = () => {
    setOpen(!open), setFile("");
  };
  const [file, setFile] = useState("");
  const queryClient = useQueryClient();
  const [category, setCategory] = React.useState([]);

  const userInitialData = {
    name: profileData.data.exist.userName,
    title: profileData.data.exist.userTitle,
    place: profileData.data.exist.place,
    number: profileData.data.exist.number,
  };
  
  const handleLoding = () =>{
    setLoading((currentLoading)=>!currentLoading)
  }
 
    useEffect(() => {
    const fetchCategory = async () => {
      await categoryDataForUser().then((res) => setCategory(res.data.data));
    };

    //always scroll up ref
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchCategory();
  }, []);
  //-----------------------------------Profile  edit--------------------------------//

  const { handleBlur, handleChange, handleSubmit, errors, touched, values ,setFieldValue} =
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


    
  const handleOpen2 = (value) => {
    setOpen2(open2 === value ? 0 : value);
  };

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
                    // onChange={handleChange}
                    value={values.title}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
             <Typography className="text-white p-1">Select title</Typography>
            <List className="scrollable h-40 bg-white">
            {category &&
              category.map((value, index) => (
                <Accordion
                  key={index}
                  open={open2 === index + 1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === index + 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem
                    className="p-1 hover:bg-gray-200 border "
                    selected={open === index + 1}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen2(index + 1)}
                      className="border-b-0 p-0"
                    >
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-small"
                      >
                        {value.title}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    {value.category.map((value, index) => (
                      <List key={index}>
                        <ListItem
                          key={index}
                          onClick={(e)=>{
                             const selectedValue = e.target.innerText
                             setFieldValue("title",selectedValue)
                          }}
                          className="border-b-0 p-0"
                        >
                          {value}
                        </ListItem>
                      </List>
                    ))}
                  </AccordionBody>
                </Accordion>
              ))}
          </List>

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