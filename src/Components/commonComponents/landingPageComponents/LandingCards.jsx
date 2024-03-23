import { Card, CardHeader, CardBody, Input } from "@material-tailwind/react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import PremiumPng from "../../../../public/premium.png";
import JobsScroll from "./JobsScroll";
import { useEffect, useState } from "react";
import { getJobs } from "../../../Api/userApi";
import phoneImg from "../../../../public/png.png";
import { useQuery } from "@tanstack/react-query";
function LandingCards() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [jobName, setJobname] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const { data } = useQuery({
    queryKey: ["jobNames"],
    queryFn: async () => {
      const result = await getJobs().then((res) => setJobs(res.data.jobs));
      return result;
    },
  });

  return (
    <>
      <div className="md:flex my-5 ">
        <header className="relative p-2 md:w-1/2 m-auto ">
          <p className="text-2xl xl:text-8xl mb-5">Find Your Dream Job</p>
          <p className="">Explore Thousands of Opportunities</p>
          <div className=" w-full">
            <input
              placeholder="Search Jobes Here!"
              type="search"
              onChange={handleSearch}
              value={jobName ? jobName : search}
              className="border  h-[4rem] p-3 border-blue-600 text-center  my-5 rounded-full  w-full"
            />
            {search && (
              <ul
                role="menu"
                data-popover="menu"
                data-popover-placement="bottom"
                className="max-h-[10rem] absolute left-0 right-0 w-2/3   m-auto p-3 overflow-auto rounded-md border border-blue-gray-50 bg-white  font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none "
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
            )}
          </div>
        </header>

        <div className="relative w-1/4 hidden md:block  bg-white">
          <div className="">
            <JobsScroll />
          </div>
          <img className="relative" src={phoneImg} alt="" />
        </div>
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
    </>
  );
}

export default LandingCards;
