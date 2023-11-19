
import {XMarkIcon} from '@heroicons/react/20/solid'
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
} from "@material-tailwind/react";
import { useFormik} from 'formik' 
import {toast,Toaster} from 'react-hot-toast'
import { companyPostSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import React, { useState } from 'react';
import { addCompanyPost } from '../../../Api/companyApi';
export function AddPostForm() {
  const [open, setOpen] = useState(false);
  function handleOpen(){setOpen(!open)}
  const [value,setValue] = useState({
     jobPosition:"",skills:"",experience:"",jobtype:"",responsibilities:"",endTime:"",salery:""
  })
 
 




  const handleSubmit = (e) =>{
    
    e.preventDefault()
    
   if(value.jobPosition === ""){
      toast.error("jobPosition field required")
     
    }else if(value.experience === ""){
      toast.error("experience field required")

       
    }else if(value.jobtype === ""){
      console.log(value.jobtype,"======");
      toast.error("type field required")

      
    }else if(value.skills === ""){
      toast.error("skills field required")

      
    }else if(value.responsibilities === ""){
      toast.error("responsibilities field required")
      
      
    }else if(value.endTime === ""){
      toast.error("endTime field required")

       
    }else if(value.salery === ""){
      toast.error("salery field required")
    }else{
      alert()
    }

  }
    
  
 
  return (
    <React.Fragment>
  


<Typography>
  <button onClick={handleOpen}>Add post</button>
</Typography>
  
    
      <Dialog open={open}  size="md" >
            <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              </CardBody>
             
              </Card>

      </Dialog>
    </React.Fragment>
  );
}