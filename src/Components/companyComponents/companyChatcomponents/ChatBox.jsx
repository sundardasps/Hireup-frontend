import React, { useEffect, useRef, useState } from "react";
import {
  companyAddMessage,
  companyGetMessages,
  getSingleUser,
} from "../../../Api/companyApi";
import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import userLogo from "../../../../public/user.png";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { PaperAirplaneIcon, PlusIcon } from "@heroicons/react/24/solid";

function ChatBox({ chat, currentUser, setSendMessage, messages, setMessages }) {
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();
  const handleMessage = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const userData = async () => {
      try {
        const { data } = await getSingleUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) {
      userData();
    }
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await companyGetMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat != null) fetchMessages();
  }, [chat]);

  //always scroll to the lastmessage
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if(newMessage.trim()===""){
      return
    }
    const message = {
      chatId: chat._id,
      senderId: currentUser,
      text: newMessage,
    };
    //sending message to socket server
    const recieverId = chat.members.find((id) => id !== currentUser);
    // setSendMessage({ ...messages, recieverId });
    // send message to database
    // send message to database
    try {
      const { data } = await companyAddMessage(message);
      const msg = [...messages, data];
      setMessages(msg);
      setSendMessage({ msg, recieverId });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (messages !== null && messages.chatId === chat?._id) {
      setMessages([...messages, messages]);
    }
  }, [messages]);

  return (
    <>
      {chat != null ? (
        <>
          <div className="chat">
            <div className="p-1    rounded-sm">
              <div className="flex gap-5">
                <Avatar
                  src={userData ? userData.userDp : userLogo}
                  className=""
                />
                <Typography className="flex flex-col mt-1">
                  {userData?.userName}
                </Typography>
              </div>
            </div>
            <hr />
          </div>

          <div className="h-screen scrollable">
            {messages.map((message, i) => (
              <>
                <div
                  ref={scroll}
                  key={i}
                  className={
                    message.senderId === currentUser
                      ? "flex justify-end "
                      : "flex justify-start"
                  }
                >
                  <Card className="grid p-2 m-5 rounded-md bg-light-blue-400 text-white text-xl  max-w-xs  rounded-tr-none rounded-br-md shadow-sm border">
                    <span>{message.text}</span>
                    <span className="font-extralight text-xs text-blue-gray-900">
                      {format(message.createdAt)}
                    </span>
                  </Card>
                </div>
              </>
            ))}
          </div>

          <div className="flex p-3 h-[5rem] rounded-b-md " style={{backgroundColor:"#687864"}}>
            <div className="p-2 rounded-lg m-2  " style={{backgroundColor:"white",color:"#687864"}}>
              <PlusIcon className="w-5 h-5"/>
            </div>
            <InputEmoji value={newMessage} onChange={handleMessage} />
            <div className="py-2">
            {newMessage && <PaperAirplaneIcon color="white" className="w-10 h-10" onClick={handleSend}  />}
            </div>
          </div>
        </>
      ) : (
        <span className="text-center mt-10">Tap to start.........</span>
      )}
    </>
  );
}

export default ChatBox;
