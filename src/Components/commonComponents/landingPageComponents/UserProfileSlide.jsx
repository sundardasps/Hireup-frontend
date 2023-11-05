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
    </div>
  );
}

export default UserProfileSlide;
