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
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function SelectPayment() {
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
   
  return (

       <>
      <p onClick={handleOpen}>
       Add post
      </p>
      <Dialog size="xxl" open={open} handler={handleOpen} >
       <DialogHeader>Select payment</DialogHeader>
      <div className="flex justify-center gap-5 bg">
     
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
              <span className="mt-1 text-lg">₹</span>200{" "}
              <span className="self-end text-xl">1/m</span>
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">5 team members</Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">200+ components</Typography>
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
                <Typography className="font-normal">5 team members</Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">200+ components</Typography>
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
              <span className="mt-1 text-lg">₹</span>2199{" "}
              <span className="self-end text-xl">1/y</span>
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">5 team members</Typography>
              </li>
              <li className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">200+ components</Typography>
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
            >
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      </div>
   
      </Dialog>
    </>

  )
}
