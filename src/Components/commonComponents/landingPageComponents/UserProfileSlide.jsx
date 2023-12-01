import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";


function UserProfileSlide() {
  const [avatars, setAvatars] = useState([]);
  const avatarImages = [
    "/public/6876640.jpg",
    "/public/company.jpeg",
    "/public/hiring register.jpg",
    "/public/6876640.jpg",
    "/public/company.jpeg",
    "/public/hiring register.jpg",
  ];

  const numVisibleAvatars = 5;

 

  useEffect(() => {



    // Initialize the avatars array with initial images in a seamless loop
      const createAvatarLoop = () => {
      const loopedAvatars = [...avatarImages, ...avatarImages];
      setAvatars(loopedAvatars);
    };

    // Rotate the avatars every 5 seconds (adjust as needed)
    const interval = setInterval(createAvatarLoop, 10000 * numVisibleAvatars);

    createAvatarLoop();
    return () => clearInterval(interval);
  },[avatarImages, numVisibleAvatars]);

  return (
    <div className="w-screen avatar-flow-container ">
      <div className="avatar-flow ">
        {avatars.map((src, index) => (
          <Avatar
            key={index}
            size="xxl"
            alt="avatar"
            src={src}
            className=" mx-10 my-5 shadow-xxl ring-1"
          />
        ))}
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
    </div>
  );
}

export default UserProfileSlide;
