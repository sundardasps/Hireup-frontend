import React, { useState } from "react";
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
import { PencilIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import { userExperienceSchema } from "../../../Utils/yupValidations/yupUserValidations";
import { addExperience, experienceDelete, experienceEdit } from "../../../Api/userApi";
import toast, { Toaster } from "react-hot-toast";
 
export function EditExperience({editdata}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);
  const handleLoading = () => setLoading((cur) => !cur);


  const initialValue = {
    experience: editdata ? editdata.value : ""
  }




  
  const {handleBlur,handleChange,handleSubmit,values,errors,touched} = useFormik({
    initialValues:initialValue,
    validationSchema:userExperienceSchema,
    onSubmit: async (values) =>{

        handleLoading()
         const response = await( editdata ?  experienceEdit(editdata.value,values.experience) : addExperience(values) )
        if(response.data.created || response.data.updated  ){
        window.location.reload()
        handleLoading()
        handleOpen()
        toast.success(response.data.message)
        }else{
        handleLoading()
        toast.error(response.data.message)
        }
    }
  })

    const handleEdit = async () =>{
    
    try {
      const response = await experienceDelete(editdata.value)
      if(response.data.update){
        window.location.reload()
        handleLoading()
        handleOpen()
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }

         }



  return (
    <>
      {editdata?<PencilIcon  className="w-6 h-5 m-3 cursor-pointer" onClick={handleOpen}/>:<PlusIcon className="w-10 h-6 m-3 cursor-pointer" onClick={handleOpen} />}
      <Dialog
        size="xs"
        open={open}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
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
           <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              {editdata? "Edit experience": "Add experience"}
            </Typography>
        
            {editdata? <Input name="experience" label="Edit" onChange={handleChange} onBlur={handleBlur} value={values.experience}  size="lg" /> : <Input name="experience" onChange={handleChange} onBlur={handleBlur} value={values.experience}  label="Add" size="lg" /> }
            {errors.experience && touched.experience && (<div className="text-sm text-orange-900">{errors.experience}</div>)}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth>
            {loading === true ? (
                  <div className="flex justify-center gap-2">
                    <Spinner className="h-5 w-5" />
                    <span>Updating..</span>
                  </div>
                ) : (
                    <span>{editdata? "Update": "Submit"}</span>
                )}
                  
            </Button>
            { editdata &&
                   <Typography variant="small" className="m-3  flex justify-center gap-2 ">
                   Want to delete ?
                   <Typography
                    className=" font-semibold text-orange-900 cursor-pointer "
                    onClick={handleEdit}
                  >
                     {loading === true ? (
                  <div className="flex justify-center gap-2">
                    <Spinner className="h-5 w-5" />
                    <span>Deleting...</span>
                  </div>
                ) : (
                    <span>Delete</span>
                )}
                  </Typography>
                 </Typography>
              }
           </CardFooter>
        
          </form>
        </Card>
      <Toaster/>
      </Dialog>
    </>
  );
}