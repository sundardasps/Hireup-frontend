import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DocumentIcon, PlusIcon } from "@heroicons/react/24/solid";

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
import {
  resumeSchema,
  resumeUploadedSchema,
} from "../../../Utils/yupValidations/yupUserValidations";
import { applyJob, getUserResumes } from "../../../Api/userApi";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient} from '@tanstack/react-query'

function JobApply({ data }) {
  const [open, setOpen] = React.useState(false);
  const [next, setNext] = useState(0);
  const [file, setFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [isLoading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const [userResumes, setUserResumes] = useState([]);
  const queryClient = useQueryClient()
  const initialValue = {
    resume: "",
  };

  const handleNext = () => {
    setNext((cur) => (cur < 2 ? cur + 1 : 2));
  };

  const userData = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    const getUserResume = async () => {
      const response = await getUserResumes();
      if (response.status === 200) {
        setUserResumes(response.data);
      }
    };
    getUserResume();
  }, []);

  const handleFile = (event) => {
    const currentFile = event.currentTarget.files[0];
    setFileType(currentFile.type);
    setFieldValue("resume", currentFile);
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleResume = (resume) => {
    setFieldValue("resume", resume);
  };

  const { handleSubmit, handleBlur, setFieldValue, errors, values, touched } =
    useFormik({
      initialValues: initialValue,
      validationSchema:
        userResumes.length > 0 ? resumeUploadedSchema : resumeSchema,
        onSubmit: async (value) => {
        handleLoading();
        const formData = new FormData();
        formData.append("resume", value.resume);
        formData.append("jobId", data.jobdata._id);
        formData.append("companyId", data.jobdata.companyId);
        const response = await applyJob(formData);
        if (response.data.created) {
          handleLoading();
          handleOpen();
          toast.success(response.data.message);
          setTimeout(() => {
            queryClient.invalidateQueries("userHome")
          }, 1000);
        } else {
          toast.error(response.data.message);
        }
      },
    });

  const handleOpen = () => {
    setFieldValue("resume", "");
    setFile("")
    setNext(() => 0);
    setOpen((cur) => !cur);
  };

  return (
    <div>
      <p
        onClick={() => {
          handleOpen();
        }}
      >
        Apply
      </p>
      <Dialog
        size="xs"
        open={open}
        className="bg-transparent shadow-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.5, y: -100 },
        }}
      >
        <Card className={`my-dialog ${next === 2 ? "step-two" : ""}`}>
          <form onSubmit={handleSubmit} encType="multipart/data">
            <CardBody className="grid grid-cols-1 gap-2 ">
              <Typography variant="h6" color="blue-gray">
                Verify for apply
              </Typography>
              <div className="flex w-full flex-col mb-5">
                <Progress
                  value={
                    (next === 0 && 10) ||
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
                  (next === 2 && "Select Resume")}
              </Typography>
              {next != 2 ? (
                <Input
                  value={
                    (next === 1 && data.jobdata.responsibilities) ||
                    (next === 0 && userData.number) ||
                    (next === 2 && userData.job_type)
                  }
                  size="lg"
                />
              ) : (
                <>
                  {userResumes.length > 0 ? (
                    <>
                      <div className="border shadow-inner  h-[5rem] scrollable  rounded-lg ">
                        {userResumes &&
                          userResumes.map((resume, index) => (
                            <li
                              key={index}
                              className="flex items-center  p-2 rounded-xl"
                            >
                              <div
                                className="flex cursor-pointer"
                                onClick={() => handleResume(resume.resume)}
                              >
                                <div className="flex gap-1 text-white text-base border p-1 rounded-md bg-blue-500 shadow-md">
                                  <DocumentIcon className="w-5 h-5" />
                                  <span>{resume.resumeName}</span>
                                </div>
                              </div>
                            </li>
                          ))}
                      </div>
                      {errors.resume && (
                        <div className="m-5 font-medium text-sm   text-red-800">
                          {errors.resume}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        name="resume"
                        onChange={handleFile}
                        size="lg"
                        accept=".pdf"
                        className="  block    cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      />
                      {errors.resume && (
                        <div className="m-5 font-medium text-sm   text-red-800">
                          {errors.resume}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

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
                       <div className="flex gap-1 text-white text-base border p-1 rounded-md bg-blue-500">
                       <DocumentIcon className="w-5 h-5"/><a href={file}>View resume</a>
                       </div>
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
              <Button variant="gradient" onClick={() => handleOpen()}>
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
