import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import React from "react";
import company from "../../../../public/office.jpg";

function CompaniesBanner() {
  return (
    <div className="pt-4">
      <Typography variant="h2" className="text-center">
        Why Choose Us?
      </Typography>
      <div className="flex justify-center items-center">
        <Typography variant="h6" className="lg:w-[40rem] text-center">
          At Hireup, we curate top-notch opportunities in select software,
          domains, and technologies. Elevate your career by connecting with
          companies seeking skilled professionals.
        </Typography>
      </div>
      <div className="lg:flex justify-center gap-10 p-5">
        <Card className="max-w-[18rem] h-[24rem] overflow-hidden mb-3">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="ui/ux review check"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
              UI/UX Review Check
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className=" font-normal"
            >
              Because it&apos;s about motivating the doers. Because I&apos;m
              here to follow my dreams and inspire others.
            </Typography>
          </CardBody>
        </Card>

        <Card className="max-w-[18rem] h-[24rem] overflow-hidden mb-3">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="ui/ux review check"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
              UI/UX Review Check
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className=" font-normal"
            >
              Because it&apos;s about motivating the doers. Because I&apos;m
              here to follow my dreams and inspire others.
            </Typography>
          </CardBody>
        </Card>

        <Card className="max-w-[18rem] h-[24rem] overflow-hidden mb-3">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="ui/ux review check"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h4" color="blue-gray">
              UI/UX Review Check
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className=" font-normal"
            >
              Because it&apos;s about motivating the doers. Because I&apos;m
              here to follow my dreams and inspire others.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default CompaniesBanner;
