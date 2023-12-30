import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HireupLogo from "../../../../public/logo.png";
import {
  addMessage,
  getMessages,
  getSingleCompany,
} from "../../../Api/userApi";
import { Avatar, Button, Card, Typography } from "@material-tailwind/react";
import userLogo from "../../../../public/user.png";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import chatImage from "../../../../public/chat_image.png";
import toast from "react-hot-toast";

function ChatBox({
  chat,
  currentUser,
  setSendMessage,
  messages,
  setMessages,
  ownMessage,
}) {
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const currentUserDetails = useSelector((state) => {
    return state.user;
  });

  const scroll = useRef();
  const handleMessage = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const companyId = chat?.members?.find((id) => id !== currentUser);
    const userData = async () => {
      try {
        const { data } = await getSingleCompany(companyId);
        setUserData(data.companyData);
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
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat != null) fetchMessages();
  }, [chat]);

  function isURL(text) {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(text);
  }

  //always scroll to the lastmessage
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") {
      return;
    }
    //sending message to socket server
    const recieverId = chat.members.find((id) => id !== currentUser);
    const message = {
      chatId: chat._id,
      senderId: currentUser,
      text: newMessage,
      recieverId,
    };

    // send message to database
    try {
      const { data } = await addMessage(message);
      const msg = [...messages, data];
      setMessages(msg);
      setSendMessage({ msg, recieverId });
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (messages !== null && messages?.chatId === chat?._id) {
      setMessages([...messages, messages]);
    }
  }, []);

  const validateVideoChat = (sendedId) => {
    const id = sendedId.includes(currentUser);
    if (id) {
      navigate(`/user/room/${currentUser}`);
    } else {
      toast.error("Invalid chat link!");
    }
  };

  return (
    <>
      {chat != null ? (
        <>
          <div className="chat shadow-md bg-blue-500 rounded-t-lg">
            <div className="p-1 rounded-sm">
              <div className="flex gap-2">
                <Avatar
                  src={userData ? userData.image : userLogo}
                  className="m-1"
                />
                <Typography
                  color="white"
                  className="flex flex-col mt-4 text-base  capitalize"
                >
                  {userData?.companyName}
                </Typography>
              </div>
            </div>
            <hr />
          </div>

          <div className="h-screen scrollable ">
            {messages?.map((message, i) => (
              <>
                <div
                  key={i}
                  className={
                    message.senderId === currentUser
                      ? "flex justify-end "
                      : "flex justify-start"
                  }
                >
                  <div className="mb-5">
                    <span
                      className={
                        message.senderId === currentUser
                          ? "text-center text-xs "
                          : "ml-7 text-center text-xs"
                      }
                    >
                      {new Date(message.createdAt).toLocaleTimeString("en-US", {
                        timeStyle: "short",
                      })}
                    </span>
                    <Card
                      ref={scroll}
                      className={`grid p-2  rounded-md text-sm  max-w-[36rem] h-auto ${
                        message.senderId === currentUser
                          ? " rounded-br-none rounded-tr-xl  bg-blue-500 text-white shadow-gray-200 mr-5"
                          : "rounded-bl-none rounded-tl-xl  bg-blue-gray-50 text-black shadow-gray-200 ml-5"
                      } shadow-blue-gray-300  shadow-sm `}
                    >
                      {isURL(message.text) ? (
                        <span className="text-blue-300 cursor-pointer hover:text-green-500">
                          <div className="flex border bg-blue-gray-500 rounded-md">
                            <img
                              src={userData ? userData.image : userLogo}
                              className="w-14 h-14 rounded-l-md  bg-blue-gray-100"
                              alt="logo"
                            />
                            <div className="pl-1">
                              <Typography variant="paragraph" color="white">
                                HirupChat
                              </Typography>
                              <Typography color="white" className="text-[0.8em]">
                                Realtime chat by hireup,hosting by{" "}
                                {userData?.companyName}
                              </Typography>
                            </div>
                          </div>
                          <span className="text-black ">
                            Please click the link to join
                          </span>
                          <br />
                          <span
                            className="underline"
                            onClick={() =>
                              // navigate(`/user/room/${currentUser}`)
                              validateVideoChat(message.text)
                            }
                          >
                            {message.text}
                          </span>
                        </span>
                      ) : (
                        <span>{message.text}</span>
                      )}
                      <span className="font-extralight text-xs text-blue-gray-900">
                        {format(message.createdAt)}
                      </span>
                    </Card>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="flex p-3 h-[4rem] rounded-b-md ">
            <InputEmoji value={newMessage} onChange={handleMessage} />
            <div className="p-2 rounded-lg   ">
              <PaperClipIcon className="w-6 h-6 cursor-pointer" color="black" />
            </div>
            <div className="py-1 mr-4">
              {newMessage && (
                <PaperAirplaneIcon
                  color="black"
                  className="w-8 h-8 cursor-pointer"
                  onClick={handleSend}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col bg-blue-gray-50 object-cover h-screen  items-center rounded-xl justify-center ">
          <img src={chatImage} alt="" className="w-36 h-36 object-cover " />
          <span className="text-center ml-4  text-lg font-normal text-blue-gray-500">
            Tap to start...
          </span>
        </div>
      )}
    </>
  );
}

export default ChatBox;
