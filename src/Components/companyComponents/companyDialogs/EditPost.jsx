import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { companyPostSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import { useQueryClient } from "@tanstack/react-query";
import { editPostDetails } from "../../../Api/companyApi";
export default function EditPost({ postData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const queryClient = useQueryClient();


  const jobType = ["Remote", "Hybrid", "On site"];


  const initialValue = {
    jobPosition: postData.jobDetails.job_title,
    experience: postData.jobDetails.experience,
    skills: postData.jobDetails.required_skills,
    responsibilities: postData.jobDetails.responsibilities,
    endTime: postData.jobDetails.end_time,
    salery: postData.jobDetails.salery,
    jobType: postData.jobDetails.job_type
    ,
  };
  const handlejobTypeChange = (selectedValue) => {
    setFieldValue("jobType", selectedValue);
  };
  
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: companyPostSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await editPostDetails(values,postData.jobDetails._id);
      if (response.data.updated) {
        handleOpen();
        queryClient.invalidateQueries("jobs");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    },
  });

  return (
    <div>
      <Button onClick={handleOpen} className="cursor-pointer">
        Edit post
      </Button>
      <Dialog size="md" open={open} className="bg-transparent shadow-none">
        <form onSubmit={handleSubmit}>
          <Card className="mx-auto w-full">
            <CardBody className="flex flex-col gap-2">
              <XMarkIcon className="w-6 h-6" onClick={handleOpen} />

              <Input
                label="Job title"
                size="lg"
                name="jobPosition"
                value={values.jobPosition}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.jobPosition && errors.jobPosition && (
                <div className="text-red-500 text-xs ">
                  {errors.jobPosition}
                </div>
              )}
              <Input
                label="experience"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
              />
              {touched.experience && errors.experience && (
                <div className="text-red-500 text-xs ">{errors.experience}</div>
              )}
              <div>
                <Input
                  label="skills"
                  name="skills"
                  style={{ Height: "40px" }}
                  value={values.skills}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.skills && errors.skills && (
                  <div className="text-red-500 text-xs ">{errors.skills}</div>
                )}
              </div>
              <Input
                label="responsibilities"
                name="responsibilities"
                value={values.responsibilities}
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
              />
              {touched.responsibilities && errors.responsibilities && (
                <div className="text-red-500 text-xs ">
                  {errors.responsibilities}
                </div>
              )}

              <Input
                label="salery"
                name="salery"
                value={values.salery}
                onChange={handleChange}
                onBlur={handleBlur}
                size="lg"
                type="number"
              />
              {touched.salery && errors.salery && (
                <div className="text-red-500 text-xs ">{errors.salery}</div>
              )}

              <div className="flex gap-2">
                <Select
                  onChange={handlejobTypeChange}
                  value={values.jobType}
                  name="jobType"
                  label="Catogery"
                  onBlur={handleBlur}
                >
                  {jobType.map((item) => (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                {touched.jobType && errors.jobType && (
                  <div className="text-red-500 text-xs ">{errors.jobType}</div>
                )}

                <Input
                  label="endTime"
                  name="endTime"
                  value={values.endTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="lg"
                  type="date"
                />
                {touched.endTime && errors.endTime && (
                  <div className="text-red-500 text-xs ">{errors.endTime}</div>
                )}
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
        <Toaster />
      </Dialog>
    </div>
  );
}
