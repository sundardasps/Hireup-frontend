import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from "react-router-dom";

function LandingCards() {
  const navigate = useNavigate();
  return (
    <>
      <div className=" md:flex  p-5 pt-10 justify-center relative  md:gap-10 sm:gap-10 overflow-p-10">
        <div className=" relative  mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left h-40 mb-24">
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-4xl cursor-pointer mb-10 h-20">
            {/* Welcome ,
            <br />
            
            <TypeAnimation
             cursor={false}
             sequence={['Choose Your Role Wisely', 5000, '']}
             wrapper="h2"
             repeat={Infinity}
             
            /> */}
             
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-500 ">
            Connecting Opportunity Seekers with Opportunity Creators Where
            Dreams Find Their Perfect Match
          </p>
          <p className="pt-2 text-sm font-semibold leading-6 text-blue-400">
            Enroll now <span aria-hidden="true">→</span>
          </p>
        </div>

        {/* Company selection div */}
        <Card
          onClick={() => {
            navigate("/company/companyRegister");
          }}
          shadow={false}
          className="animated-image relative md:h-[20rem] md:max-w-[20rem] mt-4   h-[23rem] w-full max-w-[23rem] items-end justify-center  p-10 overflow-hidden shadow-2xl border  inline-flex border-blue-600  hover:scale-105 duration-500 "
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
                src="/public/premium.png"
                alt=""
              />
            </div>
            <div className="absolute bottom-0 left-0 py-1 px-1 md:px-3 bg-gradient-to-r rounded from-blue-400 to-blue-700 shadow-lg">
              <h1 className="text-2xl md:text-1xl lg:text-2xl text-white ">
                Hiring job
              </h1>
            </div>
          </CardBody>
        </Card>

        {/* Employee selection div */}

        <Card
          shadow={false}
          className="animated-image-top relative  mt-10 grid h-[23rem] w-full max-w-[23rem] items-end justify-center  p-10 overflow-hidden shadow-2xl border  inline-flex border-blue-600 border hover:scale-105 duration-500 md:h-[20rem] md:max-w-[20rem]"
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
          <CardBody className="absolute bottom-0 left-0 py-1 px-1 md:px-3  bg-gradient-to-r rounded from-blue-400 to-blue-700 shadow-lg">
            <h1 className="text-2xl md:text-1xl lg:text-2xl text-white  ">
              Searching job
            </h1>
          </CardBody>
        </Card>

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
