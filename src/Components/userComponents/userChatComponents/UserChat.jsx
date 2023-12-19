import { Card, Input } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../../Api/userApi";
import UserConversation from "./UserConversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
function UserChat() {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [RecieveMessage, setRecieveMessage] = useState(null);
  const currentUser = useSelector((state) => {
    return state.user.userId;
  });
  const socket = useRef();

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(currentUser);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [currentUser]);

  useEffect(() => {
    socket.current = io("http://localhost:5000/user");
    socket.current.emit("new-user-add", currentUser);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  // send message to the socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message",sendMessage);
    }
  }, [sendMessage]);

  // recive message from the socket server
  useEffect(() => {
    // Listen for incoming messages from the server
    socket.current.on("receive-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== currentUser);
    const online = onlineUsers?.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };
  return (
    <div className="flex gap-1 ">
      <Card className="w-min p-3 h-screen shadow-md border">
        <div className="flex gap-3">
          <Input type="search" label="Search company" />
        </div>
        <div className="">
          {chats.map((chat, index) => (
            <div key={index} onClick={() => setCurrentChat(chat)}>
              <UserConversation
                data={chat}
                currentUser={currentUser}
                online={checkOnlineStatus(chat)}
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
          RecieveMessage={RecieveMessage}
        />
      </Card>
    </div>
  );
}

export default UserChat;
