import React, { useEffect, useState } from "react";
import userLogo from "../../../../public/user.png";
import banner from "../../../../public/banner.webp";
import MainLoading from "../../commonComponents/Loadings/MainLoding";
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
  Tabs,
  TabsHeader,
  Tab,
  Progress,
  IconButton,
} from "@material-tailwind/react";
import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";
import UserProfileEdit from "../userDialogs/UserProfileEdit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addSkills, editUserDp, getProfile } from "../../../Api/userApi";
import { useFormik } from "formik";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { imageEditSchema } from "../../../Utils/yupValidations/yupCompanyvalidations";
import { UserBgImg } from "../userDialogs/UserBgImg";
import { PlusIcon } from "@heroicons/react/24/solid";
import { AllSkills } from "../userDialogs/AllSkills";
import { EditExperience } from "../userDialogs/EditExperience";

function UserDetails() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await getProfile().then((res) => res.data);
      return response;
    },
  });
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const [skillForm, setSkillForm] = useState({
    skill: "",
    level: "",
  });
  const [selectedImage, setSelectedImage] = useState("");

  const [skillErros, setSkillError] = useState({
    skill: "",
    level: "",
  });

  const initialValue = {
    image: selectedImage,
  };

  const TABS = [
    {
      label: "Beginner",
      value: "Beginner",
      color: "text-light-blue-700",
    },
    {
      label: "Intermediate",
      value: "Intermediate",
      color: "text-yellow-800",
    },
    {
      label: "Advanced",
      value: "Advanced",
      color: "text-green-600",
    },
  ];

  const handleOpen = () => {
    setOpen((cur) => !cur), setSelectedImage("");
  };

  const handleLoading = () => {
    setLoading((currentLoading) => !currentLoading);
  };

  //-----------------------------------------Profile data fetching----------------------------------------//

  const handleSkill = (e) => {
    const { name, value } = e.target;
    setSkillForm((pre) => ({
      ...pre,
      [name]: value,
    }));

    setSkillError((pre) => ({
      ...pre,
      [name]: "",
    }));
  };

  const validateSkill = (skillForm) => {
    const errors = {};
    if (!skillForm.skill.trim()) {
      errors.skill = "Skill is required";
    }
    if (!skillForm.level.trim()) {
      errors.level = "Level is required";
    }
    return errors;
  };

  //-----------------------------------------User dp updation ----------------------------------------//

  const { handleBlur, handleSubmit, errors, touched, values, setFieldValue } =
    useFormik({
      initialValues: initialValue,
      validationSchema: imageEditSchema,
      onSubmit: async (value) => {
        handleLoading();
        const formData = new FormData();
        formData.append("image", value.image);
        const response = await editUserDp(formData);
        if (response.data.updated) {
          handleLoading();
          handleOpen();
          toast.success(response.data.message);
          queryClient.invalidateQueries("userProfile");
        } else {
          toast.error(response.data.message);
        }
      },
    });

  //-----------------------------------------User Skills updation ----------------------------------------//

  const AddSkills = async () => {
    try {
      const errors = validateSkill(skillForm);
      if (Object.keys(errors).length > 0) {
        setSkillError(errors);
        return;
      }
      const response = await addSkills(skillForm);
      if (response.data.updated) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
 
    return <MainLoading />;
  }

  if (error) {
    return <h1>error.....</h1>;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="bg-gray-100 overflow-auto no-scrollbar">
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              <div className="w-full md:w-6/12 md:mx-2">
                <div className=" bg-white p-2 shadow-md">
                  <div className=" relative mb-20">
                    {/* Background Image */}
                    <div className="bgimage relative">
                      <img
                        src={
                          data.exist.userCoverDp
                            ? data.exist.userCoverDp
                            : banner
                        }
                        className="inline-block w-full h-48 border-2 border-white rounded-md object-cover object-center"
                        alt="Background"
                      />
                      <div className="absolute bottom-4 right-5  rounded-lg cursor-pointer">
                        <UserBgImg bgImage={{ data }} />
                      </div>
                    </div>
                    {/* Profile Image */}
                    <div className=" absolute bottom-[-50%] left-24 transform -translate-x-1/2 mb-5">
                      <a onClick={handleOpen}>
                        <img
                          src={data.exist.userDp ? data.exist.userDp : userLogo}
                          className="relative inline-block h-40 w-40 rounded-full outline-double object-cover object-center cursor-pointer"
                          alt="Profile"
                        />
                      </a>
                    </div>
                  </div>
                  <h1 className="text-gray-900 font-semibold text-3xl leading-8 my-1 ">
                    {data ? data.exist.userName : ""}
                  </h1>
                  <div>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6 cursor-pointer hover:text-light-blue-500">
                      {data ? data.exist.userTitle : ""}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 cursor-pointer ">
                    {data ? data.exist.place : ""}
                  </p>
                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Email</span>
                      <span className="ml-auto">
                        {data ? data.exist.email : ""}
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Phone</span>
                      <span className="ml-auto">
                        {data ? data.exist.number : ""}
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      </span>
                    </li>
                  </ul>
                  <div className="flex justify-end m-3">
                    <UserProfileEdit profileData={{ data }} />
                  </div>
                </div>

                <div className="my-4"></div>

                <div className="bg-white p-2 hover:shadow">
                  <form action="">
                    <div className="flex justify-between  space-x-3 font-semibold text-gray-900 text-xl leading-8">
                      <span>Add skills</span>
                      <PlusIcon
                        className="w-8 h-5 cursor-pointer"
                        onClick={AddSkills}
                      />
                    </div>

                    <div className="flex flex-col  justify-center gap-4">
                      <div className="">
                        <Input
                          label="Add skills.."
                          name="skill"
                          onChange={handleSkill}
                        />
                        {skillErros.skill && (
                          <div className="text-sm text-orange-900">
                            {skillErros.skill}
                          </div>
                        )}
                      </div>
                      <div className="">
                        <span className="font-medium">Select your level</span>
                        <Tabs value={skillForm.level} className="w-full ">
                          <TabsHeader>
                            {TABS.map(({ label, value, color }) => (
                              <Tab
                                name="level"
                                onClick={() =>
                                  handleSkill({
                                    target: { name: "level", value },
                                  })
                                }
                                key={value}
                                value={value}
                                className={color}
                              >
                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                              </Tab>
                            ))}
                          </TabsHeader>
                        </Tabs>
                        {skillErros.level && (
                          <div className="text-sm text-orange-900">
                            {skillErros.level}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="w-full md:w-6/12 mx-2 h-60">
                <div className="bg-white p-2 shadow-sm rounded-sm">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Skills</span>
                  </div>

                  <div className="flex  text-gray-700 bg-blue-gray-100 rounded-xl m-2 ">
                    {data.exist.skills.slice(0, 3).map((value, index) => (
                      <div key={index} className="grid md:grid-cols-1  mx-2">
                        <div className="grid grid-cols-3">
                          <div className=" px-2 py-2 font-semibold text-sm w-72 uppercase">
                            <span> {value.skill}</span>
                          </div>
                        </div>
                        <div className="flex items-center m-1 ">
                          {value.level === "Beginner" && (
                            <Progress value={25} color="blue" />
                          )}
                          {value.level === "Intermediate" && (
                            <Progress value={50} color="yellow" />
                          )}
                          {value.level === "Advanced" && (
                            <Progress value={90} color="light-green" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                    <AllSkills SkillsData={{ data }} />
                  </button>
                </div>

                <div className="my-4"></div>

                <div className="bg-white p-2 shadow-sm rounded-sm">
                  <div className="grid  ">
                    <div>
                      <div className="flex justify-between items-center space-x-2 font-semibold text-gray-900 leading-8 ">
                        <span className="tracking-wide">Experience</span>
                        <EditExperience addData={{ data }} />
                      </div>
                      <div className="mb-2">
                        <Typography className="text-gray-600" variant="small">Totel ({data ? data.total:""} + year experience)</Typography>
                      </div>

                      <ul className="list-inside space-y-2 overflow-y-scroll max-h-48">
                        {data.exist.experience.map((value, index) => (
                          <li
                            key={value}
                            className="flex items-center justify-between border rounded-xl"
                          >
                            <div>
                              <div className="text-teal-600 text-sm m-1">
                                {value}
                              </div>
                            </div>
                            <EditExperience editdata={{ value, index }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="my-4"></div>

                {/* <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="grid grid-cols-2">
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Experience</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>

                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                              fill="#fff"
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Education</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">
                            Masters Degree in Oxford
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Bachelors Degreen in LPU
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[25rem]   ">
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <CardBody className="flex flex-col gap-1">
              <div className="flex justify-center items-center  ">
                <div className=" ">
                  <div className="mx-9 ">
                    <img
                      className="rounded-lg shadow-l border-2"
                      src={data.exist.userDp ? data.exist.userDp : userLogo}
                      style={{ width: "150px", height: "150px" }}
                      alt=""
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      className=" m-0 block  mt-2   cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] text-xs font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      id="formFileSm"
                      name="image"
                      type="file"
                      onChange={(event) => {
                        const selectedFieid = event.currentTarget.files[0];
                        setFieldValue("image", selectedFieid);
                        setSelectedImage(
                          URL.createObjectURL(event.target.files[0])
                        );
                      }}
                      accept="image/*"
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
              </div>

              {selectedImage && (
                <div className="flex justify-center items-center">
                  <div className="text-center">
                    <h3>Selected image</h3>
                    <img
                      src={selectedImage}
                      alt=""
                      className="rounded-md outline"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                </div>
              )}

              {errors.image && touched.image && (
                <div className="m-5 font-medium text-lg   text-red-800">
                  {errors.image}
                </div>
              )}
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" color="green" fullWidth>
                {loading === true ? (
                  <div className="flex justify-center gap-2">
                    <Spinner className="h-5 w-5" />
                    <span>Updating..</span>
                  </div>
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
      <Toaster />
    </>
  );
}

export default UserDetails;
