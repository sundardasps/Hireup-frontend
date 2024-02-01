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
    <div className=" bg-blue-gray-0 mt-10">
      <Typography variant="h4" className="text-center">
        Why Choose Us?
      </Typography>
      <div className="flex justify-center items-center mt-10">
        <Typography variant="paragraph" className="lg:w-[40rem] text-center">
          At Hireup, we curate top-notch opportunities in select software,
          domains, and technologies. Elevate your career by connecting with
          companies seeking skilled professionals.
        </Typography>
      </div>
      <div className=" flex flex-col sm:flex-row justify-around lg:mx-10  ">
        <Card className="max-w-[18rem] h-[18rem] overflow-hidden mb-3 bg-white shadow-md shadow-blue-gray-200 border m-auto mt-4">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-4">
              User-Friendly Design
            </Typography>
            <div className="text-sm">
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  Intuitive Navigation: Ensure easy and straightforward access
                  to information.
                </li>
                <li className="mb-2">
                  Search and Filter Options: Implement robust search and
                  filtering for efficient job.
                </li>
                <li>
                  Responsive Design: Optimize the platform for seamless use
                  across various devices.
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card className="max-w-[18rem] h-[18rem] overflow-hidden mb-3 bg-white shadow-blue-gray-200 border m-auto mt-4">

          <CardBody className="p-4">
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Advanced Job Matching
            </Typography>
            <div className="text-sm">
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  Intuitive Navigation: Ensure easy and straightforward access
                  to information.
                </li>
                <li className="mb-2">
                  Search and Filter Options: Implement robust search and
                  filtering for efficient job.
                </li>
                <li>
                  Responsive Design: Optimize the platform for seamless use
                  across various devices.
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card className="max-w-[18rem] h-[18rem] overflow-hidden mb-3 bg-white shadow-blue-gray-200 border m-auto mt-4">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-4">
              Security and Privacy
            </Typography>
            <div className="text-sm">
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  Intuitive Navigation: Ensure easy and straightforward access
                  to information.
                </li>
                <li className="mb-2">
                  Search and Filter Options: Implement robust search and
                  filtering for efficient job.
                </li>
                <li>
                  Responsive Design: Optimize the platform for seamless use
                  across various devices.
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default CompaniesBanner;
