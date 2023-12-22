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
  const [lastApiMessage,setLastApiMessage] = useState("")
  

  useEffect(() => {
    const companyId = data.members.find((id) => id != currentUser);
    const userData = async () => {
      try {
        const { data } = await getSingleCompany(companyId);
        setUserData(data.companyData);
        setLastApiMessage(data?.chat?.last_Message)
        // Check if messages prop is available and has at least one message
        if (messages && messages.length > 0) {
          // Use the last message from the prop
          setLastMessage(messages[messages.length - 1].text);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, [data, currentUser, messages,]);

 
    
  

  return (
    <div className=" mt-2 bg-white  rounded-lg shadow-lg cursor-pointer p-1">
      <div className="flex gap-5">
        <Avatar src={userData ? userData.image : userLogo} className="" />
        <Typography className="flex flex-col mt-1 text-black font-medium ">
          {userData?.companyName}
          <span className="flex text-xs ml-1 text-blue-gray-500 ">
            <div className="text-sm w-[4rem]">
              {lastMessage?lastMessage.substring(0,3):lastApiMessage}...
            </div>
            {online ? "Online" : "Offline"}
          </span>{" "}
        </Typography>
      </div>
    </div>
  );
}
