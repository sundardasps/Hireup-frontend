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
import { useQuery } from '@tanstack/react-query'
import userLogo from "../../../../public/user.png";
import banner from "../../../../public/banner.webp";
import { useLocation } from 'react-router-dom'
import { companyUserProfile } from '../../../Api/companyApi'
import { Toaster } from "react-hot-toast";

function UserFullDetails() {
    const location = useLocation()
    const userId = location.state
 

    const {data} = useQuery({
        queryKey:["companyUserProfile"],
        queryFn : async () =>{
            const response = await companyUserProfile(userId).then((res)=>res.data)
            return response
        }
    })
   
  
 
  return (
 
    <>
    <div className="flex justify-center">
      <div className=" overflow-auto no-scrollbar">
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-6/12 md:mx-2  ">
              <div className=" bg-white p-2  shadow-sm  rounded-lg shadow-blue-gray-200">
                <div className=" relative mb-20">
                  {/* Background Image */}
                  <div className="bgimage relative">
                    <img
                      src={ data && data.userData.userCoverDp ? data.userData.userCoverDp: banner}
                      className="inline-block w-full h-48 border-2 border-white rounded-md object-cover object-center"
                      alt="Background"
                    />
                    <div className="absolute bottom-4 right-5  rounded-lg cursor-pointer">
                    </div>
                  </div>
                  {/* Profile Image */}
                  <div className=" absolute bottom-[-50%] left-24 transform -translate-x-1/2 mb-5">
                      <img
                        src={data && data.userData.userCoverDp ? data.userData.userDp : userLogo}
                        className="relative inline-block h-40 w-40 rounded-full outline-double object-cover object-center cursor-pointer"
                        alt="Profile"
                      />
                 </div>
                </div>
                <div className="ml-5">
                <h1 className="text-gray-900 font-medium text-2xl leading-8 my-1 uppercase">
                  {data ? data.userData.userName : ""}
                </h1>
                <div>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6 cursor-pointer hover:text-light-blue-500">
                    {data ? data.userData.userTitle : ""}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6 cursor-pointer ">
                  {data ? data.userData.place : ""}
                </p>
                </div>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Email</span>
                    <span className="ml-auto">
                      {data ? data.userData.email : ""}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Phone</span>
                    <span className="ml-auto">
                      {data ? data.userData.number : ""}
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
                </div>
              </div>

              <div className="my-4"></div>
            </div>

            <div className="w-full md:w-6/12 md:mx-2">
              <div className="bg-white p-2 shadow-sm  rounded-lg shadow-blue-gray-200">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8  w-[50rem]">
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

                <div className="flex flex-col text-gray-700 bg-blue-gray-100 shadow-sm m-2 rounded-lg shadow-blue-gray-400">
                  {data && data.userData.skills.map((value, index) => (
                    <div key={index} className="grid md:grid-cols-1  m-2 ">
                         <div className="grid grid-cols-3">
                          <div className=" px-2 py-2  font-semibold text-xs w-72 uppercase">
                          <span >{value.skill}</span>
                          </div>
                         </div>

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

                  ))}
                </div>

             
              </div>

              <div className="my-4"></div>

              <div className="bg-white p-2 shadow-sm rounded-lg shadow-blue-gray-200">
                <div className="grid  ">
                  <div>
                    <div className="flex justify-between items-center space-x-2 font-semibold text-gray-900 leading-8 ">
                      <span className="tracking-wide">Experience</span>
                    </div>
                    <div className="mb-2">
                      {/* <Typography className="text-gray-600" variant="small">Totel ({ data.total > 0 ?  data.total :"0"}  year experience)</Typography> */}
                    </div>

                    <ul className="list-inside space-y-2 overflow-y-scroll max-h-48">
                      {data && data.userData.experience.map((value, index) => (
                        <li
                          key={value}
                          className="flex items-center justify-between border rounded-xl"
                        >
                          <div>
                            <div className="text-teal-600 text-lg m-1">
                              {value}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="my-4"></div>
              

              
              <div className="bg-white p-2 shadow-sm rounded-lg shadow-blue-gray-200">
                <div className="grid  ">
                  <div>
                    <div className="flex justify-between items-center space-x-2 font-semibold text-gray-900 leading-8 ">
                      <span className="tracking-wide">Education</span>
                    </div>
                 

                    <ul className="list-inside space-y-2 overflow-y-scroll max-h-48">
                      {data && data.userData.education.map((value, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between border p-2 rounded-xl"
                        >
                          <div>
                            <div className="text-Black-600 text-lg ">
                              {value.universityName}
                            </div>
                            <div className="text-teal-600 text-base ">
                              {value.courseName}
                            </div>
                            <div className="text-blue-gray-300 text-sm ">
                              {value.courseStarted} - {value.courseEnded}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toaster />
  </>
  )
}

export default UserFullDetails