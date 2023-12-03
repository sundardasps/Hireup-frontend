import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  Progress,
  Spinner,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { resumeSchema } from "../../../Utils/yupValidations/yupUserValidations";
import { applyJob } from "../../../Api/userApi";

function JobApply({ data }) {
  const [open, setOpen] = React.useState(false);
  const [next, setNext] = useState(0);
  const [file, setFile] = useState();
  const [fileType, setFileType] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  
  const handleOpen = () => {
    setNext(0)
    setOpen((cur) => !cur)
    setFile("")
  };

  const handleNext = () => {setNext((cur) => (cur < 2 ? cur + 1 : 2))}

  const userData = useSelector((state) => {
    return state.company;
  });

  const initialValue = {
    resume: "",
  };

  const handleFile = (event) => {
    const currentFile = event.currentTarget.files[0];
    setFileType(currentFile.type);
    setFieldValue("resume", currentFile);
    setFile(URL.createObjectURL(event.target.files[0]));
  };


  const {
    handleSubmit,
    handleBlur,
    setFieldValue,
    errors,
    values,
    touched
  } = useFormik({
    initialValues: initialValue,
    validationSchema: resumeSchema,
    onSubmit: async (value) =>{
      handleLoading()
      const formData = new FormData()
      formData.append("resume",value.resume)
      formData.append("jobId",data.jobdata._id)
      const response = await applyJob(formData)  
    },
  });

  return (
    <div>
      <p onClick={handleOpen}>Apply</p>
      <Dialog
        size="xs"
        open={open}
        className="bg-transparent shadow-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.5, y: -100 },
        }}
      >
        <Card>
          <form onSubmit={handleSubmit} encType="multipart/data">
            <CardBody className="grid grid-cols-1 gap-2 ">
              <Typography variant="h6" color="blue-gray">
                Varify for apply
              </Typography>
              <div className="flex w-full flex-col mb-5">
                <Progress
                  value={
                    (next ===  0   && 10) ||
                    (next === 1 && 65) ||
                    (next === 2 && 100)
                  }
                  color="blue"
                />
              </div>
              <Typography className="-mb-2" variant="small">
                {(next === 1 && "Job Title") ||
                  (next === 0 && "Name ") ||
                  (next === 2 && "Required Experience")}
              </Typography>
              <Input
                value={
                  (next === 1 && data.jobdata.job_title) ||
                  (next === 0 && userData.userName) ||
                  (next === 2 && data.jobdata.experience)
                }
                size="lg"
              />
              <Typography className="-mb-2" variant="small">
                {(next === 1 && "Required Skills") ||
                  (next === 0 && "Email ") ||
                  (next === 2 && "Job Type")}
              </Typography>
              <Input
                value={
                  (next === 1 && data.jobdata.required_skills) ||
                  (next === 0 && userData.email) ||
                  (next === 2 && data.jobdata.job_type)
                }
                size="lg"
              />
              {/* <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div> */}
              <Typography className="-mb-2" variant="small">
                {(next === 1 && "Job Responsibilities") ||
                  (next === 0 && "Number ") ||
                  (next === 2 && "Add Resume")}
              </Typography>
              {next < 2 ? (
                <Input
                  value={
                    (next === 1 && data.jobdata.responsibilities) ||
                    (next === 0 && userData.number) ||
                    (next === 2 && userData.job_type)
                  }
                  size="lg"
                />
              ) : (
                <input type="file" name="resume" onChange={handleFile}  size="lg" />
              )}

              {errors.resume && 
                (<div className="m-5 font-medium text-lg   text-red-800">
                  {errors.resume}
                </div>)
               }

              <Typography className="-mb-2" variant="small">
                 {(next === 1 && "Job Salery") ||
                  (next === 0 && "Title") ||
                  (next === 2 && "")}
              </Typography>
              {next < 2 && (
                <Input
              
                  value={
                    (next === 1 && data.jobdata.salery) ||
                    (next === 0 && userData.userTitle)
                  }
                  size="lg"
                />
                
              )}
              {file && (
                <>
                  {fileType === "application/pdf" ? (
                    <iframe
                      src={file}
                      width="100%"
                      height="100px"
                      loading="lazy"
                      title="PDF-file"
                      className=""
                    ></iframe>
                  ) : (
                    <div className="w-24 h-auto border-2 ">
                      <img
                        src={file}
                        style={{ width: "100%", height: "100px" }}
                        alt=""
                      />
                    </div>
                  )}
                </>
              )}
             
            </CardBody>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="gradient" onClick={handleOpen}>
                Discard
              </Button>
              <Button
                type={next === 2 && "submit"}
                variant="gradient"
                color="blue"
                onClick={handleNext}
              >
                 {isLoading === true ? (
                  <div className="flex justify-center gap-2">
                    <Spinner className="h-5 w-5" />
                    <span>Submiting...</span>
                  </div>
                ) : (
                    <span>Submit</span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </div>
  );
}

export default JobApply;
