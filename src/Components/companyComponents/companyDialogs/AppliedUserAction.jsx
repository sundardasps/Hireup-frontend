import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  MenuItem,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { AtSymbolIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { getSingleUserApplication, scheduleInterview } from "../../../Api/companyApi";
import { useQuery } from "@tanstack/react-query";
import { UserResume } from "./UserResume";
import { useFormik } from "formik";
import { interviewSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import { object } from "prop-types";
import toast, { Toaster } from "react-hot-toast";
export function AppliedUserAction({ data: { value, jobId } }) {
  const [open, setOpen] = React.useState(false);
  const [next, setNext] = useState(0);
  const handleOpen = () => {
    setOpen((cur) => !cur), setNext(0);
  };
  const handleNext = () => {
    setNext((curr) => (curr <= 1 ? curr + 1 : curr));
  };

  const handleDiscard = () => {
    setNext(0);
  };

  const initialValue = {
    interviewer: "",
    type: "",
    date: "",
    requirement: "",
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
       const response  = await scheduleInterview({values,userId:value._id, jobId})
       if(response.data.created){
         handleOpen()
         toast.success(response.data.message)
         setTimeout(()=>{
          window.location.reload()
         },1000)
       }else{
        toast.error(response.data.message)
        window.location.reload()
       }
    },
  });

  const { data } = useQuery({
    queryKey: ["singleUserApplication", value._id, jobId],
    queryFn: async () => {
      const response = await getSingleUserApplication(value._id, jobId);
      return response;
    },
  });

  return (
    <>
      <p onClick={handleOpen} className="p-3 hover:caret-light-blue-700 ">
        Details
      </p>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <form action="" onSubmit={handleSubmit}>
          <DialogHeader className="justify-between">
            <div>
              <Typography variant="h5">
                Applicant Name :{" "}
                <span className="uppercase text-blue-600">
                  {value.userName}
                </span>
              </Typography>
              <span className="text-base"> {value.userTitle}</span>
            </div>
            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleOpen}
            >
              <svg
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
          <DialogBody className="overflow-y-scroll m-3 border border-black ">
            {next === 0 ? (
              <>
                <div className="mb-1">
                  <ul className="mt-1 -ml-2 flex flex-col  ">
                    <li className="flex gap-2">
                      <AtSymbolIcon className="w-5 h-7" />
                      Email:<span className="text-blue-600">{value.email}</span>
                    </li>
                    <li className="flex gap-2">
                      <PhoneIcon className="w-5 h-7" />
                      Number:
                      <span className="text-blue-600">{value.number}</span>
                    </li>
                    <li className="flex gap-2">
                      <MapPinIcon className="w-5 h-7" />
                      Place:<span className="text-blue-600">{value.place}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="m-1 font-semibold uppercase opacity-70"
                  >
                    Resume/cv
                  </Typography>
                  <div className=" flex flex-col  h-40  ">
                    <UserResume
                      resume={data && data.data.jobApplication.resume}
                      resumeType={data && data.data.resumeType}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Typography>Schedule interview</Typography>
                <div className="flex gap-2 mb-1 mt-2">
                  <div>
                    <Input
                      name="interviewer"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.interviewer}
                      label="Interviewer"
                    />
                    {touched.interviewer && errors.interviewer && (
                      <div className="text-red-500 text-xs ">
                        {errors.interviewer}
                      </div>
                    )}
                  </div>
                  <div>
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
                      <Option value="offline">offline</Option>
                    </Select>
                    {touched.type && errors.type && (
                      <div className="text-red-500 text-xs ">{errors.type}</div>
                    )}
                  </div>
                </div>
                <div className=" mb-1 mt-2">
                  <div className="m-3">
                    <Input
                      name="date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.date}
                      type="date"
                      label="date"
                    />
                    {touched.date && errors.date && (
                      <div className="text-red-500 text-xs ">{errors.date}</div>
                    )}
                  </div>
                  <div>
                    <Textarea
                      name="requirement"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.requirement}
                      label="Requirements"
                    />
                    {touched.requirement && errors.requirement && (
                      <div className="text-red-500 text-xs ">
                        {errors.requirement}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogBody>
          <DialogFooter className="justify-end gap-2">
            <Button
              variant="outlined"
              size="sm"
              className="hover:bg-blue-gray-300"
              onClick={handleDiscard}
            >
              Discard
            </Button>
            <Button
              variant="outlined"
              size="sm"
              className="hover:bg-blue-gray-300"
              onClick={handleNext}
              type={next === 2 ? "submit" : ""}
            >
              Shedule a interview
            </Button>
          </DialogFooter>
        </form>
        <Toaster/>
      </Dialog>
    </>
  );
}
