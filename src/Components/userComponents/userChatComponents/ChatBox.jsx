import React, { useEffect, useState } from "react";
import { getMessages, getSingleCompany } from "../../../Api/userApi";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import userLogo from "../../../../public/user.png";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
function ChatBox({ chat, currentUser }) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const handleMessage = (newMessage) => {
    setNewMessage(newMessage);
  };
  useEffect(() => {
    const companyId = chat?.members?.find((id) => id != currentUser);
    const userData = async () => {
      try {
        const { data } = await getSingleCompany(companyId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat != null) {
      userData();
    }
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat != null) fetchMessages();
  }, [chat, messages]);

  return (
    <>
      {chat != null ? <>
        <div className="chat">
        <div className="p-1    rounded-sm">
          <div className="flex gap-5">
            <Avatar src={userData ? userData.image : userLogo} className="" />
            <Typography className="flex flex-col mt-1">
              {userData?.companyName}
            </Typography>
          </div>
        </div>
        <hr />
      </div>

      <div className="h-screen">
        {messages.map((message) => (
          <>
            <div
              className={
                message.senderId === currentUser
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <span>{message.text}</span>
              <span>{format(message.createdAt)}</span>
            </div>
          </>
        ))}
      </div>

      <div className="flex m-5">
        <div>+</div>
        <InputEmoji value={newMessage} onChange={handleMessage} />
        <div className="m-1">
          <Button>send</Button>
        </div>
      </div></>
      : <span className="text-center mt-10">Tap to start.........</span>
      }
    </>
  );
}

export default ChatBox;
