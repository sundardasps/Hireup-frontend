import {
  Button,
  Card,
  CardBody,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { useQuery ,useQueryClient} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  companyCreateChat,
  jobAppliedUsers,
  rejectUserApplication,
} from "../../../Api/companyApi";
import { useNavigate } from "react-router-dom";
import banner from "../../../../public/banner.webp";
import dp from "../../../../public/user.png";
import toast, { Toaster } from "react-hot-toast";
import { AppliedUserAction } from "../companyDialogs/AppliedUserAction";
import {
  ArrowRightCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

function AppliedUsersList() {
  const location = useLocation();
  const jobId = location.state._id;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [debounsedSearch, setDebouncedSearch] = useState("");
  const queryClient = useQueryClient()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => clearTimeout(timeoutId);
  });

  const { data, error } = useQuery({
    queryKey: [
      "companyAppliedUsers",
      { filter, search: debounsedSearch, jobId },
    ],
    queryFn: async () => {
      const response = await jobAppliedUsers({
        jobId,
        filter,
        search: debounsedSearch,
      }).then((res) => res.data);
      return response;
    },
  });

  const currentUser = useSelector((state) => {
    return state.company.id;
  });

  const TABS = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
  ];

  const handlerejectUser = async (userId) => {
    try {
      const response = await rejectUserApplication(userId, jobId);
      if (response.data.reject) {
        toast.success(response.data.message);
        queryClient.invalidateQueries('companyAppliedUsers')
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tapToChat = async (ids)=>{
    
    try {
      const response = await companyCreateChat(ids)
      if(response){
        navigate("/company/chat")
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="shadow-sm shadow-blue-gray-200 outline-1  rounded-xl   bg-white ">
      <div className="flex  text-start border-b shadow-sm bg-blue-500 rounded-t-lg  p-3 w-auto text-sm flex-col md:flex-row">
        <div className="flex w-1/3 m-2">
          <Typography
            variant="lead"
            color="white"
            className="text-base m-2   md:flex-row"
          >
            Position :
          </Typography>
          <span className="text-black font-bold border  p-2 rounded-xl border-white w-auto text-center">
            {data && data.jobTitle}
          </span>
        </div>
        <div className="w-full md:w-72 m-2">
          <Input
            label="Search title"
            value={search}
            autoFocus
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            color="white"
            icon={<MagnifyingGlassIcon className="h-5 w-5" color="white"/>}
          />
        </div>
        <Tabs value="all" className="w-full md:w-max m-2">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab onClick={() => setFilter(value)} key={value} value={value}>
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>
      <CardBody className=" grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-[26rem] overflow-x-scroll ">
        {data &&
          data.usersData.map((value, index) => (
            <Card
              key={index}
              className=" max-w-[14rem] mx-auto h-min rounded-lg overflow-hidden shadow bg-white   hover:shadow-xl cursor-pointer border "
            >
              <div className="relative border-b-2">
                {/* Background Image */}
                <img
                  src={value.userCoverDp ? value.userCoverDp : banner}
                  alt="Background"
                  className="w-[15rem] h-28 object-fil"
                />
                {/* Profile Image */}
                <img
                  onClick={() =>
                    navigate(`/company/userProfile`, { state: value._id })
                  }
                  src={value.userDp ? value.userDp : dp}
                  alt="Profile"
                  className="rounded-full border-4 border-white absolute -bottom-10 left-14  w-28 h-28 outline-double  object-fill"
                />
              </div>
              <CardBody>
                <div className="my-5 flex items-center justify-center">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="font-medium"
                  >
                    {data ? value.userName : ""}
                  </Typography>
                </div>
                <Typography
                  color="gray"
                  className="text-center uppercase text-xs mb-5 w-auto"
                >
                  {data ? value.userTitle : ""}
                </Typography>
                <Button
                  className="bg-blue-600 rounded-3xl w-36 mx-3"
                  size="sm"
                  variant="outlined"
                  color="white"
                  onClick={()=>tapToChat({companyId:currentUser,userId:value._id})}
                >
                  Message
                </Button>
                <div className="flex justify-center gap-2 ">
                  {filter != "rejected" && (
                    <>
                      <Button
                        variant="text"
                        color="red"
                        className="rounded-3xl font-normal  text-sm "
                        onClick={() => handlerejectUser(value._id)}
                      >
                        Reject
                      </Button>
                      
                      <AppliedUserAction data={{ value, jobId }} />
                    </>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
      </CardBody>
      <div className="flex  justify-end   text-start   p-3 w-auto border-t">
        <ArrowLeftCircleIcon className="w-10 h-10 cursor-pointer" />
        <ArrowRightCircleIcon className="w-10 h-10 cursor-pointer" />
      </div>
      <Toaster />
    </div>
  );
}

export default AppliedUsersList;
