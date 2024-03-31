import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import PremiumPng from "../../../../public/premium.png";
import companyImgDefault from "../../../../public/default.jpeg";
import JobsScroll from "./JobsScroll";
import { useEffect, useState } from "react";
import { getJobs, getJobsName } from "../../../Api/userApi";
import phoneImg from "../../../../public/png.png";
import { useQuery } from "@tanstack/react-query";
import {
  BookmarkIcon,
  BuildingOffice2Icon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { format } from "timeago.js";
import toast, { Toaster } from "react-hot-toast";
function LandingCards() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [searchedJobs, setsearchedJobs] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const { data } = useQuery({
    queryKey: ["jobNames"],
    queryFn: async () => {
      const result = await getJobsName().then((res) => setJobs(res.data.jobs));
      return result;
    },
  });

  const handleFetchJobs = async () => {
    try {
      if (search.trim() !== "") {
        const result = await getJobs({ search: search });
        if (result.data.dataFetched) {
          setsearchedJobs(result.data.data);
        } else {
          toast.error("Search reasult not found!");
        }

        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    toast("Please log in to continue..", {
      icon: "➡️",
    });
  };

  useEffect(() => {
    if (search.length === 0) {
      setsearchedJobs([]);
    }
  }, [search]);

  return (
    <>
      <div className="md:flex my-10 md:mb-10 ">
        <header className=" p-2 md:w-1/2 m-auto  ">
          <p className="text-4xl xl:text-8xl mb-5">
            Find Your <span className="text-blue-500 font-medium">Dream</span>{" "}
            Job
          </p>
          <p className="">Explore Thousands of Opportunities</p>
          <div className=" w-full">
            <div className=" flex  mt-5 shadow-xl rounded-full shadow-blue-gray-200">
              <input
                placeholder="Search Jobes Here!"
                type="text"
                onChange={handleSearch}
                value={search}
                className="border  h-[4rem] p-3 border-blue-600 text-center  rounded-full rounded-r-none  w-3/4"
              />
              <Button
                variant="gradient"
                color="white"
                onClick={() => handleFetchJobs()}
                className="my-auto h-[4rem] rounded-r-full border-blue-600 border  w-1/4 "
              >
                <MagnifyingGlassIcon className="w-10 m-auto" />
              </Button>
            </div>

            {
              search && searchedJobs.length < 1 && (
                <ul
                  role="menu"
                  data-popover="menu"
                  data-popover-placement="bottom"
                  className="absolute  mt-2 z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                >
                  {jobs &&
                    jobs
                      .filter((item) => {
                        const searchTerm = search.toLowerCase();
                        const name = item.name.toLowerCase();
                        return searchTerm && name.startsWith(search);
                      })
                      .map((value) => (
                        <li
                          key={value._id}
                          role="menuitem"
                          onClick={() => {
                            setSearch(value.name);
                          }}
                          className="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                        >
                          {value.name}
                        </li>
                      ))}
                </ul>
              )
              //    <ul role="menu" data-popover="menu" data-popover-placement="bottom"
              //    class="absolute z-10 min-w-[180px] overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
              //    <li role="menuitem"
              //      class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
              //      Menu Item 1
              //    </li>
              //    <li role="menuitem"
              //      class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
              //      Menu Item 2
              //    </li>
              //    <li role="menuitem"
              //      class="block w-full cursor-pointer select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
              //      Menu Item 3
              //    </li>
              //  </ul>
            }
          </div>
        </header>

        <div className="relative w-1/5  hidden md:block  bg-white">
          <JobsScroll />
          <img className="relative" src={phoneImg} alt="" />
        </div>
      </div>
      {searchedJobs.length > 0 && (
        <span className="text-base ml-4 ">Search result🔻</span>
      )}
      <div
        className={`grid  md:grid-cols-2 xl:grid-cols-3  mb-10 py-5 h-max gap-5 border-b-4 border-light-blue-700 mx-2`}
      >
        {searchedJobs &&
          searchedJobs.map((data, index) => (
            <Card
              onClick={(e) => {
                e.stopPropagation(), handleClick();
              }}
              key={index}
              className={`flex flex-row justify-between container mb-3 cursor-pointer  border bg-white  rounded-md hover:shadow-xl  h-[8rem]  md:w-[22rem]  md:h-[8rem]   `}
            >
              <div className="mx-3 mt-3 w-auto h-auto">
                <img
                  src={
                    data.companyImage ? data.companyImage : companyImgDefault
                  }
                  style={{ width: "80px", height: "50px" }}
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col  w-full  my-2">
                <div className="">
                  <Typography
                    color="blue"
                    className="text-[0.7rem] md:text-xs font-bold "
                  >
                    {data.job_title.length > 30
                      ? data.job_title.slice(0, 30) + "..."
                      : data.job_title}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <BuildingOffice2Icon className="h-4 w-4 text-teal-500" />
                  <Typography className="text-[0.7rem] md:text-xs">
                    {data.companyName}
                  </Typography>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex justify-center gap-2 ">
                    <Typography className="font-serift text-gray-600 text-[0.7rem] md:text-xs">
                      {data.companyLocation}({data.job_type})
                    </Typography>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Typography className="text-xs text-[0.6rem] mt-auto">
                    {format(data.createdAt)}
                  </Typography>
                  {data.is_active ? (
                    <div className=" flex text-green-400 mt-2 font-normal text-[0.6rem]  md:text-xs">
                      <CheckCircleIcon className="w-4 h-4 mt-auto " /> Actively
                      recruiting
                    </div>
                  ) : (
                    <div className=" flex  mt-2 font-normal "></div>
                  )}
                  <div
                    className="mt-2 cursor-pointer font-light hover:underline left-0  text-xs  md:text-sm "
                    style={{ userSelect: "none" }}
                    onClick={(e) => {
                      e.stopPropagation(), handleClick(data);
                    }}
                  >
                    <span className="sm:block hidden text-[0.7rem]  md:text-xs">
                      {" "}
                      Show details
                    </span>
                  </div>
                </div>
              </div>
              <CardFooter className=" ">
                <BookmarkIcon
                  className="w-5 h-5  cursor-pointer  underline"
                  onClick={(e) => {
                    e.stopPropagation(), handleClick();
                  }}
                />
              </CardFooter>
            </Card>
          ))}
      </div>

      <div className=" m-3 md:flex bg-blue-400 rounded-3xl  p-5 pt-10 justify-center relative mb-10 md:gap-7 sm:gap-10 overflow-p-10 md:mb-20">
        <div className="xl:flex mt-auto  gap-5  md:w-1/2 ">
          {/* Company selection div */}
          <Card
            onClick={() => {
              navigate("/company/companyRegister");
            }}
            shadow={false}
            className=" animated-image relative  md:max-w-[16rem] mb-5 xl:mb-0  w-full grid    object-fill   items-end justify-center   overflow-hidden shadow-2xl border   border-white  hover:scale-105 duration-500 h-[15rem] "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('/public/company.jpeg')] bg-cover bg-center"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-blue/80 via-black/50" />
            </CardHeader>

            <CardBody>
              <div className="absolute top-0 left-0 py-1 px-1 md:px-3 bg-blue-600 rounded  flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-700 shadow-lg">
                <h1 className=" text-white ">Premium </h1>
                <img
                  className="animated-image flex w-6 h-6 "
                  src={PremiumPng}
                  alt=""
                />
              </div>
              <div className="absolute bottom-0 left-0 w-auto py-1 px-1 md:px-3 bg-gradient-to-r rounded from-blue-400 to-blue-700 shadow-lg">
                <h1 className="text-2xl md:text-1xl lg:text-2xl text-white ">
                  Hiring job
                </h1>
              </div>
            </CardBody>
          </Card>

          {/* Employee selection div */}

          <Card
            shadow={false}
            className="animated-image-top relative  mb-5 xl:mb-0  grid  md:max-w-[16rem]  w-full object-fill   items-end justify-center   overflow-hidden shadow-2xl border   border-white  hover:scale-105 duration-500 h-[15rem] "
            onClick={() => {
              navigate("/user/register");
            }}
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('/public/employee.jpeg')] bg-cover bg-center"
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-blue/80 via-black/50" />
            </CardHeader>
            <CardBody className="absolute bottom-0 left-0 py-1 px-1 md:px-3 w-auto  bg-gradient-to-r rounded from-blue-400 to-blue-700 shadow-lg">
              <h1 className="text-2xl md:text-1xl lg:text-2xl text-white  ">
                Searching job
              </h1>
            </CardBody>
          </Card>
        </div>
        <div className="md:py-10  p-5   md:w-2/5  rounded-2xl rounded-bl-none border-light-blue-700  ">
          <div className="text-lgfont-bold  tracking-tight text-white sm:text-4xl cursor-pointer mb-2 h-max">
            Hi,
            <TypeAnimation
              cursor={false}
              sequence={["Choose Your Role..", 5000, ""]}
              repeat={Infinity}
            />
          </div>
          <p className="text-sm sm:text-lg leading-6 text-gray-300 ">
            Connecting Opportunity Seekers with Opportunity <br /> Creators
            Where Dreams Find Their Perfect Match
          </p>
        </div>
        {/* style for renedering effect */}
        <style>
          {`
     .animated-image {
      animation: slideAndFadeIn 1s ease-in-out;
      transform-origin: center bottom; /* Set the transform origin to the bottom center */
    }
    
    @keyframes slideAndFadeIn {
      0% {
        opacity: 0;
        transform: translateY(100%); /* Start below the element's original position */
      }
      100% {
        opacity: 1;
        transform: translateY(0); /* Move back to the original position */
      }
    }    
        `}

          {`.animated-image-top {
            animation: slideAndFadeInTop 1s ease-in-out;
            transform-origin: center top; /* Set the transform origin to the top center */
          }
          
          @keyframes slideAndFadeInTop {
            0% {
              opacity: 0;
              transform: translateY(-100%); /* Start above the element's original position */
            }
            100% {
              opacity: 1;
              transform: translateY(0); /* Move back to the original position */
            }
          }
          `}
        </style>
      </div>
      <Toaster />
    </>
  );
}

export default LandingCards;
