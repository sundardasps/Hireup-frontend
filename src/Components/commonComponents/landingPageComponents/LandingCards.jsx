import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import PremiumPng from "../../../../public/premium.png";
import JobsScroll from "./JobsScroll";

function LandingCards() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex">
        <header className="job-portal-header m-auto">
          <h1>Find Your Dream Job</h1>
          <p>Explore Thousands of Opportunities</p>
        </header>
        <div className="relative w-1/2 ml-auto  ">
          <JobsScroll />
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
          <div className="text-xl font-bold tracking-tight text-black sm:text-4xl cursor-pointer mb-10 h-20 ">
            Welcome ,
            <br />
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
