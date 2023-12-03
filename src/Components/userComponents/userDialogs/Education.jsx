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
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useFormik } from "formik";
import { educationAddSchema } from "../../../Utils/yupValidations/yupUserValidations";
import { addEducation } from "../../../Api/userApi";
import toast, { Toaster } from "react-hot-toast";

export function Education() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const handleLoading = () => setLoading((cur) => !cur);

  const initialVlaue = {
    universityName: "",
    courseName: "",
    courseStarted: "",
    courseEnded: "",
  };

  const { handleBlur, handleChange, handleSubmit, errors, values, touched } =
    useFormik({
      initialValues: initialVlaue,
      validationSchema: educationAddSchema,
      onSubmit: async () => {
        const response = await addEducation(values);
        if (response.data.created) {
          toast.success(response.data.message);
          handleOpen();
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
      <Dialog
        size=""
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[30rem]">
          <form action="" onSubmit={handleSubmit}>
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
                    type="date"
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
                    type="date"
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
              <Button variant="gradient" type="submit" fullWidth>
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Toaster />
      </Dialog>
    </>
  );
}
