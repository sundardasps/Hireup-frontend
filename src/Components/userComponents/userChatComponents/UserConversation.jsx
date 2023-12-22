import React, { useEffect, useState } from "react";
import { getSingleCompany } from "../../../Api/userApi";
import { Avatar, Typography } from "@material-tailwind/react";
import userLogo from '../../../../public/user.png'
export default function UserConversation({ data, currentUser ,online,lastChat}) {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const companyId = data.members.find((id) => id != currentUser);
    const userData = async () => {
      try {
        const { data } = await getSingleCompany(companyId);
        setUserData(data);
      } catch (error) {
        console.log(error); 
      } 
    };
    userData();
  }, []);
 
  return (

    <div className=" mt-2 bg-white  rounded-lg shadow-lg cursor-pointer p-1">
     <div className="flex gap-5">
     <Avatar src={userData?userData.image:userLogo} className=""/>
     <Typography className="flex flex-col mt-1 text-black font-medium">{userData?.companyName}<span className="text-xs ml-1 text-blue-gray-500">{online?"Online":"Offline"}</span></Typography>
     </div>
     </div>


  )
}
