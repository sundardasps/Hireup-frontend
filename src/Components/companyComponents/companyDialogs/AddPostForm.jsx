
import {PlusCircleIcon, XMarkIcon} from '@heroicons/react/20/solid'
import {
  Dialog,
  DialogBody,
  Typography,
  Input,
  Select,
  Option,
  Button,
  CardBody,
  Card,
  Badge,
  CardFooter,
} from "@material-tailwind/react";
import { useFormik} from 'formik' 
import {Toaster, toast} from 'react-hot-toast'
import { companyPostSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import React, { useState } from 'react';
import { addCompanyPost } from '../../../Api/companyApi';
import {useNavigate} from 'react-router-dom'
export function AddPostForm() {
  const [open, setOpen] = useState(false);
  function handleOpen(){setOpen(!open)}
  const navigate = useNavigate()
  const jobType = [
    "Remote",
    "Hybrid",
    "On site",
  ];

  const initialValues = {
    jobPosition: "",
    experience: "",
    skills: "",
    responsibilities: "",
    endTime: "",
    salery: "",
  };
 
 
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: companyPostSchema,
    onSubmit: async (values) => {
      console.log(values);
      const response = await addCompanyPost(values)
      if (response.data.created) {
        setOpen(!open);
        navigate("/company/posts")
      } else {
        toast.error(response.data.message)
      }
    },
  });



   const handlejobTypeChange = (selectedValue) =>{
      setFieldValue("jobType",selectedValue)
   }


    
  
 
  return (
    <>
    <p  onClick={handleOpen}>
      Add post 
    </p>

    <Dialog
      size="md"
      open={open}
      
      className="bg-transparent shadow-none"
    >
      <form onSubmit={handleSubmit} >
        <Card className="mx-auto w-full">
          <CardBody className="flex flex-col gap-2">
          <XMarkIcon className='w-6 h-6' onClick={handleOpen}/>
          
            <Input
              label="Job title"
              size="lg"
              name="jobPosition"
              type="jobPosition"
              value={values.jobPosition}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.jobPosition && errors.jobPosition && (
              <div className="text-red-500 text-xs ">{errors.jobPosition}</div>
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
                <div className="text-red-500 text-xs ">
                  {errors.skills}
                </div>
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
              <div className="text-red-500 text-xs ">{errors.responsibilities}</div>
            )}

            
            <Input
              label="salery"
              name="salery"
              value={values.salery}
              onChange={handleChange}
              onBlur={handleBlur}
              size="lg"
              type='number'
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
                  <Option value={item} key={item}>{item}</Option>
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
              type='date'
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
      <Toaster/>
    </Dialog>
  </>
  );
}