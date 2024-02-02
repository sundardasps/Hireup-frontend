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
  const [messages, setMessages] = useState([]);
  const [ownMessage, setownMessage] = useState(0);

  
  const currentUser = useSelector((state) => {
    return state.user.userId;
  });

  const socket = useRef();
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(currentUser);
        console.log(data,"llllllllllllllllllllllllllllllll");
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [currentUser]);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_SOCKET_BASE_URL, {
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
      socket.current.emit("send-message", sendMessage);
      setownMessage(1)
    }
  }, [sendMessage]);


  useEffect(() => {
    const handlerecievedMess = async (data) => {
      console.log("Received message:", data.msg);
      setMessages(data.msg);
      setownMessage(0)

    };

    socket.current.on("receive-message", handlerecievedMess);
  }, []); 

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== currentUser);
    const online = onlineUsers?.find((user) => user.userId === chatMembers);
    return online ? true : false;
  }; 
  return ( 
    
    <div  className="flex  justify-center  ">
     <div className="flex gap-1  w-[60rem]">
      <Card className="w-[20rem] p-3 h-screen shadow-md border bg-blue-500" >
        <div className="flex gap-3">
          <Input color="white" type="search" label="Search company" />
        </div>
        <div  className="pb-5 border-b-2">
        <div className="h-[17rem] scrollable  border-blue-gray-200">
          {chats&&chats.map((chat, index) => (
            <div key={index} onClick={() => setCurrentChat(chat)}>
              <UserConversation
                data={chat}
                currentUser={currentUser}
                online={checkOnlineStatus(chat)}
                messages={messages}
              />
            </div> 
          ))}
        </div>
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
          ownMessage={ownMessage === 1 &&true}
        />
      </Card>
    </div>
    </div>
  );
}

export default UserChat;
