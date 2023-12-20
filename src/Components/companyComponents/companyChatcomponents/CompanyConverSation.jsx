import React, { useEffect, useState } from "react";
import { getSingleUser } from "../../../Api/companyApi";
import { Avatar, Typography } from "@material-tailwind/react";
import userLogo from "../../../../public/user.png";
export default function CompanyConverSation({ data, currentUser, online }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id != currentUser);
    const userData = async () => {
      try {
        const { data } = await getSingleUser(userId);
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
          <Avatar src={userData ? userData.userDp : userLogo} className="" />
          <Typography className="flex flex-col mt-1">
            {userData?.userName}
            <span className="text-xs ml-1">
              {online ? "Online" : "Offline"}
            </span>
          </Typography>
        </div>
      </div>
      <hr />
    </>
  );
}
