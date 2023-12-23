import React, { useEffect, useState } from "react";
import { getSingleCompany } from "../../../Api/userApi";
import { Avatar, Typography } from "@material-tailwind/react";
import userLogo from "../../../../public/user.png";
export default function UserConversation({
  data,
  currentUser,
  online,
  lastChat,
  messages,
}) {
  const [userData, setUserData] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const [lastApiMessage, setLastApiMessage] = useState("");

  useEffect(() => {
    const companyId = data.members.find((id) => id != currentUser);
    const userData = async () => {
      try {
        const { data } = await getSingleCompany(companyId);
        setUserData(data.companyData);
        setLastApiMessage(data?.chat?.last_Message);
        // Check if messages prop is available and has at least one message
        if (
          messages &&
          messages.length > 0 &&
          messages[messages.length - 1].senderId === userData?._id
        ) {
          // Use the last message from the prop
          setLastMessage(messages[messages.length - 1].text);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, [data, currentUser, messages]);

  return (
    <div className="mt-2 bg-white rounded-lg shadow-lg cursor-pointer p-0.5 relative">
      <div className="flex gap-5">
        {/* Avatar with green dot */}
        <div className="relative">
          <Avatar src={userData ? userData.image : userLogo} className="" />
          {online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 animate-bounce border-white"></div>
          )}
        </div>
        {/* User information */}
        <Typography className="flex flex-col mt-1 text-black font-light text-sm capitalize ">
          <span>{userData?.companyName.substring(0,15)}</span>
          <div className="text-xs w-[6rem] mt-1 text-blue-gray-400">
            {(lastMessage && lastMessage.substring(0, 3)) ||
              lastApiMessage?.substring(0, 15)}
            ..
          </div>
        </Typography>
      </div>
    </div>
  );
}
