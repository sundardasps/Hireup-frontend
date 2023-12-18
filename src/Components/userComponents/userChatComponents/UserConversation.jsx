import React, { useEffect, useState } from "react";
import { getSingleCompany } from "../../../Api/userApi";
import { Avatar, Typography } from "@material-tailwind/react";
import userLogo from '../../../../public/user.png'
export default function UserConversation({ data, currentUser }) {
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
    <>  
    <div className=" mt-2 hover:bg-blue-gray-100 rounded-sm w-[15rem] border-b cursor-pointer">
     <div className="flex gap-5">
     <Avatar src={userData?userData.image:userLogo} className=""/>
     <Typography className="flex flex-col mt-1">{userData?.companyName}<span className="text-xs">Online</span></Typography>
     </div>
     </div>
     <hr />
     </>

  )
}
