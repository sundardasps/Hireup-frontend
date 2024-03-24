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
import JobsScroll from "./JobsScroll";
import { useEffect, useState } from "react";
import { getAllJobs, getJobs, getJobsName } from "../../../Api/userApi";
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
  const [dropDownShow, setdropDownShow] = useState();
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
        const result = await getJobs({ search: search }).then((res) =>
          setsearchedJobs(res.data.data)
        );
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
        <header className=" p-2 md:w-1/2 m-auto ">
          <p className="text-2xl xl:text-8xl mb-5">Find Your Dream Job</p>
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
                className="my-auto h-[4rem] rounded-r-full border-blue-600 border p-5 w-1/4 "
              >
                Search
              </Button>
            </div>
            <div className="h-[6rem]">
              {
                <ul
                  role="menu"
                  data-popover="menu"
                  data-popover-placement="bottom"
                  className="max-h-[10rem]   right-0 w-2/3  m-auto mt-2 scrollable    p-3 overflow-auto rounded-md   bg-transparent  font-sans text-sm font-normal text-blue-gray-500 "
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
                          className="block w-full cursor-pointer my-3  bg-blue-gray-100 border select-none rounded-md px-3 pt-[9px] pb-2 text-start leading-tight transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                        >
                          {value.name} 
                        </li>
                      ))}
                </ul>
              }
            </div>
          </div>
        </header>

        <div className="relative w-1/5 hidden md:block  bg-white">
          <JobsScroll />
          <img className="relative" src={phoneImg} alt="" />
        </div>
      </div>
      {searchedJobs.length > 0 && (
        <span className="text-base ml-4 ">Search result🔻</span>
      )}
      <div
        className={`grid-cols-2 md:flex mb-10 py-5 h-max gap-5 border-b-4 border-light-blue-700 mx-2`}
      >
        {searchedJobs &&
          searchedJobs.map((data, index) => (
            <Card
              onClick={(e) => {
                e.stopPropagation(), handleClick();
              }}
              key={index}
              className={`flex flex-row justify-between container  cursor-pointer  border bg-white  rounded-md hover:shadow-xl    md:w-[25rem] md:h-[8rem]  xl:w-[27rem] `}
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
                      e.stopPropagation(), handleClick(data);
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
                    e.stopPropagation(), handleClick();
                  }}
                />
              </CardFooter>
            </Card>
          ))}
      </div>

      <div className=" md:flex  p-5 pt-10 justify-center relative  md:gap-7 sm:gap-10 overflow-p-10 mb-36">
        <div className="xl:flex mt-auto  gap-5  md:w-1/2 ">
          {/* Company selection div */}
          <Card
            onClick={() => {
              navigate("/company/companyRegister");
            }}
            shadow={false}
            className="animated-image relative  md:max-w-[16rem]  w-full grid    object-fill   items-end justify-center   overflow-hidden shadow-2xl border   border-blue-600  hover:scale-105 duration-500 h-[15rem] "
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
            className="animated-image-top relative  mt-5 grid  md:max-w-[16rem]  w-full object-fill   items-end justify-center   overflow-hidden shadow-2xl border   border-blue-600  hover:scale-105 duration-500 h-[15rem] "
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
        <div className=" md:w-auto p-5 ">
          <div className="text-xl font-bold tracking-tight text-black sm:text-4xl cursor-pointer mb-10 h-10 ">
            <TypeAnimation
              cursor={false}
              sequence={["Choose Your Role Wisely", 5000, ""]}
              wrapper="h2"
              repeat={Infinity}
            />
          </div>
          <p className="mt-auto text-lg leading-8 text-gray-500 ">
            Connecting Opportunity Seekers with Opportunity <br /> Creators
            Where Dreams Find Their Perfect Match
          </p>
          <p className="pt-2 text-sm font-semibold leading-6 text-blue-400">
            Enroll now <span aria-hidden="true">→</span>
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
