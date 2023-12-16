import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  MenuItem,
  Option,
  Select,
  Spinner,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { interviewSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import { interviewReSchedule, scheduleInterview } from "../../../Api/companyApi";

export default function RescheduleInterview({ details }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [loading,setLoadig] = useState(false)
  const handleLoading = () =>setLoadig((curr)=>!curr)
  const initialValue = {
    interviewer: details.value.interviewer,
    type: details.value.type,
    date: "" ,
    requirement: details.value.requirements,
  };


  const {
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    values,
    touched,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: interviewSchema,
    onSubmit: async (values) => {
      // If the user didn't select a new date and the date field hasn't been touched,
      // set details.value.date as the default
      if (!values.date) {
        setFieldValue('date', details.value.date);
      }
  
      // Continue with Yup validation and other logic
      try {
        await interviewSchema.validate(values, { abortEarly: false });
  
        handleLoading();
        const response = await interviewReSchedule({
          values,
          interviewId: details.value._id,
          userId: details.value.userId,
          jobId: details.value.jobId,
        });
        if (response.data.updated) {
          handleLoading();
          handleOpen();
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          toast.error(response.data.message);
          window.location.reload();
        }
      } catch (validationError) {
        // Handle Yup validation errors
        console.error(validationError.errors);
      }
    },
  });
  

  return (
    <>
      <MenuItem onClick={handleOpen}>reschedule</MenuItem>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <form action="" onSubmit={handleSubmit}>
          <DialogHeader className="justify-between">
            <div>
              <Typography variant="h5" color="blue-gray">
                Update interview 
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
          <DialogBody className="overflow-y-scroll ">
            <>
              <Typography>Schedule interview</Typography>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      name="interviewer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.interviewer}
                      label="Interviewer"
                    />
                    {touched.interviewer && errors.interviewer && (
                      <div className="text-red-500 text-xs">
                        {errors.interviewer}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Select
                      name="type"
                      onBlur={handleBlur}
                      value={values.type}
                      label="Interview type"
                      onChange={(selectedvalue) => {
                        setFieldValue("type", selectedvalue);
                      }}
                    >
                      <Option value="online">Online</Option>
                      <Option value="offline">Offline</Option>
                    </Select>
                    {touched.type && errors.type && (
                      <div className="text-red-500 text-xs">{errors.type}</div>
                    )}
                  </div>
                </div>

                <Input
                  label="Previous date"
                  value={details.value.date}
                  className="p-4"
                />
                <div className="flex gap-2 mt-2">
                  <div className="flex-1  ">
                    <Input
                      name="date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.date}
                      type="date"
                      label="Update Date"
                    />
                    {touched.date && (
                      <div className="text-red-500 text-xs">{errors.date}</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Textarea
                      name="requirement"
                      label="Requirements"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.requirement}
                    />
                    {touched.requirement && errors.requirement && (
                      <div className="text-red-500 text-xs">
                        {errors.requirement}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          </DialogBody>

          <DialogFooter className="justify-end gap-2">
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
        <Toaster />
      </Dialog>
    </>
  );
}
