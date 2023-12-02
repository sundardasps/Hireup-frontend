import { Avatar, Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getCompanies } from "../../../Api/userApi";
import toast from "react-hot-toast";
import {
  BuildingOffice2Icon,
} from "@heroicons/react/24/solid";

function UserProfileSlide() {
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const handleLoading = () => setLoading((curr) => !curr);


  const numVisibleAvatars = 5;

  const createAvatarLoop = () => {};

  useEffect(() => {
    const getAllCompanies = async () => {
      handleLoading();
      const response = await getCompanies();
      if (response.data.fetched) {
        handleLoading();

        const loopedAvatars = [
          ...response.data.companyData,
          ...response.data.companyData,
        ];
        setAvatars(loopedAvatars);
      } else {
        toast.error(response.data.message);
      }
    };
    getAllCompanies();
    createAvatarLoop();
    const interval = setInterval(createAvatarLoop, 5000 * numVisibleAvatars);
    return () => clearInterval(interval);
  },[]);

  return (
    <>
      <div className="flex lg:mx-10 lg:mt-16 lg:m-10">
        <div className="border  border-blue-600 p-5 hidden lg:block rounded-tr-3xl rounded-bl-3xl ">
          <Typography variant="h1" className="font-sans">
            Our <br /> Hiring comapanies...
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
                    src={data.image}
                    style={{ width: "60px", height: "50px" }}
                    className="rounded-sm shadow"
                  />
                </div>
                <div className="  justify-center m-5">
                  <div className="flex justify-center  gap-1">
                    <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                    <Typography className="text-sm text-center">
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

 

  <div className=" text-center m-auto p-5 w-3/4">
    <Typography variant="h4" color="blue-gray" className="mb-6 font-medium">
      &quot;This is an excellent product, the documentation is excellent and helped me get things done more efficiently.&quot;
    </Typography>
    <Avatar
      src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
      alt="image"
      size="lg"
    />
    <Typography variant="h6" className="mt-4">
      Tania Andrew
    </Typography>
    <Typography color="gray" className="mb-4 font-normal">
      Lead Frontend Developer
    </Typography>
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
