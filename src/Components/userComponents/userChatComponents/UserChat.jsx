import { Card, Input } from '@material-tailwind/react'
import React, { useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import { userChats } from '../../../Api/userApi'
import UserConversation from './UserConversation'
import ChatBox from './ChatBox'

function UserChat() {
  const [chats,setChats] = useState([])
  const [currentChat,setCurrentChat] = useState(null)

  const currentUser = useSelector((state)=> {return state.user.userId})
  useEffect(()=>{
   const getChats  = async ()=>{
     try {
        const {data} = await userChats()
        setChats(data)
     } catch (error) {
        console.log(error);
     }
   }

   getChats()

    },[])

  return (
    <div className='flex gap-1 '>
        <Card className='w-min p-3 h-screen shadow-md border'>
         <div className='flex gap-3'>
          <Input type='search' label='Search company'/>
          </div>
          <div className=''>
            {chats.map((chat,index)=>(
              <div key={index} onClick={()=>setCurrentChat(chat)}>
                    <UserConversation data={chat} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </Card>


        <Card className='h-screen border w-full '>
          <div>

          </div>
           <ChatBox chat={currentChat} currentUser={currentUser}/>
        </Card>
    </div>
  )
}

export default UserChat