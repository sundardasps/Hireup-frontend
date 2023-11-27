import { Avatar } from "@material-tailwind/react";
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

  // Create a seamless loop of avatars
  const createAvatarLoop = () => {
    const loopedAvatars = [...avatarImages, ...avatarImages];
    setAvatars(loopedAvatars);
  };

  useEffect(() => {
    // Initialize the avatars array with initial images in a seamless loop
    createAvatarLoop();

    // Rotate the avatars every 5 seconds (adjust as needed)
    const interval = setInterval(createAvatarLoop, 5000 * numVisibleAvatars);

    return () => clearInterval(interval);
  }, [avatarImages, numVisibleAvatars]);

  return (
    <div className="avatar-flow-container">
      <div className="avatar-flow">
        {avatars.map((src, index) => (
          <Avatar
            key={index}
            size="xxl"
            
            alt="avatar"
            src={src}
            className="border border-green-500 mx-10 shadow-xxl ring-1"
          />
        ))}
      </div>
      <style>
        {`
          .avatar-flow-container {
            display: flex;
            overflow: hidden;
            width: 100%; /* Ensure the avatars don't overflow the container */
          }

          .avatar-flow {
            display: flex;
            animation: avatar-flow-animation 20s linear infinite; /* Adjust animation duration */
            white-space: nowrap; /* Prevent avatars from wrapping to the next line */
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
{/* 
      <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Kojstantin
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        James
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Natie
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Casey
                      </a>
                    </div>
                  </div> */}
    </div>
  );
}

export default UserProfileSlide;
