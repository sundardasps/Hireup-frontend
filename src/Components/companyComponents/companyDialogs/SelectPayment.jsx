import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardFooter,
  Typography,
  CardBody,
  CardHeader,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { stripePayment } from "../../../Api/companyApi";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
export default function SelectPayment() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  let stripePromise;
  const getstrip = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51OPm1SSEvDV8XVWTfK2X8ECVdBlEbO2diz7Q03vMTeRu5NTRBWUXao9A30CWLB81ksqLwbbFGOsgYhLHdYrYxp9600iTX6StsD"
      );
    }
    return stripePromise;
  };

  const prices = [
    {
      id: "price_1OPmTkSEvDV8XVWTbQkNKkTS",
      amount:199,
      interval: "month",
    },
    {
      id: "price_1OPmUmSEvDV8XVWTjXjI1ybY",
      amount:999,
      interval: "every 6 months",
    },
    {
      id: "price_1OPmWISEvDV8XVWT0Br2Rvvt",
      amount:1999,
      interval: "year",
    },
  ];

  const handlePayment = async (price) => {
    try {
      const res = await stripePayment(price);
      if (res.status === 200) {
        window.location.href = res?.data?.session.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography onClick={handleOpen} color="white">Add post</Typography>
      <Dialog
        size="xxl"
        open={open}
        handler={handleOpen}
        className="bg-blue-500 overflow-y-scroll"
      >
        <DialogHeader className="flex justify-center gap-10 ">
          <Typography variant="h2" color="white">
            Reachout 7.9 Million+ job seekers
          </Typography>
          <IconButton
            color="white"
            size="lg"
            variant="text"
            className=""
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <div className="flex justify-center   gap-5">
          <Card
            color="blue"
            variant="gradient"
            className="w-full max-w-[19rem] h-[24rem] p-5 border "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0  rounded-none border-b border-white/10 pb-4 text-center"
            >
              <Typography
                variant="small"
                color="white"
                className="font-normal uppercase"
              >
                basic
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-1 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-1 text-lg">₹</span>199{" "}
                <span className="self-end text-xl">1/m</span>
              </Typography>
            </CardHeader>
            <CardBody className="p-0">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    5 team members
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    200+ components
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    40+ built-in pages
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    1 year free updates
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    Life time technical support
                  </Typography>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="mt-10 p-0">
              <Button
                size="lg"
                color="white"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                ripple={false}
                fullWidth={true}
                onClick={() => handlePayment(prices[0])}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>

          <Card
            color="blue"
            variant="gradient"
            className="w-full max-w-[19rem] h-[24rem] p-5 border "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0  rounded-none border-b border-white/10 pb-4 text-center"
            >
              <Typography
                variant="small"
                color="white"
                className="font-normal uppercase"
              >
                basic
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-1 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-1 text-lg">₹</span>999{" "}
                <span className="self-end text-xl">6/m</span>
              </Typography>
            </CardHeader>
            <CardBody className="p-0">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    5 team members
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    200+ components
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    40+ built-in pages
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    1 year free updates
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    Life time technical support
                  </Typography>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="mt-10 p-0">
              <Button
                size="lg"
                color="white"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                ripple={false}
                fullWidth={true}
                onClick={() => handlePayment(prices[1])}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>

          <Card
            color="blue"
            variant="gradient"
            className="w-full max-w-[19rem] h-[24rem] p-5 border "
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0  rounded-none border-b border-white/10 pb-4 text-center"
            >
              <Typography
                variant="small"
                color="white"
                className="font-normal uppercase"
              >
                Premium
              </Typography>
              <Typography
                variant="h1"
                color="white"
                className="mt-1 flex justify-center gap-1 text-7xl font-normal"
              >
                <span className="mt-1 text-lg">₹</span>1199{" "}
                <span className="self-end text-xl">1/y</span>
              </Typography>
            </CardHeader>
            <CardBody className="p-0">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    5 team members
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    200+ components
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    40+ built-in pages
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    1 year free updates
                  </Typography>
                </li>
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/20 p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-normal">
                    Life time technical support
                  </Typography>
                </li>
              </ul>
            </CardBody>
            <CardFooter className="mt-10 p-0">
              <Button
                size="lg"
                color="white"
                className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                ripple={false}
                fullWidth={true}
                onClick={() => handlePayment(prices[2])}
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="flex justify-center mt-5 p-4 ">
          <Card className=" bg-transparent w-[30rem] border p-5">
            <img src="../../../../public/secureImage.png" alt="" />
            <Typography variant="h1" className="text-center">
              with <span className="text-white ">Stripe</span>
            </Typography>
          </Card>
        </div>
      </Dialog>
    </>
  );
}
