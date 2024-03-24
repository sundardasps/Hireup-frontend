import { Avatar, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getCompanies } from "../../../Api/userApi";
import toast from "react-hot-toast";
import companyImgDefault from "../../../../public/default.jpeg";

import {
  BriefcaseIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import JobsScroll from "./JobsScroll";

function UserProfileSlide() {
  const [avatars, setAvatars] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getAllCompanies = async () => {
      const response = await getCompanies();
      if (response.data.fetched) {
        setDetails(response.data);
        const loopedAvatars = [...response.data.companyData];
        setAvatars(loopedAvatars);
      } else {
        toast.error(response.data.message);
      }
    };
    getAllCompanies();
  }, []);

  return (
    <>
      <div className="flex  lg:mx-10 lg:mt-12 lg:m-10 md:border-r-2  border-r-indigo-600 ">
        <div className="border  border-blue-600 p-5 hidden lg:block rounded-tr-3xl rounded-bl-3xl bg-indigo-600">
          <Typography variant="h1" color="white" className="font-sans">
            Featured <br /> companies...
          </Typography>
        </div>

        <div className="w-screen avatar-flow-container h-48 ">
          <div className="avatar-flow gap-10 m-2">
            {avatars.map((data, index) => (
              <Card
                key={index}
                className="justify-center container my-5 w-36 h-40 shadow-lg  bg-white rounded-md hover:shadow-xl border border-solid border-gray-300"
              >
                <div className="flex justify-center">
                  <img
                    src={data.image?data.image:companyImgDefault}
                    style={{ width: "60px", height: "50px" }}
                    className="rounded-sm shadow"
                  />
                </div>
                <div className=" m-5 flex-col ">
                  <div className="flex justify-center   gap-1 ">
                    <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                    <Typography className="text-xs  text-center">
                      {data.companyName}
                    </Typography>
                  </div>
                  <Typography className="mt-2 text-center text-xs">
                    {data.location}
                  </Typography>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .avatar-flow-container {
            display: flex;
            overflow: hidden;
            width: 100%;
          }

          .avatar-flow {
            display: flex;
            animation: avatar-flow-animation 20s linear infinite;
            white-space: nowrap;
          }

          @keyframes avatar-flow-animation {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </>
  );
}

export default UserProfileSlide;
