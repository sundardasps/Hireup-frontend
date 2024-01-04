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
import {
  AtSymbolIcon,
  DocumentIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import {
  getSingleUserApplication,
  scheduleInterview,
} from "../../../Api/companyApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserResume } from "./UserResume";
import { useFormik } from "formik";
import { interviewSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import { object } from "prop-types";
import toast, { Toaster } from "react-hot-toast";
export function AppliedUserAction({ data: { value, jobId } }) {
  const [open, setOpen] = React.useState(false);
  const [next, setNext] = useState(0);
  const queryclient = useQueryClient()
  const [applicationData,setApplicaionData] =  useState([])
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
      const response = await scheduleInterview({
        values,
        userId: value._id,
        jobId,
      });
      if (response.data.created) {
        handleOpen();
        toast.success(response.data.message);
          queryclient.invalidateQueries("singleUserApplication")
      
      } else {
        handleOpen();
        toast.error(response.data.message);
        queryclient.invalidateQueries('companyAppliedUsers')
      }
    },
  });


  useEffect(()=>{
    const fetchSingleUserApplication = async ()=>{
        try {
          const response = await getSingleUserApplication(value._id, jobId);
          if(response.data.fetched){
            setApplicaionData(response.data.jobApplication)
          }
        } catch (error) {
          console.log(error);
        }
    }
     {open && fetchSingleUserApplication()}
  },[value._id, jobId,open])



 
  return (
    <>
      <p onClick={handleOpen} className="p-3 hover:caret-light-blue-700 ">
        Details
      </p>
      <Dialog
        size="xs"
        className="p-3  bg-blue-gray-50 "
        open={open}
        handler={handleOpen}
      >
        <form action="" onSubmit={handleSubmit}>
          <DialogHeader className="justify-between border-b-2 border-white">
            <div>
              <Typography variant="h6">
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
          <DialogBody className="">
            {next === 0 ? (
              <>
                <div className="mb-1">
                  <ul className="mt-1 -ml-2 flex flex-col">
                    <li className="flex gap-2">
                      <AtSymbolIcon className="w-5 h-7" />
                      Email:{" "}
                      <span className="text-blue-600">{value.email}</span>
                    </li>
                    <li className="flex gap-2">
                      <PhoneIcon className="w-5 h-7" />
                      Number:{" "}
                      <span className="text-blue-600">{value.number}</span>
                    </li>
                    <li className="flex gap-2">
                      <MapPinIcon className="w-5 h-7" />
                      Place:{" "}
                      <span className="text-blue-600">{value.place}</span>
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
                  <div className="flex flex-col h-30 border shadow-inner bg-white ">
                    <div className="flex m-5">
                      <div className="flex gap-1 text-white text-base border p-1 rounded-md bg-blue-500">
                        <DocumentIcon className="w-5 h-5" />
                        <a href={applicationData?.resume}>
                          View resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
              <Typography className="text-2xl font-bold mb-4">Schedule Interview</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <Input
                    name="interviewer"
                    onChange={handleChange}
                    className="bg-white"
                    onBlur={handleBlur}
                    value={values.interviewer}
                    label="Interviewer"
                  />
                  {touched.interviewer && errors.interviewer && (
                    <div className="text-red-500 text-xs">{errors.interviewer}</div>
                  )}
                </div>
                <div className="mb-4">
                  <Select
                    name="type"
                    onBlur={handleBlur}
                    className="bg-white"
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
                <div className="mb-4">
                  <Input
                    name="date"
                    className="bg-white"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    type="date"
                    label="Date"
                  />
                  {touched.date && errors.date && (
                    <div className="text-red-500 text-xs">{errors.date}</div>
                  )}
                </div>
                <div className="mb-4">
                  <Textarea
                    name="requirement"
                    className="bg-white"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.requirement}
                    label="Requirements"
                  />
                  {touched.requirement && errors.requirement && (
                    <div className="text-red-500 text-xs ">{errors.requirement}</div>
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
        <Toaster />
      </Dialog>
    </>
  );
}
