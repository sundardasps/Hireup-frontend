import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tab,
  Tabs,
  TabsHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { cancelInterview, scheduleInterviewList } from "../../../Api/companyApi";
import userLogo from "../../../../public/user.png";
import RescheduleInterview from "../companyDialogs/RescheduleInterview";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export default function InterviewsList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [debounsedSearch, setDebouncedSearch] = useState("");
  const queryClient = useQueryClient()
  const TABS = [
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Expired",
      value: "Expired",
    },
  ];

  const { data } = useQuery({
    queryKey: ["interviewList"],
    queryFn: async () => {
      const response = await scheduleInterviewList();
      return response;
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });


  const handleCancelInterview =async (id) =>{
     try {
       const response = await cancelInterview(id)
       if(response.data.canceled){
        toast.success(response.data.message)
          queryClient.invalidateQueries("interviewList")
       }
     } catch (error) {
      console.log(error);
     }
  }
  

  return (
    <>
      <Card className="h-screen w-full shadow border  my-5">
        <div className="flex    gap-4 md:flex-row bg-blue-500 p-3 rounded-t-lg">
        <div className="w-full md:w-72">
          <Input
            label="Search title"
            value={search}
            color="white"
            autoFocus
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            icon={<MagnifyingGlassIcon className="h-5 w-5" color="white" />}
          />
        </div>
      </div>
        <CardBody className="overflow-y-scroll  h-full">
          <div className="mt-2 overflow-hidden">
            <ul className=" -ml-2 flex flex-col gap-4 items-center">
              {data &&
                data.data.list.map((value, index) => (
                  <MenuItem
                    key={index}
                    className="flex shadow-md border sm:w-full lg:w-[44rem] h-[9rem] text-black rounded-md p-4 "
                  >
                    <div className="flex flex-col sm:flex-row justify-between mx-3">
                      <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                        <Avatar
                          src={value.userDp ? value.userDp : userLogo}
                          alt="Applicant Avatar"
                          className="w-12 h-12 rounded-full object-cover mr-3"
                        />
                        <div className="text-sm border-r-2 p-1 ">
                          <div>
                            Applicant:{" "}
                            <span className="font-bold">{value.userName}</span>{" "}
                          </div>
                          <div>{value.userTitle}</div>
                          <div>Email: {value.userEmail}</div>
                          <div>Number: {value.userNumber}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between ">
                      <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                        <div className="text-sm">
                          <div>Interviewer: {value.interviewer}</div>
                          <div>Date: {value.date}</div>
                          <div>Type: {value.type}</div>
                          {/* Assuming there is a type field */}
                        </div>
                      </div>
                      <div className="flex flex-col mt-2 sm:mt-0">
                        <div className="text-sm border w-[10rem] h-[4rem] rounded-md p-2">
                          <span className="font-bold">Requirements:</span>{" "}
                          {value.requirements}
                        </div>
                      </div>
                    </div>
                    <Menu>
                      <MenuHandler>
                        <EllipsisVerticalIcon className="w-10 h-8 "  />
                      </MenuHandler>
                      <MenuList>
                        <RescheduleInterview details={{value}}/>
                        <MenuItem onClick={()=>handleCancelInterview(value._id)}>Cancel</MenuItem>
                      </MenuList>
                    </Menu>
                  </MenuItem>
                ))}
            </ul>
          </div>
        </CardBody>
      </Card>
      <Toaster/>
    </>
  );
}
