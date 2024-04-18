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
  const [mobileUx, setMobileUx] = useState(false);

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
      setownMessage(1);
    }
  }, [sendMessage]);

  useEffect(() => {
    const handlerecievedMess = async (data) => {
      console.log("Received message:", data.msg);
      setMessages(data.msg);
      setownMessage(0);
    };

    socket.current.on("receive-message", handlerecievedMess);
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat.members.find((member) => member !== currentUser);
    const online = onlineUsers?.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };
  return (

      <div className="flex gap-1 mt-3 ">
        <Card className={`md:w-[20rem] w-screen p-3  h-screen md:h-auto  shadow-md border bg-blue-500 ${ !mobileUx  ? 'sm:block':'hidden' }   md:block `}>
       
            <div className=" scrollable  border-blue-gray-200">
              {chats &&
                chats.map((chat, index) => (
                  <div key={index} onClick={() => {setCurrentChat(chat), setMobileUx(true)}}>
                    <UserConversation
                      data={chat}
                      currentUser={currentUser}
                      online={checkOnlineStatus(chat)}
                      messages={messages}
                    />
                  </div>
                ))}
            </div>
      
        </Card>

        <Card className={` w-full ${mobileUx  ? 'sm:block ':'hidden' } md:block`}>
          <ChatBox
            chat={currentChat}
            currentUser={currentUser}
            setSendMessage={setSendMessage}
            messages={messages}
            setMessages={setMessages}
            ownMessage={ownMessage === 1 && true}
            setMobileUx={setMobileUx}
          />
        </Card>
      </div>

  );
}

export default UserChat;
