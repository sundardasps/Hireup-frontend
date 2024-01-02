import React, { useEffect } from "react";
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
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useFormik } from "formik";
import { educationAddSchema } from "../../../Utils/yupValidations/yupUserValidations";
import {
  addEducation,
  deleteEducation,
  editEducation,
} from "../../../Api/userApi";
import toast, { Toaster } from "react-hot-toast";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
export function Education({ EditData }) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleLoading = () => setLoading((cur) => !cur);

  const queryClient = useQueryClient();

  const initialVlaue = {
    universityName: EditData ? EditData.value.universityName : "",
    courseName: EditData ? EditData.value.courseName : "",
    courseStarted: EditData ? EditData.value.courseStarted : "",
    courseEnded: EditData ? EditData.value.courseEnded : "",
  };

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: initialVlaue,
      validationSchema: educationAddSchema,
      onSubmit: async () => {
        const response = await (EditData
          ? editEducation(EditData.value, values)
          : addEducation(values));
        if (response.data.created || response.data.updated) {
          queryClient.invalidateQueries("userProfile");
          toast.success(response.data.message);
          handleOpen();
        } else {
          toast.error(response.data.message);
        }
      },
    });

  const handleDeleteEdu = async () => {
    try {
      const response = await deleteEducation(EditData.value);
      if (response.data.delete) {
        queryClient.invalidateQueries("userProfile");
        handleOpen();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {EditData ? (
        <PencilIcon
          className="w-10 h-6 m-3 cursor-pointer"
          onClick={handleOpen}
        ></PencilIcon>
      ) : (
        <PlusIcon
          onClick={handleOpen}
          className="w-10 h-6 m-3 cursor-pointer"
        ></PlusIcon>
      )}

      <Dialog
        size=""
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[30rem]">
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
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-2">
              <Typography variant="h4" color="blue-gray">
                Add education details
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Add university or college name
              </Typography>
              <Input
                name="universityName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.universityName}
                size="lg"
              />
              {errors.universityName && touched.universityName && (
                <div className="m-1 font-medium text-xs   text-red-800">
                  {errors.universityName}
                </div>
              )}
              <Typography className="-mb-2" variant="h6">
                Course name
              </Typography>
              <Input
                name="courseName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.courseName}
                size="lg"
              />
              {errors.courseName && touched.courseName && (
                <div className="m-1 font-medium text-xs   text-red-800">
                  {errors.courseName}
                </div>
              )}
              <Typography className="" variant="h6">
                Course duration
              </Typography>
              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="mb-4 md:mb-0">
                  <Input
                    name="courseStarted"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Started"
                    value={EditData && values.courseStarted}
                    type={EditData ? "text" : "date"}
                  />
                  {errors.courseStarted && touched.courseStarted && (
                    <div className="m-1 font-medium text-xs   text-red-800">
                      {errors.courseStarted}
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    name="courseEnded"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Ended"
                    value={EditData && values.courseEnded}
                    type={EditData ? "text" : "date"}
                  />
                  {errors.courseEnded && touched.courseEnded && (
                    <div className="m-1 font-medium text-xs   text-red-800">
                      {errors.courseEnded}
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="-ml-1 -mt-1">
              <Checkbox label="Provided data has been confirmed as accurate" />
            </div> */}
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" color="green" type="submit" fullWidth>
                {isLoading === true ? (
                  <div className="flex justify-center gap-2">
                    <Spinner className="h-5 w-5" />
                    <span>Updating..</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </Button>

              {EditData && (
                <Typography
                  variant="small"
                  className="m-3  flex justify-center gap-2 "
                >
                  Want to delete ?
                  <Typography
                    className=" font-semibold text-orange-900 cursor-pointer "
                    onClick={handleDeleteEdu}
                  >
                    {isLoading === true ? (
                      <div className="flex justify-center gap-2">
                        <Spinner className="h-5 w-5" />
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      <span>Delete</span>
                    )}
                  </Typography>
                </Typography>
              )}
            </CardFooter>
          </form>
        </Card>
        <Toaster />
      </Dialog>
    </>
  );
}
