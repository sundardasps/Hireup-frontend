import { Card, Input } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { companyChats } from "../../../Api/companyApi";
import CompanyConversations from "./CompanyConverSation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
function CompanyChat() {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const currentUser = useSelector((state) => {
    return state.company.id;
  });
  const socket = useRef();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await companyChats(currentUser);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [currentUser]);

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      withCredentials: true,
    });
    socket.current.emit("new-user-add", currentUser);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  // send message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      console.log("Sending message:", sendMessage);
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // recive message from the socket server
  useEffect(() => {
    const handlerecievedMess = async (data) => {
      setMessages(data.msg);
    };
    socket.current.on("receive-message", handlerecievedMess);
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== currentUser);
    const online = onlineUsers?.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };
  return (
    <div className="flex  justify-center mt-5">
      <div className="flex gap-1  w-[70rem]">
        <Card className="w-min p-3 h-screen shadow-md border bg-blue-500">
          <div className="flex gap-3">
            <Input color="white" type="search" label="Search company" />
          </div>
          <div className="h-[17rem] scrollable border-b-2 border-blue-gray-200  ">
            {chats.map((chat, index) => (
              <div key={index} onClick={() => setCurrentChat(chat)}>
                <CompanyConversations
                  data={chat}
                  currentUser={currentUser}
                  online={checkOnlineStatus(chat)}
                  messages={messages}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="h-screen border w-full ">
          <div></div>
          <ChatBox
            chat={currentChat}
            currentUser={currentUser}
            setSendMessage={setSendMessage}
            messages={messages}
            setMessages={setMessages}
          />
        </Card>
      </div>
    </div>
  );
}

export default CompanyChat;
