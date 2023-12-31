import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Card,
  CardFooter,
  Input,
  List,
  ListItem,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import {
  BuildingOffice2Icon,
  CursorArrowRippleIcon,
} from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import {
  categoryDataForUser,
  getAllJobs,
  saveJobs,
} from "../../../Api/userApi";
import InfiniteScrollComponent from "react-infinite-scroll-component";

import { CheckCircleIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { JobFullDetails } from "./JobFullDetails";
import React, { useEffect, useRef, useState } from "react";
import {
  BookmarkSlashIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import MainLoading from "../../commonComponents/Loadings/MainLoding";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultDp from "../../../../public/user.png";
import toast from "react-hot-toast";
import { format } from "timeago.js";

function JobCards() {
  const [open, setOpen] = React.useState(0);
  const [category, setCategory] = React.useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState();
  const [selectedJob, setSelectedJob] = useState(null);
  const [debounsedSearch, setDebouncedSearch] = useState("");
  const [scrolls, setScrolls] = React.useState(1);
  const [hasMore, setHAsMore] = useState(true);
  const [initialFetch, setInitialFetch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.user;
  });

  //----------------------------------------Jobcard data fetch----------------------------------------//

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "userHome",
      { filter, search: debounsedSearch, scroll: scrolls },
    ],
    queryFn: async () => {
      const response = await getAllJobs({
        search: debounsedSearch,
        filter,
        scroll: scrolls,
      }).then((res) => res.data, setInitialFetch(true));

      return response;
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      await categoryDataForUser().then((res) => setCategory(res.data.data));
    };

    //always scroll up ref
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    fetchCategory();
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [search, data]);

  //-----------------------------------------------------//

  const fetchDataTrigger = () => {
    if (scrolls < data.totalScrolls) {
      setTimeout(() => {
        setScrolls((prevScrolls) => prevScrolls + 1);
      }, 1000);
    } else {
      setHAsMore(false);
    }
  };

  //-----------------------------------------------------//

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  //-----------------------------------------------------//

  const handleSearch = async (event) => {
    setSearch(event.target.value);
  };
  //-----------------------------------------------------//

  const handleFilter = (e) => {
    const selectedValue = e.target.innerText;
    setFilter(selectedValue);
  };
  //-----------------------------------------------------//

  const handleShowDetails = (jobData) => {
    setSelectedJob(jobData);
  };

  const handleSaveJob = async (jobId) => {
    try {
      const response = await saveJobs(jobId);
      if (response.data.saved) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !selectedJob) {
    if (data && data.data && data.data.length > 0 && !selectedJob) {
      setSelectedJob(data.data[0]);
    }
    return initialFetch != true && <MainLoading />;
  }

  return (
    <div className="flex  ">
      <div className="">
        <Card className=" h-auto w-full max-w-[17rem] p-1 shadow-xl shadow-blue  border m-5   hidden md:block ">
          <div className="grid justify-center  m-3 border-b-2 p-2">
            <div className="flex justify-center mb-2 ">
              <Avatar
                src={user.userDp ? user.userDp : defaultDp}
                className=" shadow-sm shadow-black cursor-pointer "
                alt="avatar"
                size="lg"
                onClick={() => navigate("/user/profile")}
              />
            </div>
            <Typography className="text-center font-bold" variant="lead">
              {user.userName}
            </Typography>
            <Typography className="text-center" variant="small">
              {user.userTitle}
            </Typography>
          </div>
          <div className="mb-1 p-1">
            <Typography
              variant="paragraph"
              color="white"
              className="flex justify-center border mb-3 rounded-lg p-1 cursor-pointer bg-blue-500"
              onClick={() => navigate("/user/profile")}
            >
              {" "}
              View profile
            </Typography>

            <Typography
              onClick={() => navigate("/user/appliedJobs")}
              variant="paragraph"
              color="white"
              className="flex justify-center border mb-3 rounded-lg p-1 cursor-pointer bg-blue-500"
            >
              {" "}
              Applied
            </Typography>
            <Typography
              onClick={() => navigate("/user/savedJobs")}
              variant="paragraph"
              color="white"
              className="flex justify-center border mb-3 rounded-lg p-1 cursor-pointer bg-blue-500"
            >
              {" "}
              Saved
            </Typography>
            <Typography className="text-center m-2">Search & Filter</Typography>
            <div className="w-full">
              <Input
                label="Search ..."
                // placeholder="Seach job,company,place,skill.."
                autoFocus
                value={search}
                onChange={handleSearch}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>

          <List className="scrollable h-40 ">
            {category &&
              category.map((value, index) => (
                <Accordion
                  key={index}
                  open={open === index + 1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === index + 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem
                    className="p-1 hover:bg-gray-200 border "
                    selected={open === index + 1}
                  >
                    <AccordionHeader
                      onClick={() => handleOpen(index + 1)}
                      className="border-b-0 p-0"
                    >
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-small"
                      >
                        {value.title}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    {value.category.map((value, index) => (
                      <List key={index}>
                        <ListItem
                          key={index}
                          onClick={handleFilter}
                          className="border-b-0 p-0"
                        >
                          {value}
                        </ListItem>
                      </List>
                    ))}
                  </AccordionBody>
                </Accordion>
              ))}
          </List>
          <div className="p-1">
            <Button
              onClick={() => location.reload()}
              size="sm"
              variant="outlined"
              fullWidth
            >
              Clear
            </Button>
          </div>
          <List></List>
        </Card>
      </div>

      <InfiniteScrollComponent
        dataLength={data.data.length}
        //This is important field to render the next data
        className="mt-4 scrollable"
        next={fetchDataTrigger}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center gap-2">
            <>
              <Spinner className="h-5 w-5" />
            </>
          </div>
        }
        endMessage={
          <p className="mt-10 text-center">
            {data.data.length > 0 ? (
              <b>Yay! You have seen it all</b>
            ) : (
              <b>No data found!</b>
            )}
          </p>
        }
      >
        {data &&
          data.data &&
          data.data.map((data, index) => (
            <Card
              onClick={(e) => {
                e.stopPropagation(),
                  navigate("/user/jobDetails", {
                    state: { jobId: data._id },
                  });
              }}
              key={index}
              className={`flex flex-row justify-between container my-5 cursor-pointer  border bg-white  rounded-md hover:shadow-xl custom-sm sm:w-[25rem]  sm:ml-10  md:w-[25rem] md:h-[8rem]  xl:w-[30rem] ${
                selectedJob._id === data._id && "bg-blue-gray-50"
              } `}
            >
              <div className="m-2 mt-4 w-auto h-auto">
                <img
                  src={data.companyImage}
                  style={{ width: "80px", height: "50px" }}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col  w-full  m-5">
                <div className="">
                  <Typography
                    color="blue"
                    className="text-sm font-bold   md:text-base"
                  >
                    {data.job_title}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                  <Typography className="text-sm md:text-xs">
                    {data.companyName}
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex justify-center gap-2 ">
                    <Typography className="font-serift text-sm text-gray-600 md:text-xs">
                      {data.companyLocation}({data.job_type})
                    </Typography>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Typography className="text-xs mt-auto">
                    {format(data.createdAt)}
                  </Typography>
                  {data.is_active ? (
                    <div className=" flex text-green-400 mt-2 font-normal text-xs md:text-sm">
                      <CheckCircleIcon className="w-4 h-4 mt-auto" /> Actively
                      recruiting
                    </div>
                  ) : (
                    <div className=" flex  mt-2 font-normal "></div>
                  )}
                  <div
                    className="mt-2 cursor-pointer font-light hover:underline left-0  text-xs  md:text-sm "
                    style={{ userSelect: "none" }}
                    onClick={(e) => {
                      e.stopPropagation(), handleShowDetails(data);
                    }}
                  >
                    <span className="sm:block hidden "> Show details</span>
                  </div>
                </div>
              </div>
              <CardFooter className=" ">
                <BookmarkIcon
                  className="w-5 h-5  cursor-pointer  underline"
                  onClick={(e) => {
                    e.stopPropagation(), handleSaveJob(data._id);
                  }}
                />
              </CardFooter>
            </Card>
          ))}
      </InfiniteScrollComponent>

      <div className="  m-5  hidden lg:block hidden-lg-at-1024 ">
        {selectedJob && <JobFullDetails jobdata={selectedJob} />}
      </div>
    </div>
  );
}

export default JobCards;
